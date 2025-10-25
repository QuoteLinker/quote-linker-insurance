"use client"

import { useEffect } from "react"
import Script from "next/script"
import { initializeGtag } from "@/lib/analytics"

export function AnalyticsScripts() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  const gadsId = process.env.NEXT_PUBLIC_GADS_ID

  useEffect(() => {
    // Initialize gtag with consent state
    initializeGtag()
  }, [])

  if (!gaId && !gadsId) {
    return null
  }

  return (
    <>
      {/* Google Analytics 4 */}
      {gaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}

      {/* Google Ads */}
      {gadsId && (
        <Script id="google-ads" strategy="afterInteractive">
          {`
            gtag('config', '${gadsId}');
          `}
        </Script>
      )}
    </>
  )
}
