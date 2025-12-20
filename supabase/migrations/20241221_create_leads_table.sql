-- Create leads table for email collection
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  source_tool TEXT NOT NULL,
  lead_magnet TEXT NOT NULL,
  persona_tag TEXT,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Unique constraint on email + source_tool to prevent duplicates
  CONSTRAINT leads_email_source_unique UNIQUE (email, source_tool)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_source_tool ON leads(source_tool);
CREATE INDEX IF NOT EXISTS idx_leads_lead_magnet ON leads(lead_magnet);
CREATE INDEX IF NOT EXISTS idx_leads_subscribed_at ON leads(subscribed_at DESC);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from authenticated or anonymous users
CREATE POLICY "Allow public inserts" ON leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create policy to allow admins to read all leads
CREATE POLICY "Allow authenticated reads" ON leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Comment on table
COMMENT ON TABLE leads IS 'Email leads collected from download actions with lead magnets';
COMMENT ON COLUMN leads.email IS 'User email address';
COMMENT ON COLUMN leads.source_tool IS 'Tool slug where the lead was captured';
COMMENT ON COLUMN leads.lead_magnet IS 'ID of the lead magnet offered';
COMMENT ON COLUMN leads.persona_tag IS 'User persona tag for segmentation';
COMMENT ON COLUMN leads.subscribed_at IS 'When the user submitted their email';
