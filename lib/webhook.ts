import type { ZapierWebhookPayload } from "./types"

const WEBHOOK_URL = process.env.WEBHOOK_URL
const WEBHOOK_TIMEOUT_MS = Number.parseInt(process.env.WEBHOOK_TIMEOUT_MS || "10000", 10)
const WEBHOOK_MAX_RETRIES = Number.parseInt(process.env.WEBHOOK_MAX_RETRIES || "3", 10)

export async function sendWebhook(
  payload: ZapierWebhookPayload,
  retryCount = 0,
): Promise<{ success: boolean; error?: string }> {
  const webhookUrl = WEBHOOK_URL || "https://webhook.site/unique-id-here"

  if (!WEBHOOK_URL) {
    console.warn("[v0] WEBHOOK_URL not configured, using stub URL for testing:", webhookUrl)
  }

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS)

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "QuoteLinker/1.0",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`Webhook failed with status ${response.status}`)
    }

    console.log("[v0] Webhook sent successfully:", payload.lead_id)
    return { success: true }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    console.error(`[v0] Webhook attempt ${retryCount + 1} failed:`, errorMessage)

    // Retry with exponential backoff
    if (retryCount < WEBHOOK_MAX_RETRIES) {
      const delay = Math.pow(2, retryCount) * 1000 // 1s, 2s, 4s, 8s...
      console.log(`[v0] Retrying webhook in ${delay}ms...`)

      await new Promise((resolve) => setTimeout(resolve, delay))
      return sendWebhook(payload, retryCount + 1)
    }

    // All retries exhausted
    console.error("[v0] All webhook retries exhausted")
    return { success: false, error: errorMessage }
  }
}

export async function sendFallbackEmail(leadId: string, leadData: ZapierWebhookPayload): Promise<void> {
  const fallbackEmail = process.env.ALERT_FALLBACK_EMAIL || "admin@quotelinker.com"

  if (!process.env.ALERT_FALLBACK_EMAIL) {
    console.warn("[v0] ALERT_FALLBACK_EMAIL not configured, using stub email:", fallbackEmail)
  }

  // TODO: Implement actual email sending (e.g., via SendGrid, Resend, etc.)
  console.log("[v0] Fallback email would be sent to:", fallbackEmail)
  console.log("[v0] Lead data:", leadData)

  // Placeholder for email implementation
  // await sendEmail({
  //   to: fallbackEmail,
  //   subject: `QuoteLinker: Webhook Failed for Lead ${leadId}`,
  //   body: `Lead submission received but webhook failed after all retries.\n\nLead ID: ${leadId}\n\nData: ${JSON.stringify(leadData, null, 2)}`
  // })
}

// Export types for use in other files
export type { ZapierWebhookPayload }
