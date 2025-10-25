import { COMPANY, SUPPORT } from "@/lib/config"
import { Mail, MapPin, Phone, Shield } from "lucide-react"

export const metadata = {
  title: "Contact QuoteLinker - Get in Touch",
  description: "Contact QuoteLinker for support, questions, or partnership inquiries. We're here to help.",
}

const CURRENT_YEAR = new Date().getFullYear()

export default function ContactPage() {
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
              <a href="/about" className="text-slate-600 hover:text-navy-600 transition-colors">
                About
              </a>
              <a href="/contact" className="text-navy-600 font-medium">
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6">Contact Us</h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Have questions? Need support? We're here to help. Reach out to our team and we'll get back to you as soon as
            possible.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Email */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-navy-900 mb-2">Email</h2>
            <p className="text-slate-600 mb-4">Send us an email anytime</p>
            <a
              href={`mailto:${SUPPORT.email}`}
              className="text-cyan-600 hover:text-cyan-700 font-medium transition-colors"
            >
              {SUPPORT.email}
            </a>
          </div>

          {/* Phone */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-navy-500 to-navy-600 rounded-xl flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-navy-900 mb-2">Phone</h2>
            <p className="text-slate-600 mb-4">Call us during business hours</p>
            <a
              href={`tel:${SUPPORT.phone}`}
              className="text-cyan-600 hover:text-cyan-700 font-medium transition-colors"
            >
              {SUPPORT.phoneDisplay}
            </a>
          </div>
        </div>

        {/* Addresses */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-navy-900 mb-6 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-cyan-500" />
            Our Addresses
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Legal Address</h3>
              <p className="text-slate-600 leading-relaxed">{SUPPORT.legalAddress}</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Mailing Address</h3>
              <p className="text-slate-600 leading-relaxed">{SUPPORT.mailingAddress}</p>
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-navy-900 mb-4">Business Hours</h2>
          <p className="text-slate-600">
            Monday - Friday: 9:00 AM - 5:00 PM CST
            <br />
            Saturday - Sunday: Closed
          </p>
          <p className="text-sm text-slate-500 mt-4">Email inquiries are answered within 24 business hours</p>
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
              <a href="/about" className="hover:text-navy-600 transition-colors">
                About
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
