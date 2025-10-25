export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-4xl font-bold">Privacy Policy</h1>
      <p className="mt-4 text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="prose prose-slate mt-8 max-w-none dark:prose-invert">
        <h2>Introduction</h2>
        <p>
          QuoteLinker ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how
          we collect, use, disclose, and safeguard your information when you use our website and services.
        </p>

        <h2>Information We Collect</h2>
        <p>We collect information that you provide directly to us, including:</p>
        <ul>
          <li>Personal identification information (name, email address, phone number)</li>
          <li>Location information (ZIP code, city, state)</li>
          <li>Insurance preferences and needs</li>
          <li>Marketing attribution data (UTM parameters, click IDs)</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide you with insurance quotes from our partner providers</li>
          <li>Communicate with you about your quote requests</li>
          <li>Improve our services and user experience</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2>Information Sharing</h2>
        <p>
          We may share your information with insurance providers and partners to fulfill your quote requests. We do not
          sell your personal information to third parties.
        </p>

        <h2>Contact Us</h2>
        <p>If you have questions about this Privacy Policy, please contact us at privacy@quotelinker.com</p>
      </div>
    </div>
  )
}
