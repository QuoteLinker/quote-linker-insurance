"use client"

import { LeadForm } from "@/components/lead-form"
import { Card } from "@/components/ui/card"
import { Shield, Clock, DollarSign, CheckCircle, Star, Users, Award, TrendingDown } from "lucide-react"
import Image from "next/image"

const CURRENT_YEAR = new Date().getFullYear()

export const HomePageClient = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="QuoteLinker" width={40} height={40} className="h-10 w-10" />
            <span className="text-xl font-bold text-foreground">QuoteLinker</span>
          </div>
          <nav className="hidden gap-6 md:flex">
            <a href="#how-it-works" className="text-sm font-medium transition-colors hover:text-[#00EEFD]">
              How It Works
            </a>
            <a href="#why-us" className="text-sm font-medium transition-colors hover:text-[#00EEFD]">
              Why Us
            </a>
            <a href="#faq" className="text-sm font-medium transition-colors hover:text-[#00EEFD]">
              FAQ
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section with Form */}
      <section className="container mx-auto px-4 py-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-center">
          {/* Left Column - Headline & Social Proof */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 self-start rounded-full bg-[#00EEFD]/10 px-4 py-2 text-sm font-medium text-[#00EEFD]">
              <Star className="h-4 w-4 fill-current" />
              <span>Trusted by 50,000+ Minnesotans</span>
            </div>

            <h1 className="text-balance text-4xl font-bold leading-tight text-foreground lg:text-5xl xl:text-6xl">
              Save Up to <span className="text-[#00EEFD]">40%</span> on Insurance
            </h1>
            <p className="text-pretty text-lg text-muted-foreground lg:text-xl leading-relaxed">
              Compare personalized quotes from Minnesota's top-rated insurance providers in just 2 minutes. Free, fast,
              and no obligation.
            </p>

            {/* Key Benefits */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="flex items-center gap-3 rounded-lg border bg-card p-3 sm:p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00EEFD]/10">
                  <Clock className="h-5 w-5 text-[#00EEFD]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">2-Minute Quote</div>
                  <div className="text-xs text-muted-foreground">Quick & easy</div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border bg-card p-3 sm:p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00EEFD]/10">
                  <Shield className="h-5 w-5 text-[#00EEFD]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">100% Secure</div>
                  <div className="text-xs text-muted-foreground">Bank-level encryption</div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border bg-card p-3 sm:p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00EEFD]/10">
                  <DollarSign className="h-5 w-5 text-[#00EEFD]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">Always Free</div>
                  <div className="text-xs text-muted-foreground">No hidden fees</div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border bg-card p-3 sm:p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00EEFD]/10">
                  <CheckCircle className="h-5 w-5 text-[#00EEFD]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">Top Providers</div>
                  <div className="text-xs text-muted-foreground">A+ rated carriers</div>
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-6 pt-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-10 w-10 rounded-full border-2 border-background bg-muted"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-[#00EEFD] text-[#00EEFD]" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">4.9/5 from 12,000+ reviews</p>
              </div>
            </div>
          </div>

          {/* Right Column - Lead Form */}
          <Card className="border-2 border-[#00EEFD]/20 bg-card shadow-2xl">
            <div className="space-y-4 p-6 sm:p-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">Get Your Free Quote</h2>
                <p className="text-sm text-muted-foreground">Join thousands of Minnesotans saving on insurance</p>
              </div>
              <LeadForm />
            </div>
          </Card>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#00EEFD]">50K+</div>
              <div className="mt-1 text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#00EEFD]">$2.4M+</div>
              <div className="mt-1 text-sm text-muted-foreground">Total Savings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#00EEFD]">40%</div>
              <div className="mt-1 text-sm text-muted-foreground">Average Savings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#00EEFD]">2 Min</div>
              <div className="mt-1 text-sm text-muted-foreground">Average Quote Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-balance text-3xl font-bold lg:text-4xl">How It Works</h2>
            <p className="mt-3 text-pretty text-lg text-muted-foreground">
              Get personalized quotes in three simple steps
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3 lg:mt-16">
            <div className="relative flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#00EEFD] to-[#00d4e3] text-2xl font-bold text-[#0F172A] shadow-lg">
                1
              </div>
              <h3 className="mt-6 text-xl font-semibold">Tell Us About You</h3>
              <p className="mt-3 text-pretty text-muted-foreground leading-relaxed">
                Share basic information about your insurance needs. Takes just 2 minutes and we never sell your data.
              </p>
            </div>
            <div className="relative flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#00EEFD] to-[#00d4e3] text-2xl font-bold text-[#0F172A] shadow-lg">
                2
              </div>
              <h3 className="mt-6 text-xl font-semibold">Compare Quotes</h3>
              <p className="mt-3 text-pretty text-muted-foreground leading-relaxed">
                We instantly connect you with top-rated providers who compete for your business with personalized
                quotes.
              </p>
            </div>
            <div className="relative flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#00EEFD] to-[#00d4e3] text-2xl font-bold text-[#0F172A] shadow-lg">
                3
              </div>
              <h3 className="mt-6 text-xl font-semibold">Save Money</h3>
              <p className="mt-3 text-pretty text-muted-foreground leading-relaxed">
                Choose the best coverage at the best price. Most customers save up to 40% on their insurance premiums.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="border-t bg-muted/30 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-balance text-3xl font-bold lg:text-4xl">Why Choose QuoteLinker?</h2>
            <p className="mt-3 text-pretty text-lg text-muted-foreground">The smart way to shop for insurance</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            <Card className="border-2 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#00EEFD]/10">
                <Users className="h-6 w-6 text-[#00EEFD]" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">50,000+ Happy Customers</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Join thousands of Minnesotans who trust QuoteLinker to find their perfect insurance coverage.
              </p>
            </Card>
            <Card className="border-2 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#00EEFD]/10">
                <Award className="h-6 w-6 text-[#00EEFD]" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">A+ Rated Providers</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                We only work with top-rated insurance carriers with excellent financial strength ratings.
              </p>
            </Card>
            <Card className="border-2 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#00EEFD]/10">
                <TrendingDown className="h-6 w-6 text-[#00EEFD]" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Average 40% Savings</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Our customers save an average of 40% by comparing quotes from multiple providers.
              </p>
            </Card>
            <Card className="border-2 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#00EEFD]/10">
                <Shield className="h-6 w-6 text-[#00EEFD]" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Your Data is Safe</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Bank-level encryption protects your information. We never sell your data to third parties.
              </p>
            </Card>
            <Card className="border-2 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#00EEFD]/10">
                <Clock className="h-6 w-6 text-[#00EEFD]" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Fast & Easy Process</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Get quotes in just 2 minutes. No lengthy forms or complicated questions.
              </p>
            </Card>
            <Card className="border-2 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#00EEFD]/10">
                <DollarSign className="h-6 w-6 text-[#00EEFD]" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">100% Free Service</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                No hidden fees, no obligations. Our service is completely free for you to use.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="border-t py-16 lg:py-24">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="text-center">
            <h2 className="text-balance text-3xl font-bold lg:text-4xl">Frequently Asked Questions</h2>
            <p className="mt-3 text-pretty text-lg text-muted-foreground">
              Everything you need to know about QuoteLinker
            </p>
          </div>
          <div className="mt-12 space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold">Is QuoteLinker really free?</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                Yes! Our service is 100% free with no hidden fees. We're compensated by insurance providers when you
                choose a policy, so you never pay anything to use QuoteLinker.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold">How quickly will I get quotes?</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                Most customers receive their first quote within 24 hours. Some providers may contact you even sooner to
                discuss your specific needs and provide personalized quotes.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold">What types of insurance do you offer?</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                We help you find quotes for auto, home, life, and commercial insurance from top-rated providers in
                Minnesota. You can also bundle auto and home insurance for additional savings.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold">Is my information secure?</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                Absolutely. We use bank-level 256-bit encryption to protect your personal information. We never sell
                your data to third parties and only share it with the insurance providers you choose to work with.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold">Am I obligated to purchase a policy?</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                No. Getting quotes is completely free with no obligation. You're in complete control and can choose the
                policy that's right for you, or walk away with no pressure.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold">How do you make money?</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                We receive a commission from insurance providers when you purchase a policy through our platform. This
                doesn't affect your rates - you get the same price as going directly to the provider.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-gradient-to-br from-[#00EEFD]/10 to-[#00d4e3]/5 py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-balance text-3xl font-bold lg:text-4xl">Ready to Save on Insurance?</h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Join 50,000+ Minnesotans who have saved with QuoteLinker
          </p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-[#00EEFD] px-8 py-4 text-lg font-semibold text-[#0F172A] transition-colors hover:bg-[#00d4e3]"
          >
            Get Free Quote Now
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Image src="/logo.png" alt="QuoteLinker" width={40} height={40} className="h-10 w-10" />
                <span className="text-lg font-bold">QuoteLinker</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Compare insurance quotes from Minnesota's top providers and save up to 40% on your premiums.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Insurance Types</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    Auto Insurance
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Home Insurance
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Life Insurance
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Commercial Insurance
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Company</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#how-it-works" className="hover:text-foreground">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#why-us" className="hover:text-foreground">
                    Why Us
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-foreground">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Legal</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="/privacy" className="hover:text-foreground">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-foreground">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© {CURRENT_YEAR} QuoteLinker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
