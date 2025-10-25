const LAST_UPDATED = new Date().toLocaleDateString()

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-4xl font-bold">Terms of Service</h1>
      <p className="mt-4 text-muted-foreground">Last updated: {LAST_UPDATED}</p>

      <div className="prose prose-slate mt-8 max-w-none dark:prose-invert">
        <h2>Agreement to Terms</h2>
        <p>
          By accessing or using QuoteLinker, you agree to be bound by these Terms of Service and all applicable laws and
          regulations.
        </p>

        <h2>Use of Service</h2>
        <p>Our service is designed to help you:</p>
        <ul>
          <li>Request insurance quotes from multiple providers</li>
          <li>Compare coverage options and pricing</li>
          <li>Connect with licensed insurance professionals</li>
        </ul>

        <h2>User Responsibilities</h2>
        <p>You agree to:</p>
        <ul>
          <li>Provide accurate and complete information</li>
          <li>Use the service only for lawful purposes</li>
          <li>Not attempt to interfere with the service's operation</li>
        </ul>

        <h2>Disclaimer</h2>
        <p>
          QuoteLinker is a lead generation service. We do not provide insurance directly and are not responsible for the
          quotes, policies, or services provided by our partner insurance companies.
        </p>

        <h2>Contact Us</h2>
        <p>If you have questions about these Terms, please contact us at legal@quotelinker.com</p>
      </div>
    </div>
  )
}
