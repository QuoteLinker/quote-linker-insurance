"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"
import { hasConsent, grantAllConsent, denyAllConsent, customizeConsent, type ConsentState } from "@/lib/analytics"

export function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [showCustomize, setShowCustomize] = useState(false)
  const [customConsent, setCustomConsent] = useState<ConsentState>({
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  })

  useEffect(() => {
    // Show banner if user hasn't made a choice
    if (!hasConsent()) {
      setIsVisible(true)
    }
  }, [])

  const handleAcceptAll = () => {
    grantAllConsent()
    setIsVisible(false)
  }

  const handleRejectAll = () => {
    denyAllConsent()
    setIsVisible(false)
  }

  const handleSaveCustom = () => {
    customizeConsent(customConsent)
    setIsVisible(false)
  }

  const toggleConsent = (key: keyof ConsentState) => {
    setCustomConsent((prev) => ({
      ...prev,
      [key]: prev[key] === "granted" ? "denied" : "granted",
    }))
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6">
      <Card className="mx-auto max-w-4xl shadow-2xl">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Cookie Preferences</CardTitle>
              <CardDescription className="mt-2">
                We use cookies and similar technologies to improve your experience, analyze site traffic, and
                personalize content. Choose your preferences below.
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleRejectAll}
              aria-label="Close and reject all"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        {showCustomize && (
          <CardContent className="space-y-4 border-t pt-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="analytics"
                  checked={customConsent.analytics_storage === "granted"}
                  onCheckedChange={() => toggleConsent("analytics_storage")}
                />
                <div className="space-y-1">
                  <Label htmlFor="analytics" className="font-medium">
                    Analytics Cookies
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Help us understand how visitors interact with our website by collecting and reporting information
                    anonymously.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="advertising"
                  checked={
                    customConsent.ad_storage === "granted" &&
                    customConsent.ad_user_data === "granted" &&
                    customConsent.ad_personalization === "granted"
                  }
                  onCheckedChange={() => {
                    const newValue = customConsent.ad_storage === "granted" ? "denied" : "granted"
                    setCustomConsent({
                      ...customConsent,
                      ad_storage: newValue,
                      ad_user_data: newValue,
                      ad_personalization: newValue,
                    })
                  }}
                />
                <div className="space-y-1">
                  <Label htmlFor="advertising" className="font-medium">
                    Advertising Cookies
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Used to make advertising messages more relevant to you and your interests. They also perform
                    functions like preventing the same ad from continuously reappearing.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        )}

        <CardFooter className="flex flex-col gap-3 sm:flex-row">
          {showCustomize ? (
            <>
              <Button
                variant="outline"
                className="w-full sm:w-auto bg-transparent"
                onClick={() => setShowCustomize(false)}
              >
                Back
              </Button>
              <Button
                className="w-full bg-[#00EEFD] text-[#0F172A] hover:bg-[#00EEFD]/90 sm:w-auto"
                onClick={handleSaveCustom}
              >
                Save Preferences
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" className="w-full sm:w-auto bg-transparent" onClick={handleRejectAll}>
                Reject All
              </Button>
              <Button
                variant="outline"
                className="w-full sm:w-auto bg-transparent"
                onClick={() => setShowCustomize(true)}
              >
                Customize
              </Button>
              <Button
                className="w-full bg-[#00EEFD] text-[#0F172A] hover:bg-[#00EEFD]/90 sm:w-auto"
                onClick={handleAcceptAll}
              >
                Accept All
              </Button>
            </>
          )}
        </CardFooter>

        <div className="border-t px-6 py-4">
          <p className="text-xs text-muted-foreground">
            By clicking "Accept All", you agree to the storing of cookies on your device. View our{" "}
            <a href="/privacy" className="underline hover:text-foreground">
              Privacy Policy
            </a>{" "}
            for more information.
          </p>
        </div>
      </Card>
    </div>
  )
}
