import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase-server"
import { validateLeadFormData, normalizePhone, normalizeZip, sanitizeInput } from "@/lib/validation"
import type { LeadFormData } from "@/lib/types"

// Simple in-memory rate limiting (for production, use Redis or edge KV)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false
  }

  record.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting by IP
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"

    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 })
    }

    // Parse request body
    const body = await request.json()

    // Validate form data
    const validation = validateLeadFormData(body)
    if (!validation.valid) {
      return NextResponse.json({ error: "Validation failed", errors: validation.errors }, { status: 400 })
    }

    // Sanitize and normalize inputs
    const leadData: LeadFormData = {
      first_name: sanitizeInput(body.first_name),
      last_name: sanitizeInput(body.last_name),
      email: sanitizeInput(body.email.toLowerCase()),
      phone: normalizePhone(body.phone),
      zip: normalizeZip(body.zip),
      state: sanitizeInput(body.state.toUpperCase()),
      city: sanitizeInput(body.city),
      line_of_business: body.line_of_business,
      commercial_type: body.commercial_type ? sanitizeInput(body.commercial_type) : undefined,
      consent_tcpa: body.consent_tcpa,

      // Attribution params
      utm_source: body.utm_source ? sanitizeInput(body.utm_source) : undefined,
      utm_medium: body.utm_medium ? sanitizeInput(body.utm_medium) : undefined,
      utm_campaign: body.utm_campaign ? sanitizeInput(body.utm_campaign) : undefined,
      utm_term: body.utm_term ? sanitizeInput(body.utm_term) : undefined,
      utm_content: body.utm_content ? sanitizeInput(body.utm_content) : undefined,
      gclid: body.gclid ? sanitizeInput(body.gclid) : undefined,
      gbraid: body.gbraid ? sanitizeInput(body.gbraid) : undefined,
      wbraid: body.wbraid ? sanitizeInput(body.wbraid) : undefined,
    }

    // Insert into database using service role
    const supabase = await createServerClient()

    const { data: lead, error: dbError } = await supabase.from("leads").insert([leadData]).select().single()

    if (dbError) {
      console.error("[v0] Database error:", dbError)
      return NextResponse.json({ error: "Failed to save lead. Please try again." }, { status: 500 })
    }

    console.log("[v0] Lead created successfully:", lead.id)

    // Trigger webhook notification (async, don't wait)
    fetch(`${request.nextUrl.origin}/api/notify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leadId: lead.id }),
    }).catch((error) => {
      console.error("[v0] Failed to trigger webhook:", error)
    })

    // Return success with lead ID
    return NextResponse.json(
      {
        success: true,
        leadId: lead.id,
        message: "Thank you! We will contact you shortly.",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Unexpected error in /api/leads:", error)
    return NextResponse.json({ error: "An unexpected error occurred. Please try again." }, { status: 500 })
  }
}
