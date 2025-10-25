import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { getEstimatedPremium, formatCurrency } from "@/lib/estimates"
import type { LineOfBusiness } from "@/lib/types"

function SuccessContent({
  searchParams,
}: {
  searchParams: { leadId?: string; lob?: LineOfBusiness }
}) {
  const showEstimate = process.env.NEXT_PUBLIC_SHOW_ESTIMATES === "true"
  const lineOfBusiness = searchParams.lob

  let estimate = null
  if (showEstimate && lineOfBusiness) {
    estimate = getEstimatedPremium(lineOfBusiness)
  }

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-3xl">Thank You!</CardTitle>
          <CardDescription className="text-lg">Your quote request has been received successfully.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border bg-muted/50 p-6">
            <h3 className="font-semibold">What happens next?</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#00EEFD]" />
                <span>Our team is reviewing your information and matching you with the best insurance providers.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#00EEFD]" />
                <span>You'll receive personalized quotes via email and phone within 24 hours.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#00EEFD]" />
                <span>Compare quotes and choose the coverage that best fits your needs and budget.</span>
              </li>
            </ul>
          </div>

          {estimate && (
            <div className="rounded-lg border bg-[#00EEFD]/10 p-6">
              <h3 className="font-semibold">Estimated Premium Range</h3>
              <p className="mt-2 text-sm text-muted-foreground">Based on similar customers in your area:</p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[#00EEFD]">
                  {formatCurrency(estimate.min)} - {formatCurrency(estimate.max)}
                </span>
                <span className="text-muted-foreground">per year</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Actual rates may vary based on your specific situation and coverage needs.
              </p>
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="flex-1 bg-transparent" variant="outline">
              <Link href="/">Return Home</Link>
            </Button>
            <Button asChild className="flex-1 bg-[#00EEFD] text-[#0F172A] hover:bg-[#00EEFD]/90">
              <Link href="/quotes/mn/minneapolis">Explore More Quotes</Link>
            </Button>
          </div>

          {searchParams.leadId && (
            <p className="text-center text-xs text-muted-foreground">Reference ID: {searchParams.leadId}</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function SuccessPage({
  searchParams,
}: {
  searchParams: { leadId?: string; lob?: LineOfBusiness }
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent searchParams={searchParams} />
    </Suspense>
  )
}
