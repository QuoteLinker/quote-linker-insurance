import { COMPANY, SUPPORT } from "@/lib/config"
import { Building2, FileText, Mail, MapPin, Phone, Shield } from "lucide-react"

export const metadata = {
  title: "About QuoteLinker - Insurance Lead Generation Platform",
  description:
    "Learn about QuoteLinker LLC, our mission to connect consumers with insurance providers, and our commitment to transparency and compliance.",
}

const CURRENT_YEAR = new Date().getFullYear()

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-navy-600 to-cyan-500 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-navy-900">{COMPANY.name}</span>
            </a>
            <nav className="hidden md:flex items-center gap-6">
              <a href="/" className="text-slate-600 hover:text-navy-600 transition-colors">
                Home
              </a>
              <a href="/about" className="text-navy-600 font-medium">
                About
              </a>
              <a href="/contact" className="text-slate-600 hover:text-navy-600 transition-colors">
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6">About {COMPANY.name}</h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">{COMPANY.description}</p>
        </div>

        {/* Business Details */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-navy-900 mb-6 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-cyan-500" />
            Business Details
          </h2>
          <dl className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <dt className="font-semibold text-slate-700 min-w-[140px]">Legal Name:</dt>
              <dd className="text-slate-600">{COMPANY.legalName}</dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <dt className="font-semibold text-slate-700 min-w-[140px]">EIN:</dt>
              <dd className="text-slate-600">{COMPANY.ein}</dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <dt className="font-semibold text-slate-700 min-w-[140px]">Industry:</dt>
              <dd className="text-slate-600">{COMPANY.industry}</dd>
            </div>
          </dl>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-navy-900 mb-6 flex items-center gap-2">
            <Mail className="w-6 h-6 text-cyan-500" />
            Contact Information
          </h2>
          <dl className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-slate-400 mt-0.5" />
              <div>
                <dt className="font-semibold text-slate-700 mb-1">Email:</dt>
                <dd>
                  <a href={`mailto:${SUPPORT.email}`} className="text-cyan-600 hover:text-cyan-700 transition-colors">
                    {SUPPORT.email}
                  </a>
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-slate-400 mt-0.5" />
              <div>
                <dt className="font-semibold text-slate-700 mb-1">Phone:</dt>
                <dd>
                  <a href={`tel:${SUPPORT.phone}`} className="text-cyan-600 hover:text-cyan-700 transition-colors">
                    {SUPPORT.phoneDisplay}
                  </a>
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
              <div>
                <dt className="font-semibold text-slate-700 mb-1">Legal Address:</dt>
                <dd className="text-slate-600">{SUPPORT.legalAddress}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
              <div>
                <dt className="font-semibold text-slate-700 mb-1">Mailing Address:</dt>
                <dd className="text-slate-600">{SUPPORT.mailingAddress}</dd>
              </div>
            </div>
          </dl>
        </div>

        {/* Compliance */}
        <div className="bg-gradient-to-br from-navy-50 to-cyan-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-navy-900 mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6 text-cyan-500" />
            Compliance & Privacy
          </h2>
          <p className="text-slate-700 mb-4">
            {COMPANY.name} is committed to protecting your privacy and complying with all applicable regulations,
            including TCPA, FCC lead generation rules, and state insurance regulations.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="/privacy" className="text-cyan-600 hover:text-cyan-700 font-medium transition-colors">
              Privacy Policy →
            </a>
            <a href="/terms" className="text-cyan-600 hover:text-cyan-700 font-medium transition-colors">
              Terms of Service →
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-slate-50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-slate-600 text-sm">
            <p>
              © {CURRENT_YEAR} {COMPANY.legalName}. All rights reserved.
            </p>
            <div className="flex justify-center gap-6 mt-4">
              <a href="/privacy" className="hover:text-navy-600 transition-colors">
                Privacy
              </a>
              <a href="/terms" className="hover:text-navy-600 transition-colors">
                Terms
              </a>
              <a href="/contact" className="hover:text-navy-600 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
