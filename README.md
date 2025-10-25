# QuoteLinker - Insurance Lead Generation Platform

QuoteLinker is a production-ready Next.js 14 insurance lead generation platform designed for rapid deployment and scalability. Built with TypeScript, Tailwind CSS, and Supabase, it provides instant lead capture, programmatic SEO, admin management, and comprehensive analytics.

**NEW:** Enhanced with conversion-optimized UX inspired by EverQuote, Lemonade, and Hiscox, featuring multi-step progressive disclosure forms, extensive social proof, and modern visual design.

## Strategic Pillars

1. **Lead Capture Excellence** - Multi-step optimized forms with attribution tracking, validation, and instant webhook notifications
2. **Programmatic SEO** - Dynamic city pages with proper metadata, JSON-LD, and sitemap generation
3. **Admin Efficiency** - Comprehensive dashboard for lead management and policy tracking
4. **Analytics & Compliance** - GA4, Google Ads conversion tracking, and GDPR-compliant consent management
5. **Production Ready** - Security headers, rate limiting, error handling, and CI/CD pipeline

## Features

### Lead Generation
- **Multi-step progressive disclosure form** with visual progress indicator
- Real-time validation with inline error messages
- Attribution tracking (UTM params, GCLID, GBRAID, WBRAID)
- Webhook notifications with exponential backoff retry logic
- Email fallback for failed webhooks
- TCPA consent management
- **Conversion-optimized UX** with trust signals and social proof

### Programmatic SEO
- Dynamic routes: `/quotes/[state]/[city]`
- Unique metadata, OG tags, and canonical URLs per city
- JSON-LD structured data (LocalBusiness/InsuranceAgency)
- Automated sitemap generation
- Robots.txt configuration

### Admin Dashboard
- Bearer token authentication
- Lead list with filtering, sorting, and pagination
- Individual lead detail pages
- Policy binding workflow (premium, carrier, policy ID)
- CSV export functionality

### Analytics & Tracking
- Google Analytics 4 (GA4) integration
- Google Ads conversion tracking
- Enhanced Conversions with SHA-256 hashed PII
- Consent Mode v2 compliance
- Cookie consent banner with customization

### Security & Performance
- Content Security Policy (CSP) headers
- Rate limiting on lead submission
- Input sanitization and validation
- Row Level Security (RLS) on database
- Optimized images and lazy loading

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL)
- **UI Components**: shadcn/ui
- **Analytics**: Google Analytics 4, Google Ads
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Supabase account and project
- (Optional) Google Analytics and Google Ads accounts

### Quick Start (Testing with Stubs)

The platform includes stub environment variables that allow you to test immediately without full configuration:

1. **Clone and install**
   \`\`\`bash
   git clone https://github.com/yourusername/quotelinker.git
   cd quotelinker
   npm install
   \`\`\`

2. **Copy environment file**
   \`\`\`bash
   cp .env.local.example .env.local
   \`\`\`

3. **Set up Supabase** (required)
   - Create a Supabase project at [supabase.com](https://supabase.com)
   - Run `scripts/001-create-leads-table.sql` in the SQL editor
   - Add your Supabase credentials to `.env.local`

4. **Test webhooks** (optional)
   - Go to [webhook.site](https://webhook.site)
   - Copy your unique URL
   - Set `WEBHOOK_URL` in `.env.local` to that URL
   - Submit a test lead and watch it appear on webhook.site

5. **Run development server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Test the platform**
   - Visit [http://localhost:3000](http://localhost:3000)
   - Submit a test lead
   - Check webhook.site for the webhook payload
   - Visit `/admin` and login with your `ADMIN_TOKEN`

### Local Development

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/quotelinker.git
   cd quotelinker
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   
   Copy `.env.local.example` to `.env.local` and fill in your values:
   \`\`\`bash
   cp .env.local.example .env.local
   \`\`\`

4. **Set up Supabase database**
   
   Run the SQL scripts in order:
   \`\`\`bash
   # Execute scripts/001-create-leads-table.sql in your Supabase SQL editor
   # Or use the Supabase CLI:
   supabase db push
   \`\`\`

5. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Vercel Deployment

#### Option 1: Deploy from v0 (Recommended)

1. **Connect to Vercel Team**
   - In v0, click the Settings icon in the sidebar
   - Under "Vercel Project Connection", select your QuoteLinker Team project
   - Click "Connect"

2. **Add Supabase Integration**
   - In the v0 sidebar, click "Connect"
   - Add the Supabase integration
   - This automatically populates all Supabase environment variables

3. **Set additional environment variables**
   - In the v0 sidebar, click "Vars"
   - Add `ADMIN_TOKEN` (generate with: `openssl rand -hex 32`)
   - Add `WEBHOOK_URL` (optional, use webhook.site for testing)
   - Add analytics IDs if you have them

4. **Publish**
   - Click the "Publish" button in v0
   - Your app will be live in seconds

#### Option 2: Deploy from GitHub

1. **Connect to Vercel**
   - Push your code to GitHub
   - Import the repository in Vercel
   - Vercel will auto-detect Next.js

2. **Add environment variables**
   - Go to Project Settings > Environment Variables
   - Add all variables from `.env.local.example`

3. **Connect Supabase integration**
   - In Vercel, go to Integrations
   - Add Supabase integration
   - This will automatically populate Supabase environment variables

4. **Deploy**
   - Vercel will automatically deploy on every push to main
   - Production URL will be available immediately

## Environment Variables

### Required

\`\`\`bash
# Supabase (auto-populated by Vercel integration)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Admin Access (generate with: openssl rand -hex 32)
ADMIN_TOKEN=your_secure_admin_token
\`\`\`

### Optional (with Stubs for Testing)

\`\`\`bash
# Webhook Configuration
# For testing: use https://webhook.site to get a unique URL
# Stub: https://webhook.site/unique-id-here
WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/xxxxx
WEBHOOK_TIMEOUT_MS=10000
WEBHOOK_MAX_RETRIES=3

# Fallback Email
# Stub: admin@quotelinker.com
ALERT_FALLBACK_EMAIL=alerts@yourdomain.com

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GADS_ID=AW-XXXXXXXXXX
NEXT_PUBLIC_GADS_CONVERSION_LABEL=xxxxx

# Features
NEXT_PUBLIC_SHOW_ESTIMATES=true
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_verification_code

# Development (for Supabase auth redirects)
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
\`\`\`

**Note:** The platform includes fallback values for optional environment variables, allowing you to test webhooks and notifications immediately. Replace stub values with production credentials before going live.

## UX & Conversion Optimization

QuoteLinker's design is inspired by industry leaders like EverQuote, Lemonade, and Hiscox:

### Multi-Step Progressive Disclosure
- **Step 1**: Insurance type selection with visual cards
- **Step 2**: Location information (ZIP, city, state)
- **Step 3**: Contact details and consent
- Visual progress indicator reduces form abandonment
- Each step focuses on a single decision point

### Trust Signals & Social Proof
- Customer count badges (50,000+ customers)
- Star ratings and review counts
- Trust badges (secure, fast, free, top providers)
- Real-time stats (savings, quote time)
- A+ rated provider messaging

### Conversion-Focused Design
- Prominent CTAs with high-contrast cyan (#00EEFD) color
- Sticky header for easy navigation
- Mobile-first responsive design
- Reduced cognitive load with clear hierarchy
- Benefit-driven copy throughout

### Performance Features
- Smooth animations and transitions
- Instant validation feedback
- Loading states with spinners
- Error handling with helpful messages
- Accessibility-first implementation

## Webhook Integration

QuoteLinker sends lead data to your webhook URL (Zapier, Make, Salesforce, HubSpot, etc.) with automatic retry logic.

### Testing Webhooks

1. Go to [webhook.site](https://webhook.site)
2. Copy your unique webhook URL
3. Set `WEBHOOK_URL` in your environment variables
4. Submit a test lead
5. Watch the webhook payload appear in real-time on webhook.site

### Webhook Payload

\`\`\`json
{
  "lead_id": "uuid",
  "timestamp": "2024-01-01T00:00:00Z",
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "phone": "5551234567",
  "zip": "55401",
  "state": "MN",
  "city": "Minneapolis",
  "line_of_business": "auto",
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "auto-insurance",
  "gclid": "xxxxx"
}
\`\`\`

### Retry Logic

- **Timeout**: 10 seconds (configurable)
- **Max Retries**: 3 attempts (configurable)
- **Backoff**: Exponential (1s, 2s, 4s, 8s)
- **Fallback**: Email notification if all retries fail

### Setting Up Zapier

1. Create a new Zap with "Webhooks by Zapier" trigger
2. Choose "Catch Hook"
3. Copy the webhook URL
4. Add to your `.env.local` as `WEBHOOK_URL`
5. Test by submitting a lead
6. Connect to your CRM, email, or spreadsheet

## Analytics Setup

### Google Analytics 4

1. Create a GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get your Measurement ID (G-XXXXXXXXXX)
3. Add to `.env.local` as `NEXT_PUBLIC_GA_ID`
4. Deploy - tracking will start automatically

### Google Ads Conversion Tracking

1. In Google Ads, go to Tools > Conversions
2. Create a new conversion action
3. Get your Conversion ID (AW-XXXXXXXXXX) and Label
4. Add to `.env.local`:
   \`\`\`bash
   NEXT_PUBLIC_GADS_ID=AW-XXXXXXXXXX
   NEXT_PUBLIC_GADS_CONVERSION_LABEL=xxxxx
   \`\`\`
5. Enhanced Conversions are automatically enabled with SHA-256 hashing

## Admin Usage

### Accessing Admin

1. Navigate to `/admin`
2. Enter your `ADMIN_TOKEN`
3. Token is stored securely in httpOnly cookie

### Managing Leads

- **Filter**: By state, city, line of business, status, or bound status
- **Sort**: Click column headers to sort
- **View Details**: Click the eye icon to view/edit a lead
- **Export**: Click "Export CSV" to download all leads

### Marking Policies as Bound

1. Open a lead detail page
2. Check "Policy Bound"
3. Enter bound premium, carrier, policy ID, and bound date
4. Add notes if needed
5. Click "Save Changes"

## Scripts

\`\`\`bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server

# Quality
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript compiler check

# CI (runs in GitHub Actions)
npm run ci           # Run all checks (lint + typecheck + build)
\`\`\`

## CI/CD Pipeline

GitHub Actions workflow runs on every push and pull request:

1. Install dependencies
2. Run TypeScript type checking
3. Run ESLint
4. Build the application

Vercel handles deployment automatically when connected to your GitHub repository.

## Adding New Cities

1. Edit `data/cities.json`
2. Add new city object:
   \`\`\`json
   {
     "name": "New City",
     "slug": "new-city",
     "state": "Minnesota",
     "stateSlug": "mn",
     "population": 50000,
     "description": "Description of the city"
   }
   \`\`\`
3. Rebuild and deploy
4. New route will be available at `/quotes/mn/new-city`
5. Sitemap will automatically update

## Security Considerations

- **Rate Limiting**: 5 requests per minute per IP on lead submission
- **Input Sanitization**: All user inputs are sanitized to prevent XSS
- **CSRF Protection**: SameSite cookies for admin authentication
- **RLS**: Row Level Security enabled on Supabase
- **CSP Headers**: Content Security Policy prevents unauthorized scripts
- **Environment Variables**: Never commit `.env.local` to version control

## Performance Optimization

- Next.js Image optimization for all images
- Static generation for city pages
- Lazy loading for non-critical components
- Code splitting for admin bundle
- Tailwind CSS purging for minimal CSS bundle

## Troubleshooting

### Leads not appearing in admin
- Check Supabase connection in environment variables
- Verify RLS policies allow service role access
- Check browser console for errors
- Ensure SQL script was executed successfully

### Webhook not firing
- Verify `WEBHOOK_URL` is set correctly
- Test with webhook.site first to confirm functionality
- Check webhook endpoint is accessible
- Review lead record for `webhook_error` field
- Check server logs for retry attempts
- Verify webhook timeout settings

### Analytics not tracking
- Verify `NEXT_PUBLIC_GA_ID` is set
- Check browser console for gtag errors
- Ensure consent banner has been accepted
- Use Google Tag Assistant to debug
- Check that analytics scripts are loading

### Admin authentication failing
- Verify `ADMIN_TOKEN` matches in environment and login
- Clear browser cookies and try again
- Check browser console for errors
- Ensure token is set in Vercel environment variables

### Form validation errors
- Check browser console for detailed error messages
- Verify all required fields are filled
- Ensure phone and ZIP formats are correct
- Check TCPA consent checkbox is checked

## Support

For issues, questions, or contributions:
- Open an issue on GitHub
- Email: support@quotelinker.com
- Documentation: [docs.quotelinker.com](https://docs.quotelinker.com)

## License

MIT License - see LICENSE file for details

## Acknowledgments

Built with:
- [Next.js](https://nextjs.org)
- [Supabase](https://supabase.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Vercel](https://vercel.com)

Design inspiration from:
- [EverQuote](https://www.everquote.com)
- [Lemonade](https://www.lemonade.com)
- [Hiscox](https://www.hiscox.com)
