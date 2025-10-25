import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase-server"
import { sendWebhook, sendFallbackEmail, type WebhookPayload } from "@/lib/webhook"

export async function POST(request: NextRequest) {
  try {
    const { leadId } = await request.json()

    if (!leadId) {
      return NextResponse.json({ error: "Lead ID is required" }, { status: 400 })
    }

    // Fetch lead data from database
    const supabase = await createServerClient()
    const { data: lead, error: fetchError } = await supabase.from("leads").select("*").eq("id", leadId).single()

    if (fetchError || !lead) {
      console.error("[v0] Failed to fetch lead:", fetchError)
      return NextResponse.json({ error: "Lead not found" }, { status: 404 })
    }

    // Prepare webhook payload
    const payload: WebhookPayload = {
      lead_id: lead.id,
      timestamp: new Date(lead.created_at).toLocaleString("en-US", {
        timeZone: "America/Chicago",
        month: "2-digit",
        day: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      first_name: lead.first_name || "",
      last_name: lead.last_name || "",
      email: lead.email || "",
      phone: lead.phone || "",
      state: lead.state || "",
      city: lead.city || "",
      line: lead.line_of_business || "", // Mapped to 'line' to match sheet
      commercial_type: lead.commercial_type || "",
      utm_source: lead.utm_source || "",
      gclid: lead.gclid || "",
    }

    // Send webhook with retry logic
    const result = await sendWebhook(payload)

    // Update lead with webhook status
    const updateData: any = {
      webhook_attempts: lead.webhook_attempts + 1,
      webhook_last_attempt: new Date().toISOString(),
    }

    if (result.success) {
      updateData.webhook_sent = true
      updateData.webhook_error = null
    } else {
      updateData.webhook_error = result.error

      // If all retries failed, send fallback email
      await sendFallbackEmail(leadId, payload)
    }

    await supabase.from("leads").update(updateData).eq("id", leadId)

    return NextResponse.json({
      success: result.success,
      attempts: updateData.webhook_attempts,
      error: result.error,
    })
  } catch (error) {
    console.error("[v0] Unexpected error in /api/notify:", error)
    return NextResponse.json({ error: "Failed to send notification" }, { status: 500 })
  }
}
