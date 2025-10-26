import type { LeadFormData } from "./types"

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhone(phone: string): boolean {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, "")
  // Must be 10 or 11 digits (with optional country code)
  return digits.length === 10 || digits.length === 11
}

export function normalizePhone(phone: string): string {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, "")

  // If 11 digits and starts with 1, remove the 1
  if (digits.length === 11 && digits.startsWith("1")) {
    return digits.slice(1)
  }

  return digits
}

export function validateZip(zip: string): boolean {
  // 5 digits or 5+4 format
  const zipRegex = /^\d{5}(-\d{4})?$/
  return zipRegex.test(zip)
}

export function normalizeZip(zip: string): string {
  // Remove any spaces or non-digit/hyphen characters, then take first 5 digits
  const cleaned = zip.replace(/[^\d-]/g, "")
  return cleaned.split("-")[0].slice(0, 5)
}

export function validateLeadFormData(data: Partial<LeadFormData>): {
  valid: boolean
  errors: Record<string, string>
} {
  const errors: Record<string, string> = {}

  // Required fields
  if (!data.first_name?.trim()) {
    errors.first_name = "First name is required"
  }

  if (!data.last_name?.trim()) {
    errors.last_name = "Last name is required"
  }

  if (!data.email?.trim()) {
    errors.email = "Email is required"
  } else if (!validateEmail(data.email)) {
    errors.email = "Invalid email format"
  }

  if (!data.phone?.trim()) {
    errors.phone = "Phone number is required"
  } else if (!validatePhone(data.phone)) {
    errors.phone = "Invalid phone number (must be 10 digits)"
  }

  if (!data.zip?.trim()) {
    errors.zip = "ZIP code is required"
  } else if (!validateZip(data.zip)) {
    errors.zip = "Invalid ZIP code format"
  }

  if (!data.state?.trim()) {
    errors.state = "State is required"
  }

  if (!data.city?.trim()) {
    errors.city = "City is required"
  }

  if (!data.line_of_business) {
    errors.line_of_business = "Please select a line of business"
  }

  if (data.line_of_business === "commercial" && !data.commercial_type?.trim()) {
    errors.commercial_type = "Commercial type is required for commercial insurance"
  }

  if (!data.consent_tcpa) {
    errors.consent_tcpa = "You must agree to be contacted"
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  }
}

export function sanitizeInput(input: string): string {
  // Basic XSS prevention - remove HTML tags and trim
  return input.replace(/<[^>]*>/g, "").trim()
}
