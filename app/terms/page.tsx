import { COMPANY, SUPPORT } from "@/lib/config"
import { Shield } from "lucide-react"

const LAST_UPDATED = "January 27, 2025"
const CURRENT_YEAR = new Date().getFullYear()

export const metadata = {
  title: "Terms of Service - QuoteLinker",
  description: "QuoteLinker terms of service governing the use of our insurance lead generation platform.",
}

export default function TermsPage() {
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
        <h1 className="text-4xl font-bold text-navy-900 mb-2">Terms of Service</h1>
        <p className="text-slate-600 mb-8">Last updated: {LAST_UPDATED}</p>

        <div className="prose prose-slate max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">1. Agreement to Terms</h2>
            <p className="text-slate-700 leading-relaxed">
              By accessing or using {COMPANY.name} (the "Service"), operated by {COMPANY.legalName}, you agree to be
              bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use
              the Service. These Terms apply to all visitors, users, and others who access or use the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">2. Description of Service</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              {COMPANY.name} is a lead generation platform that connects consumers seeking insurance quotes with
              licensed insurance providers and agents. Our Service allows you to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Request insurance quotes for various types of coverage</li>
              <li>Provide your contact information and insurance needs to qualified providers</li>
              <li>Receive communications from insurance providers regarding your quote request</li>
            </ul>
            <p className="text-slate-700 leading-relaxed mt-4">
              <strong>Important:</strong> {COMPANY.name} is a lead generation service only. We do not provide insurance
              directly, underwrite policies, or act as an insurance broker or agent. All insurance products and services
              are provided by third-party licensed insurance providers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">3. User Eligibility</h2>
            <p className="text-slate-700 leading-relaxed">
              You must be at least 18 years old and legally capable of entering into binding contracts to use our
              Service. By using the Service, you represent and warrant that you meet these eligibility requirements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">4. User Responsibilities</h2>
            <p className="text-slate-700 leading-relaxed mb-4">When using our Service, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Provide accurate, current, and complete information in all quote requests</li>
              <li>Maintain the accuracy of your information and promptly update it as necessary</li>
              <li>Use the Service only for lawful purposes and in accordance with these Terms</li>
              <li>Not use the Service to submit false, misleading, or fraudulent information</li>
              <li>Not attempt to interfere with, compromise, or disrupt the Service's operation or security</li>
              <li>
                Not use automated means (bots, scrapers, etc.) to access the Service without our express written
                permission
              </li>
              <li>Not impersonate any person or entity or misrepresent your affiliation with any person or entity</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">5. Consent to Communications</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              By submitting a quote request through our Service, you expressly consent to receive communications from{" "}
              {COMPANY.name} and our partner insurance providers. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Phone calls (including automated or pre-recorded calls) to the phone number you provided</li>
              <li>Text messages (SMS/MMS) to the phone number you provided</li>
              <li>Emails to the email address you provided</li>
            </ul>
            <p className="text-slate-700 leading-relaxed mt-4">
              You understand that consent is not a condition of purchasing any goods or services, and you may revoke
              your consent at any time by contacting us at {SUPPORT.email}. For more information about how we use your
              information, please see our{" "}
              <a href="/privacy" className="text-cyan-600 hover:text-cyan-700">
                Privacy Policy
              </a>
              .
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">6. Third-Party Insurance Providers</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              When you submit a quote request, your information is shared with third-party insurance providers who may
              contact you with quotes and information about their products and services. You acknowledge and agree that:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>
                {COMPANY.name} is not responsible for the quotes, policies, services, or conduct of third-party
                insurance providers
              </li>
              <li>Any agreements you enter into with insurance providers are solely between you and those providers</li>
              <li>
                Insurance providers are independent businesses and are not agents, employees, or representatives of{" "}
                {COMPANY.name}
              </li>
              <li>You should carefully review all policy terms, conditions, and pricing before purchasing insurance</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">7. Intellectual Property</h2>
            <p className="text-slate-700 leading-relaxed">
              The Service and its original content, features, and functionality are owned by {COMPANY.legalName} and are
              protected by international copyright, trademark, patent, trade secret, and other intellectual property
              laws. You may not copy, modify, distribute, sell, or lease any part of our Service without our express
              written permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">8. Disclaimers and Limitations of Liability</h2>
            <h3 className="text-xl font-semibold text-navy-800 mb-3">8.1 No Warranty</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
              IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
              PURPOSE, AND NON-INFRINGEMENT. {COMPANY.legalName} DOES NOT WARRANT THAT THE SERVICE WILL BE
              UNINTERRUPTED, SECURE, OR ERROR-FREE.
            </p>

            <h3 className="text-xl font-semibold text-navy-800 mb-3 mt-6">8.2 Limitation of Liability</h3>
            <p className="text-slate-700 leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, {COMPANY.legalName} SHALL NOT BE LIABLE FOR ANY INDIRECT,
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER
              INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING
              FROM YOUR USE OF THE SERVICE.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">9. Indemnification</h2>
            <p className="text-slate-700 leading-relaxed">
              You agree to indemnify, defend, and hold harmless {COMPANY.legalName}, its officers, directors, employees,
              and agents from and against any claims, liabilities, damages, losses, and expenses arising out of or in
              any way connected with your access to or use of the Service, your violation of these Terms, or your
              violation of any rights of another party.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">10. Termination</h2>
            <p className="text-slate-700 leading-relaxed">
              We reserve the right to terminate or suspend your access to the Service immediately, without prior notice
              or liability, for any reason, including if you breach these Terms. Upon termination, your right to use the
              Service will immediately cease.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">11. Governing Law and Dispute Resolution</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              These Terms shall be governed by and construed in accordance with the laws of the State of Minnesota,
              United States, without regard to its conflict of law provisions. Any disputes arising from these Terms or
              your use of the Service shall be resolved through binding arbitration in accordance with the rules of the
              American Arbitration Association, except that either party may seek injunctive relief in court to prevent
              infringement of intellectual property rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">12. Changes to Terms</h2>
            <p className="text-slate-700 leading-relaxed">
              We reserve the right to modify or replace these Terms at any time at our sole discretion. If a revision is
              material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes
              a material change will be determined at our sole discretion. By continuing to access or use our Service
              after revisions become effective, you agree to be bound by the revised terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">13. Severability</h2>
            <p className="text-slate-700 leading-relaxed">
              If any provision of these Terms is held to be invalid or unenforceable, such provision shall be struck and
              the remaining provisions shall remain in full force and effect.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">14. Contact Us</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              If you have questions or concerns about these Terms of Service, please contact us:
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
              <a href="/privacy" className="hover:text-navy-600 transition-colors">
                Privacy
              </a>
              <a href="/terms" className="text-navy-600 font-medium">
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
