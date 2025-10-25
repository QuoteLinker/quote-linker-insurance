import type { LineOfBusiness } from "./types"

// Seeded average premium estimates for Minnesota
const AVERAGE_PREMIUMS: Record<LineOfBusiness, { min: number; max: number; annual: number }> = {
  auto: {
    min: 800,
    max: 2400,
    annual: 1600,
  },
  home: {
    min: 1200,
    max: 3600,
    annual: 2400,
  },
  bundle: {
    min: 2000,
    max: 5000,
    annual: 3500,
  },
  life: {
    min: 300,
    max: 1200,
    annual: 750,
  },
  commercial: {
    min: 2500,
    max: 10000,
    annual: 5000,
  },
}

export function getEstimatedPremium(lineOfBusiness: LineOfBusiness): {
  min: number
  max: number
  annual: number
  monthly: number
} {
  const estimate = AVERAGE_PREMIUMS[lineOfBusiness]

  return {
    ...estimate,
    monthly: Math.round(estimate.annual / 12),
  }
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}
