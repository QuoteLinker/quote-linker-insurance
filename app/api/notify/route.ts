import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase-server"
import { sendWebhook, sendFallbackEmail } from "@/lib/webhook"
import type { ZapierWebhookPayload } from "@/lib/types"

export async function POST(request: NextRequest) {
  try {
    const { lead } = await request.json()

    if (!lead || !lead.id) {
      return NextResponse.json({ error: "Lead data is required" }, { status: 400 })
    }

    const zapierPayload: ZapierWebhookPayload = {
      timestamp: lead.created_at, // ISO string
      first_name: lead.first_name || "",
      last_name: lead.last_name || "",
      email: lead.email || "",
      phone: lead.phone || "",
      state: lead.state || "",
      city: lead.city || "",
      zip: lead.zip || "",
      line: lead.line_of_business || "", // NOTE: mapped from line_of_business to "line"
      commercial_type: lead.commercial_type || "",
      utm_source: lead.utm_source || "",
      utm_medium: lead.utm_medium || "",
      utm_campaign: lead.utm_campaign || "",
      utm_term: lead.utm_term || "",
      utm_content: lead.utm_content || "",
      gclid: lead.gclid || "",
      gbraid: lead.gbraid || "",
      wbraid: lead.wbraid || "",
      lead_source: lead.lead_source || "",
      lead_id: lead.id, // DB id
    }

    console.log("[v0] Zapier payload:", JSON.stringify(zapierPayload, null, 2))

    // Send webhook with retry logic
    const result = await sendWebhook(zapierPayload)

    // Update lead with webhook status
    const supabase = await createServerClient()
    const updateData: any = {
      webhook_attempts: (lead.webhook_attempts || 0) + 1,
      webhook_last_attempt: new Date().toISOString(),
    }

    if (result.success) {
      updateData.webhook_sent = true
      updateData.webhook_error = null
    } else {
      updateData.webhook_error = result.error

      // If all retries failed, send fallback email
      await sendFallbackEmail(lead.id, zapierPayload)
    }

    await supabase.from("leads").update(updateData).eq("id", lead.id)

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
