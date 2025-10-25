import type { Metadata } from "next"
import { HomePageClient } from "./HomePageClient"

export const metadata: Metadata = {
  title: "QuoteLinker - Get Instant Insurance Quotes in Minnesota",
  description:
    "Compare insurance quotes from top providers in Minnesota. Get instant quotes for auto, home, life, and commercial insurance. Fast, free, and easy.",
  openGraph: {
    title: "QuoteLinker - Get Instant Insurance Quotes in Minnesota",
    description:
      "Compare insurance quotes from top providers in Minnesota. Get instant quotes for auto, home, life, and commercial insurance.",
    url: "https://quotelinker.com",
    siteName: "QuoteLinker",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "QuoteLinker Insurance",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuoteLinker - Get Instant Insurance Quotes in Minnesota",
    description: "Compare insurance quotes from top providers in Minnesota.",
    images: ["/og.jpg"],
  },
}

export default function HomePage() {
  return <HomePageClient />
}
