"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"
import { captureAttributionParams, getStoredAttributionParams } from "@/lib/attribution"
import { trackLeadConversion } from "@/lib/analytics"
import type { LineOfBusiness } from "@/lib/types"
import { useRouter } from "next/navigation"
import { CheckCircle } from "lucide-react"

interface LeadFormProps {
  defaultState?: string
  defaultCity?: string
  className?: string
}

export function LeadForm({ defaultState = "MN", defaultCity = "", className = "" }: LeadFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [currentStep, setCurrentStep] = useState(1)

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    zip: "",
    state: defaultState,
    city: defaultCity,
    line_of_business: "" as LineOfBusiness | "",
    commercial_type: "",
    consent_tcpa: false,
  })

  // Capture attribution params on mount
  useEffect(() => {
    captureAttributionParams()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setErrors({})

    try {
      // Get stored attribution params
      const attributionParams = getStoredAttributionParams()

      // Submit lead
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          ...attributionParams,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors)
        } else {
          setError(data.error || "Failed to submit form. Please try again.")
        }
        return
      }

      await trackLeadConversion({
        email: formData.email,
        phone: formData.phone,
        firstName: formData.first_name,
        lastName: formData.last_name,
        lineOfBusiness: formData.line_of_business as string,
      })

      // Redirect to success page
      router.push(`/success?leadId=${data.leadId}&lob=${formData.line_of_business}`)
    } catch (err) {
      console.error("[v0] Form submission error:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const canProceedToStep2 = formData.line_of_business !== ""
  const canProceedToStep3 = canProceedToStep2 && formData.zip !== "" && formData.city !== "" && formData.state !== ""

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="space-y-6">
        {/* Progress Indicator */}
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex flex-1 items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                  currentStep >= step ? "bg-[#00EEFD] text-[#0F172A]" : "bg-muted text-muted-foreground"
                }`}
              >
                {currentStep > step ? <CheckCircle className="h-5 w-5" /> : step}
              </div>
              {step < 3 && (
                <div
                  className={`mx-2 h-1 flex-1 rounded transition-colors ${
                    currentStep > step ? "bg-[#00EEFD]" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Insurance Type */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">What type of insurance do you need?</h3>
              <p className="text-sm text-muted-foreground">Select the coverage you're interested in</p>
            </div>

            <div className="space-y-3">
              {[
                { value: "auto", label: "Auto Insurance", desc: "Car, truck, or motorcycle" },
                { value: "home", label: "Home Insurance", desc: "Homeowners or renters" },
                { value: "bundle", label: "Auto + Home Bundle", desc: "Save up to 25% more" },
                { value: "life", label: "Life Insurance", desc: "Term or whole life" },
                { value: "commercial", label: "Commercial Insurance", desc: "Business coverage" },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    handleChange("line_of_business", option.value as LineOfBusiness)
                    setTimeout(() => setCurrentStep(2), 300)
                  }}
                  className={`w-full rounded-lg border-2 p-4 text-left transition-all hover:border-[#00EEFD] hover:bg-[#00EEFD]/5 ${
                    formData.line_of_business === option.value ? "border-[#00EEFD] bg-[#00EEFD]/10" : "border-border"
                  }`}
                >
                  <div className="font-semibold">{option.label}</div>
                  <div className="text-sm text-muted-foreground">{option.desc}</div>
                </button>
              ))}
            </div>

            {formData.line_of_business === "commercial" && (
              <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <Label htmlFor="commercial_type">
                  Type of Business <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="commercial_type"
                  type="text"
                  value={formData.commercial_type}
                  onChange={(e) => handleChange("commercial_type", e.target.value)}
                  placeholder="e.g., Restaurant, Retail Store, Construction"
                  required
                  aria-invalid={!!errors.commercial_type}
                  aria-describedby={errors.commercial_type ? "commercial_type-error" : undefined}
                />
                {errors.commercial_type && (
                  <p id="commercial_type-error" className="text-sm text-red-500" role="alert">
                    {errors.commercial_type}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Step 2: Location */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Where are you located?</h3>
              <p className="text-sm text-muted-foreground">We'll find providers in your area</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="zip">
                  ZIP Code <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="zip"
                  type="text"
                  value={formData.zip}
                  onChange={(e) => handleChange("zip", e.target.value)}
                  placeholder="55401"
                  required
                  maxLength={5}
                  className="text-lg"
                  aria-invalid={!!errors.zip}
                  aria-describedby={errors.zip ? "zip-error" : undefined}
                />
                {errors.zip && (
                  <p id="zip-error" className="text-sm text-red-500" role="alert">
                    {errors.zip}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">
                    City <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="city"
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    placeholder="Minneapolis"
                    required
                    aria-invalid={!!errors.city}
                    aria-describedby={errors.city ? "city-error" : undefined}
                  />
                  {errors.city && (
                    <p id="city-error" className="text-sm text-red-500" role="alert">
                      {errors.city}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">
                    State <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="state"
                    type="text"
                    value={formData.state}
                    onChange={(e) => handleChange("state", e.target.value.toUpperCase())}
                    placeholder="MN"
                    maxLength={2}
                    required
                    aria-invalid={!!errors.state}
                    aria-describedby={errors.state ? "state-error" : undefined}
                  />
                  {errors.state && (
                    <p id="state-error" className="text-sm text-red-500" role="alert">
                      {errors.state}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
                Back
              </Button>
              <Button
                type="button"
                onClick={() => setCurrentStep(3)}
                disabled={!canProceedToStep3}
                className="flex-1 bg-[#00EEFD] text-[#0F172A] hover:bg-[#00EEFD]/90"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Contact Info */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Almost done! How can we reach you?</h3>
              <p className="text-sm text-muted-foreground">We'll send your personalized quotes here</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first_name">
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="first_name"
                    type="text"
                    value={formData.first_name}
                    onChange={(e) => handleChange("first_name", e.target.value)}
                    placeholder="John"
                    required
                    aria-invalid={!!errors.first_name}
                    aria-describedby={errors.first_name ? "first_name-error" : undefined}
                  />
                  {errors.first_name && (
                    <p id="first_name-error" className="text-sm text-red-500" role="alert">
                      {errors.first_name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="last_name">
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="last_name"
                    type="text"
                    value={formData.last_name}
                    onChange={(e) => handleChange("last_name", e.target.value)}
                    placeholder="Doe"
                    required
                    aria-invalid={!!errors.last_name}
                    aria-describedby={errors.last_name ? "last_name-error" : undefined}
                  />
                  {errors.last_name && (
                    <p id="last_name-error" className="text-sm text-red-500" role="alert">
                      {errors.last_name}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="john@example.com"
                  required
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-sm text-red-500" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  Phone <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="(555) 123-4567"
                  required
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                />
                {errors.phone && (
                  <p id="phone-error" className="text-sm text-red-500" role="alert">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* TCPA Consent */}
              <div className="flex items-start gap-3 rounded-lg border bg-muted/30 p-4">
                <Checkbox
                  id="consent_tcpa"
                  checked={formData.consent_tcpa}
                  onCheckedChange={(checked) => handleChange("consent_tcpa", checked === true)}
                  required
                  aria-invalid={!!errors.consent_tcpa}
                  aria-describedby={errors.consent_tcpa ? "consent_tcpa-error" : undefined}
                />
                <div className="space-y-1">
                  <Label htmlFor="consent_tcpa" className="text-sm font-normal leading-relaxed">
                    I agree to receive calls, texts, and emails from QuoteLinker and its partners regarding insurance
                    quotes. Message and data rates may apply. <span className="text-red-500">*</span>
                  </Label>
                  {errors.consent_tcpa && (
                    <p id="consent_tcpa-error" className="text-sm text-red-500" role="alert">
                      {errors.consent_tcpa}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Error Alert */}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(2)}
                disabled={isSubmitting}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                type="submit"
                size="lg"
                className="flex-1 bg-[#00EEFD] text-[#0F172A] hover:bg-[#00EEFD]/90 font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Spinner className="mr-2 h-4 w-4" />
                    Getting Quotes...
                  </>
                ) : (
                  "Get Free Quotes"
                )}
              </Button>
            </div>

            <p className="text-center text-xs text-muted-foreground">
              By submitting, you agree to our{" "}
              <a href="/privacy" className="underline hover:text-foreground">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="/terms" className="underline hover:text-foreground">
                Terms
              </a>
              .
            </p>
          </div>
        )}
      </div>
    </form>
  )
}
