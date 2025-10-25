import { COMPANY, SUPPORT } from "@/lib/config"
import { Shield } from "lucide-react"

const LAST_UPDATED = "January 27, 2025"
const CURRENT_YEAR = new Date().getFullYear()

export const metadata = {
  title: "Privacy Policy - QuoteLinker",
  description:
    "QuoteLinker privacy policy explaining how we collect, use, and protect your personal information in compliance with TCPA and FCC regulations.",
}

export default function PrivacyPage() {
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
              <a href="/contact" className="text-slate-600 hover:text-navy-600 transition-colors">
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-4xl font-bold text-navy-900 mb-2">Privacy Policy</h1>
        <p className="text-slate-600 mb-8">Last updated: {LAST_UPDATED}</p>

        <div className="prose prose-slate max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">1. Introduction</h2>
            <p className="text-slate-700 leading-relaxed">
              {COMPANY.legalName} ("we," "our," or "us") operates {COMPANY.name}, a lead generation platform that
              connects consumers seeking insurance quotes with qualified insurance providers. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your information when you use our website and
              services. We are committed to protecting your privacy and complying with all applicable laws, including
              the Telephone Consumer Protection Act (TCPA), FCC lead generation regulations, and state insurance laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-semibold text-navy-800 mb-3">2.1 Information You Provide</h3>
            <p className="text-slate-700 leading-relaxed mb-4">When you request an insurance quote, we collect:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Personal identification information (first name, last name, email address, phone number)</li>
              <li>Location information (ZIP code, city, state)</li>
              <li>Insurance preferences (type of insurance, commercial insurance type if applicable)</li>
            </ul>

            <h3 className="text-xl font-semibold text-navy-800 mb-3 mt-6">2.2 Automatically Collected Information</h3>
            <p className="text-slate-700 leading-relaxed mb-4">We automatically collect:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Marketing attribution data (UTM parameters, Google Click IDs, conversion tracking data)</li>
              <li>Device and browser information</li>
              <li>IP address and approximate location</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-slate-700 leading-relaxed mb-4">We use your information to:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Connect you with insurance providers who can provide quotes for your specific needs</li>
              <li>Communicate with you about your quote requests via email, phone, or text message</li>
              <li>Improve our services and user experience</li>
              <li>Analyze marketing effectiveness and optimize our advertising campaigns</li>
              <li>Comply with legal obligations and enforce our Terms of Service</li>
              <li>Prevent fraud and ensure the security of our platform</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">4. Information Sharing and Disclosure</h2>
            <h3 className="text-xl font-semibold text-navy-800 mb-3">4.1 Insurance Providers</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              When you submit a quote request, we share your information with insurance providers and licensed agents
              who can fulfill your request. By submitting your information, you provide prior express written consent to
              be contacted by these providers via phone (including automated calls), text message (SMS/MMS), or email
              regarding insurance products and services that are logically and topically related to your quote request.
            </p>

            <h3 className="text-xl font-semibold text-navy-800 mb-3 mt-6">4.2 Service Providers</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              We may share your information with third-party service providers who assist us in operating our platform,
              conducting our business, or servicing you, including database hosting, analytics, and customer support
              services.
            </p>

            <h3 className="text-xl font-semibold text-navy-800 mb-3 mt-6">4.3 Legal Requirements</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              We may disclose your information if required by law, court order, or governmental regulation, or if we
              believe disclosure is necessary to protect our rights, your safety, or the safety of others.
            </p>

            <h3 className="text-xl font-semibold text-navy-800 mb-3 mt-6">4.4 No Sale of Personal Information</h3>
            <p className="text-slate-700 leading-relaxed">
              We do not sell your personal information to third parties for monetary consideration.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">5. TCPA Consent and Communication Preferences</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              By submitting your phone number through our quote request form, you provide your prior express written
              consent to receive calls and text messages (including through automated technology such as auto-dialers
              and pre-recorded messages) from {COMPANY.name} and our partner insurance providers at the phone number you
              provided. You understand that:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-4">
              <li>Consent is not a condition of purchasing any goods or services</li>
              <li>Communications will be logically and topically related to your insurance quote request</li>
              <li>Message and data rates may apply</li>
              <li>
                You may revoke consent at any time by contacting us at {SUPPORT.email} or replying STOP to any text
                message
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">6. Cookies and Tracking Technologies</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              We use cookies, web beacons, and similar technologies to enhance your experience, analyze site usage, and
              assist in our marketing efforts. You can control cookies through your browser settings, but disabling
              cookies may limit your ability to use certain features of our site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">7. Data Security</h2>
            <p className="text-slate-700 leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal
              information against unauthorized access, alteration, disclosure, or destruction. However, no method of
              transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute
              security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">8. Data Retention</h2>
            <p className="text-slate-700 leading-relaxed">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this
              Privacy Policy, comply with legal obligations, resolve disputes, and enforce our agreements. Lead data is
              typically retained for up to 7 years for compliance and business purposes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">9. Your Privacy Rights</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate information</li>
              <li>Deletion of your information (subject to legal retention requirements)</li>
              <li>Opt-out of marketing communications</li>
              <li>Revocation of consent for phone and text communications</li>
            </ul>
            <p className="text-slate-700 leading-relaxed mt-4">
              To exercise these rights, contact us at {SUPPORT.email}.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">10. Children's Privacy</h2>
            <p className="text-slate-700 leading-relaxed">
              Our services are not directed to individuals under the age of 18. We do not knowingly collect personal
              information from children. If you believe we have collected information from a child, please contact us
              immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">11. Changes to This Privacy Policy</h2>
            <p className="text-slate-700 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting
              the new Privacy Policy on this page and updating the "Last updated" date. Your continued use of our
              services after changes are posted constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">12. Contact Us</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
              <p className="text-slate-700">
                <strong>{COMPANY.legalName}</strong>
              </p>
              <p className="text-slate-700">
                Email:{" "}
                <a href={`mailto:${SUPPORT.email}`} className="text-cyan-600 hover:text-cyan-700">
                  {SUPPORT.email}
                </a>
              </p>
              <p className="text-slate-700">
                Phone:{" "}
                <a href={`tel:${SUPPORT.phone}`} className="text-cyan-600 hover:text-cyan-700">
                  {SUPPORT.phoneDisplay}
                </a>
              </p>
              <p className="text-slate-700">Address: {SUPPORT.legalAddress}</p>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t bg-slate-50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-slate-600 text-sm">
            <p>
              © {CURRENT_YEAR} {COMPANY.legalName}. All rights reserved.
            </p>
            <div className="flex justify-center gap-6 mt-4">
              <a href="/privacy" className="text-navy-600 font-medium">
                Privacy
              </a>
              <a href="/terms" className="hover:text-navy-600 transition-colors">
                Terms
              </a>
              <a href="/contact" className="hover:text-navy-600 transition-colors">
                Contact
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
