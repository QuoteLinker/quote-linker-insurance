-- Create leads table for QuoteLinker insurance lead generation
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Contact Information
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  zip VARCHAR(10) NOT NULL,
  state VARCHAR(2) NOT NULL DEFAULT 'MN',
  city VARCHAR(100) NOT NULL,
  
  -- Insurance Details
  line_of_business VARCHAR(50) NOT NULL CHECK (line_of_business IN ('auto', 'home', 'bundle', 'life', 'commercial')),
  commercial_type VARCHAR(100),
  
  -- Consent
  consent_tcpa BOOLEAN NOT NULL DEFAULT false,
  
  -- Attribution Tracking
  utm_source VARCHAR(255),
  utm_medium VARCHAR(255),
  utm_campaign VARCHAR(255),
  utm_term VARCHAR(255),
  utm_content VARCHAR(255),
  gclid VARCHAR(255),
  gbraid VARCHAR(255),
  wbraid VARCHAR(255),
  
  -- Admin Fields
  status VARCHAR(50) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'bound', 'lost')),
  bound BOOLEAN NOT NULL DEFAULT false,
  bound_premium DECIMAL(10, 2),
  carrier VARCHAR(100),
  policy_id VARCHAR(100),
  bound_date DATE,
  notes TEXT,
  
  -- Webhook Status
  webhook_sent BOOLEAN NOT NULL DEFAULT false,
  webhook_attempts INTEGER NOT NULL DEFAULT 0,
  webhook_last_attempt TIMESTAMPTZ,
  webhook_error TEXT
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_state_city ON leads(state, city);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_bound ON leads(bound);
CREATE INDEX IF NOT EXISTS idx_leads_line_of_business ON leads(line_of_business);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policy: Allow service role full access
CREATE POLICY "Service role has full access to leads"
  ON leads
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Policy: Anon users can only insert (for lead form submission)
CREATE POLICY "Anon users can insert leads"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);
