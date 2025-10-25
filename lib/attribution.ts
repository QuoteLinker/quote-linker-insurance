const ATTRIBUTION_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "gbraid",
  "wbraid",
] as const

export type AttributionParams = {
  [K in (typeof ATTRIBUTION_PARAMS)[number]]?: string
}

const STORAGE_KEY = "quotelinker_attribution"
const EXPIRY_DAYS = 30

export function captureAttributionParams(): AttributionParams {
  if (typeof window === "undefined") return {}

  const params = new URLSearchParams(window.location.search)
  const attribution: AttributionParams = {}

  ATTRIBUTION_PARAMS.forEach((param) => {
    const value = params.get(param)
    if (value) {
      attribution[param] = value
    }
  })

  // If we have any attribution params, store them
  if (Object.keys(attribution).length > 0) {
    storeAttributionParams(attribution)
  }

  return attribution
}

export function storeAttributionParams(params: AttributionParams): void {
  if (typeof window === "undefined") return

  try {
    const data = {
      params,
      timestamp: Date.now(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error("[v0] Failed to store attribution params:", error)
  }
}

export function getStoredAttributionParams(): AttributionParams {
  if (typeof window === "undefined") return {}

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return {}

    const data = JSON.parse(stored)
    const age = Date.now() - data.timestamp
    const maxAge = EXPIRY_DAYS * 24 * 60 * 60 * 1000

    // If expired, clear and return empty
    if (age > maxAge) {
      localStorage.removeItem(STORAGE_KEY)
      return {}
    }

    return data.params || {}
  } catch (error) {
    console.error("[v0] Failed to retrieve attribution params:", error)
    return {}
  }
}

export function clearAttributionParams(): void {
  if (typeof window === "undefined") return

  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error("[v0] Failed to clear attribution params:", error)
  }
}
