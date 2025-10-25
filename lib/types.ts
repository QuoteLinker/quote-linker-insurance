export type LineOfBusiness = "auto" | "home" | "bundle" | "life" | "commercial"
export type LeadStatus = "new" | "contacted" | "quoted" | "bound" | "lost"

export interface Lead {
  id: string
  created_at: string
  updated_at: string

  // Contact Information
  first_name: string
  last_name: string
  email: string
  phone: string
  zip: string
  state: string
  city: string

  // Insurance Details
  line_of_business: LineOfBusiness
  commercial_type?: string | null

  // Consent
  consent_tcpa: boolean

  // Attribution Tracking
  utm_source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
  utm_term?: string | null
  utm_content?: string | null
  gclid?: string | null
  gbraid?: string | null
  wbraid?: string | null

  // Admin Fields
  status: LeadStatus
  bound: boolean
  bound_premium?: number | null
  carrier?: string | null
  policy_id?: string | null
  bound_date?: string | null
  notes?: string | null

  // Webhook Status
  webhook_sent: boolean
  webhook_attempts: number
  webhook_last_attempt?: string | null
  webhook_error?: string | null
}

export interface LeadFormData {
  first_name: string
  last_name: string
  email: string
  phone: string
  zip: string
  state: string
  city: string
  line_of_business: LineOfBusiness
  commercial_type?: string
  consent_tcpa: boolean

  // Attribution params
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  gclid?: string
  gbraid?: string
  wbraid?: string
}

export interface City {
  name: string
  slug: string
  state: string
  stateSlug: string
  population?: number
  description?: string
}
