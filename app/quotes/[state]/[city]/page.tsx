import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { LeadForm } from "@/components/lead-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Shield } from "lucide-react"
import Image from "next/image"
import cities from "@/data/cities.json"
import type { City } from "@/lib/types"

interface CityPageProps {
  params: {
    state: string
    city: string
  }
}

// Generate static params for all cities
export async function generateStaticParams() {
  return cities.map((city) => ({
    state: city.stateSlug,
    city: city.slug,
  }))
}

// Get city data
function getCityData(stateSlug: string, citySlug: string): City | null {
  const city = cities.find((c) => c.stateSlug === stateSlug.toLowerCase() && c.slug === citySlug.toLowerCase())
  return city || null
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { state, city: citySlug } = await params
  const city = getCityData(state, citySlug)

  if (!city) {
    return {
      title: "City Not Found",
    }
  }

  const title = `${city.name} Insurance Quotes - Compare Rates | QuoteLinker`
  const description = `Get instant insurance quotes in ${city.name}, ${city.state}. Compare auto, home, life, and commercial insurance from top providers. Free quotes in minutes.`
  const url = `https://quotelinker.com/quotes/${city.stateSlug}/${city.slug}`

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "QuoteLinker",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: `${city.name} Insurance Quotes`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
  }
}

export default async function CityPage({ params }: CityPageProps) {
  const { state, city: citySlug } = await params
  const city = getCityData(state, citySlug)

  if (!city) {
    notFound()
  }

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    name: `QuoteLinker - ${city.name}`,
    description: `Insurance quotes and comparison service in ${city.name}, ${city.state}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: city.state,
      addressCountry: "US",
    },
    areaServed: {
      "@type": "City",
      name: city.name,
      "@id": `https://en.wikipedia.org/wiki/${city.name.replace(/ /g, "_")},_${city.state.replace(/ /g, "_")}`,
    },
    url: `https://quotelinker.com/quotes/${city.stateSlug}/${city.slug}`,
    telephone: "1-800-QUOTE-MN",
    priceRange: "$$",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Insurance Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Auto Insurance",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Home Insurance",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Life Insurance",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Commercial Insurance",
          },
        },
      ],
    },
  }

  return (
    <>
      {/* JSON-LD Script */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="QuoteLinker" width={32} height={32} className="h-8 w-8" />
              <span className="text-xl font-bold text-foreground">QuoteLinker</span>
            </div>
            <nav className="hidden gap-6 md:flex">
              <a href="/#how-it-works" className="text-sm font-medium hover:text-[#00EEFD]">
                How It Works
              </a>
              <a href="/#faq" className="text-sm font-medium hover:text-[#00EEFD]">
                FAQ
              </a>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="border-b bg-gradient-to-b from-muted/50 to-background py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm">
                <MapPin className="h-4 w-4 text-[#00EEFD]" />
                <span className="font-medium">
                  {city.name}, {city.state}
                </span>
              </div>
              <h1 className="text-balance text-4xl font-bold leading-tight text-foreground lg:text-5xl">
                Insurance Quotes in <span className="text-[#00EEFD]">{city.name}</span>
              </h1>
              <p className="mt-4 text-pretty text-lg text-muted-foreground">
                {city.description || `Compare insurance rates from top providers in ${city.name}.`} Get personalized
                quotes for auto, home, life, and commercial insurance in minutes.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-8">
            {/* Left Column - Lead Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Get Your Free {city.name} Quote</CardTitle>
                  <CardDescription>
                    Compare rates from top insurance providers serving {city.name} and surrounding areas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <LeadForm defaultState={city.stateSlug.toUpperCase()} defaultCity={city.name} />
                </CardContent>
              </Card>

              {/* Local Insurance Information */}
              <div className="mt-8 space-y-6">
                <h2 className="text-2xl font-bold">Why Choose Insurance in {city.name}?</h2>
                <div className="prose prose-slate max-w-none dark:prose-invert">
                  <p>
                    {city.name} residents have unique insurance needs based on local factors like weather patterns,
                    traffic conditions, and property values. Our service connects you with insurance providers who
                    understand the {city.name} market and can offer competitive rates tailored to your specific
                    situation.
                  </p>

                  <h3>Local Insurance Considerations</h3>
                  <ul>
                    <li>
                      <strong>Auto Insurance:</strong> {city.name} drivers should consider coverage for harsh winter
                      conditions, including comprehensive coverage for weather-related damage.
                    </li>
                    <li>
                      <strong>Home Insurance:</strong> Protect your {city.name} home against local risks including
                      severe weather, freezing temperatures, and potential water damage.
                    </li>
                    <li>
                      <strong>Life Insurance:</strong> Secure your family's financial future with affordable life
                      insurance options available to {city.name} residents.
                    </li>
                    <li>
                      <strong>Commercial Insurance:</strong> {city.name} businesses need comprehensive coverage
                      including general liability, property, and workers' compensation.
                    </li>
                  </ul>

                  <h3>How to Get the Best Rates in {city.name}</h3>
                  <p>
                    Insurance rates in {city.name} vary significantly between providers. By comparing multiple quotes,
                    you can save hundreds or even thousands of dollars per year. Our free service makes it easy to
                    compare rates from top-rated insurers serving the {city.name} area.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="mt-1 h-5 w-5 text-[#00EEFD]" />
                    <div>
                      <p className="font-medium">Call Us</p>
                      <p className="text-sm text-muted-foreground">1-800-QUOTE-MN</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="mt-1 h-5 w-5 text-[#00EEFD]" />
                    <div>
                      <p className="font-medium">Email Us</p>
                      <p className="text-sm text-muted-foreground">quotes@quotelinker.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Trust Indicators */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Why QuoteLinker?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Shield className="mt-1 h-5 w-5 text-[#00EEFD]" />
                    <div>
                      <p className="font-medium">100% Free Service</p>
                      <p className="text-sm text-muted-foreground">No hidden fees or obligations</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="mt-1 h-5 w-5 text-[#00EEFD]" />
                    <div>
                      <p className="font-medium">Top-Rated Providers</p>
                      <p className="text-sm text-muted-foreground">Compare quotes from trusted insurers</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="mt-1 h-5 w-5 text-[#00EEFD]" />
                    <div>
                      <p className="font-medium">Fast & Easy</p>
                      <p className="text-sm text-muted-foreground">Get quotes in just 2 minutes</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="mt-1 h-5 w-5 text-[#00EEFD]" />
                    <div>
                      <p className="font-medium">Secure & Private</p>
                      <p className="text-sm text-muted-foreground">Your information is protected</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Other Cities */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Other Minnesota Cities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {cities
                      .filter((c) => c.slug !== city.slug)
                      .map((c) => (
                        <li key={c.slug}>
                          <a
                            href={`/quotes/${c.stateSlug}/${c.slug}`}
                            className="text-sm text-[#00EEFD] hover:underline"
                          >
                            {c.name} Insurance Quotes
                          </a>
                        </li>
                      ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t bg-muted/50 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="flex items-center gap-2">
                <Image src="/logo.png" alt="QuoteLinker" width={24} height={24} className="h-6 w-6" />
                <span className="font-semibold">QuoteLinker</span>
              </div>
              <nav className="flex gap-6 text-sm">
                <a href="/privacy" className="hover:text-[#00EEFD]">
                  Privacy Policy
                </a>
                <a href="/terms" className="hover:text-[#00EEFD]">
                  Terms of Service
                </a>
              </nav>
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} QuoteLinker. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
