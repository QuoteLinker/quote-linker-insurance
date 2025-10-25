export type ConsentState = {
  ad_storage: "granted" | "denied"
  ad_user_data: "granted" | "denied"
  ad_personalization: "granted" | "denied"
  analytics_storage: "granted" | "denied"
}

const CONSENT_STORAGE_KEY = "quotelinker_consent"

export function getConsentState(): ConsentState | null {
  if (typeof window === "undefined") return null

  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!stored) return null
    return JSON.parse(stored)
  } catch (error) {
    console.error("[v0] Failed to get consent state:", error)
    return null
  }
}

export function setConsentState(state: ConsentState): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state))

    // Update gtag consent
    if ((window as any).gtag) {
      ;(window as any).gtag("consent", "update", state)
    }
  } catch (error) {
    console.error("[v0] Failed to set consent state:", error)
  }
}

export function hasConsent(): boolean {
  return getConsentState() !== null
}

export function grantAllConsent(): void {
  const state: ConsentState = {
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
    analytics_storage: "granted",
  }
  setConsentState(state)
}

export function denyAllConsent(): void {
  const state: ConsentState = {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  }
  setConsentState(state)
}

export function customizeConsent(state: Partial<ConsentState>): void {
  const currentState = getConsentState() || {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  }

  setConsentState({ ...currentState, ...state })
}

// Hash function for Enhanced Conversions (SHA-256)
export async function hashValue(value: string): Promise<string> {
  if (typeof window === "undefined" || !window.crypto?.subtle) {
    return value // Fallback for environments without crypto
  }

  try {
    const encoder = new TextEncoder()
    const data = encoder.encode(value.toLowerCase().trim())
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
    return hashHex
  } catch (error) {
    console.error("[v0] Failed to hash value:", error)
    return value
  }
}

// Track lead conversion with Enhanced Conversions
export async function trackLeadConversion(data: {
  email: string
  phone: string
  firstName: string
  lastName: string
  lineOfBusiness: string
}): Promise<void> {
  if (typeof window === "undefined" || !(window as any).gtag) return

  const consent = getConsentState()
  if (!consent || consent.ad_user_data === "denied") {
    console.log("[v0] Skipping conversion tracking - no consent")
    return
  }

  try {
    const gtag = (window as any).gtag

    // Track GA4 event
    gtag("event", "generate_lead", {
      event_category: "Lead",
      event_label: data.lineOfBusiness,
      value: 1,
    })

    // Track Google Ads conversion with Enhanced Conversions
    const gadsId = process.env.NEXT_PUBLIC_GADS_ID
    const conversionLabel = process.env.NEXT_PUBLIC_GADS_CONVERSION_LABEL

    if (gadsId && conversionLabel) {
      // Hash PII for Enhanced Conversions
      const hashedEmail = await hashValue(data.email)
      const hashedPhone = await hashValue(data.phone.replace(/\D/g, ""))

      gtag("event", "conversion", {
        send_to: `${gadsId}/${conversionLabel}`,
        value: 1.0,
        currency: "USD",
        transaction_id: Date.now().toString(),
        // Enhanced Conversions data
        email: hashedEmail,
        phone_number: hashedPhone,
        first_name: data.firstName,
        last_name: data.lastName,
      })

      console.log("[v0] Conversion tracked with Enhanced Conversions")
    }
  } catch (error) {
    console.error("[v0] Failed to track conversion:", error)
  }
}

// Initialize gtag with default consent state
export function initializeGtag(): void {
  if (typeof window === "undefined") return

  const consent = getConsentState()
  const defaultConsent: ConsentState = consent || {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  }

  // Initialize gtag consent
  if ((window as any).gtag) {
    ;(window as any).gtag("consent", "default", defaultConsent)
  }
}
