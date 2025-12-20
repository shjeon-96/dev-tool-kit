-- ============================================
-- Web Toolkit Leads Schema
-- Migration: 002_leads.sql
-- Description: Email lead collection for Engineering as Marketing
-- ============================================

-- ============================================
-- 1. Leads Table
-- ============================================
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  source_tool TEXT NOT NULL, -- 어떤 도구에서 수집했는지 (e.g., 'pdf-redactor', 'qr-generator')
  lead_magnet TEXT, -- 어떤 자료를 제공했는지 (e.g., 'contract-checklist', 'receipt-template')
  persona_tag TEXT, -- 추정 직군 (e.g., 'legal', 'accounting', 'marketing')
  locale TEXT DEFAULT 'en',
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),

  -- Conversion tracking
  converted_to_user BOOLEAN DEFAULT FALSE,
  converted_user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  converted_at TIMESTAMPTZ,

  -- Pro conversion
  converted_to_pro BOOLEAN DEFAULT FALSE,
  converted_to_pro_at TIMESTAMPTZ,

  -- Unsubscribe
  unsubscribed BOOLEAN DEFAULT FALSE,
  unsubscribed_at TIMESTAMPTZ,

  -- Prevent duplicate leads from same tool
  UNIQUE(email, source_tool)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_persona ON public.leads(persona_tag);
CREATE INDEX IF NOT EXISTS idx_leads_source ON public.leads(source_tool);
CREATE INDEX IF NOT EXISTS idx_leads_subscribed_at ON public.leads(subscribed_at);
CREATE INDEX IF NOT EXISTS idx_leads_converted ON public.leads(converted_to_pro) WHERE converted_to_pro = TRUE;

-- RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Anonymous users can insert leads (for lead capture)
CREATE POLICY "Anyone can submit leads"
  ON public.leads FOR INSERT
  WITH CHECK (true);

-- Only service role can read/update leads (for admin dashboard)
-- No SELECT policy for regular users

-- ============================================
-- 2. Lead Magnets Configuration Table
-- ============================================
CREATE TABLE IF NOT EXISTS public.lead_magnets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL, -- e.g., 'contract-checklist'
  tool_slugs TEXT[] NOT NULL, -- 어떤 도구들에서 이 magnet을 제안할지
  persona_tag TEXT NOT NULL,

  -- Content
  title_en TEXT NOT NULL,
  title_ko TEXT,
  title_ja TEXT,
  description_en TEXT NOT NULL,
  description_ko TEXT,
  description_ja TEXT,

  -- Delivery
  download_url TEXT, -- S3/R2 URL for the file
  file_type TEXT DEFAULT 'pdf', -- pdf, xlsx, etc.

  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE public.lead_magnets ENABLE ROW LEVEL SECURITY;

-- Anyone can read active lead magnets
CREATE POLICY "Anyone can view active lead magnets"
  ON public.lead_magnets FOR SELECT
  USING (is_active = TRUE);

-- ============================================
-- 3. Initial Lead Magnets Data
-- ============================================
INSERT INTO public.lead_magnets (slug, tool_slugs, persona_tag, title_en, title_ko, description_en, description_ko, download_url)
VALUES
  (
    'contract-checklist',
    ARRAY['pdf-redactor', 'pdf-merger'],
    'legal',
    'Contract Review Checklist (PDF)',
    '계약서 검토 체크리스트 (PDF)',
    'A comprehensive checklist for reviewing contracts, including key clauses to watch for.',
    '계약서 검토 시 확인해야 할 핵심 조항을 정리한 체크리스트입니다.',
    NULL -- URL to be added later
  ),
  (
    'receipt-template',
    ARRAY['ocr-scanner', 'image-converter'],
    'accounting',
    'Receipt Organization Excel Template',
    '영수증 정리 엑셀 템플릿',
    'An Excel template to organize and track your business receipts.',
    '사업 영수증을 효율적으로 정리하고 관리하는 엑셀 템플릿입니다.',
    NULL
  ),
  (
    'social-image-guide',
    ARRAY['og-image-generator', 'image-resizer', 'background-remover'],
    'marketing',
    'Social Media Image Size Guide 2025',
    'SNS 이미지 사이즈 가이드 2025',
    'Complete guide to optimal image sizes for all major social media platforms.',
    '주요 SNS 플랫폼별 최적 이미지 사이즈 완벽 가이드입니다.',
    NULL
  ),
  (
    'qr-marketing-cases',
    ARRAY['qr-generator'],
    'event',
    'QR Code Marketing Success Stories',
    'QR 코드 마케팅 성공 사례집',
    'Real-world examples of successful QR code marketing campaigns.',
    'QR 코드를 활용한 마케팅 성공 사례를 모았습니다.',
    NULL
  ),
  (
    'product-photo-tips',
    ARRAY['background-remover', 'image-resizer', 'image-compressor'],
    'ecommerce',
    'Product Photography Tips for E-commerce',
    '이커머스 상품 사진 촬영 노하우',
    'Professional tips for taking product photos that sell.',
    '판매를 높이는 상품 사진 촬영 노하우를 공유합니다.',
    NULL
  )
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- 4. Email Campaign Tracking (Optional)
-- ============================================
CREATE TABLE IF NOT EXISTS public.email_campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  persona_tags TEXT[], -- 타겟 페르소나
  source_tools TEXT[], -- 타겟 도구 사용자

  -- Stats
  sent_count INTEGER DEFAULT 0,
  opened_count INTEGER DEFAULT 0,
  clicked_count INTEGER DEFAULT 0,
  converted_count INTEGER DEFAULT 0,

  -- Status
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sent', 'archived')),
  scheduled_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 5. Lead Analytics View
-- ============================================
CREATE OR REPLACE VIEW public.lead_analytics AS
SELECT
  source_tool,
  persona_tag,
  lead_magnet,
  COUNT(*) as total_leads,
  COUNT(*) FILTER (WHERE converted_to_user = TRUE) as converted_users,
  COUNT(*) FILTER (WHERE converted_to_pro = TRUE) as converted_pro,
  ROUND(
    COUNT(*) FILTER (WHERE converted_to_pro = TRUE)::NUMERIC /
    NULLIF(COUNT(*), 0) * 100, 2
  ) as pro_conversion_rate,
  DATE(subscribed_at) as date
FROM public.leads
WHERE unsubscribed = FALSE
GROUP BY source_tool, persona_tag, lead_magnet, DATE(subscribed_at);

-- ============================================
-- 6. Functions
-- ============================================

-- Function to link lead to user after signup
CREATE OR REPLACE FUNCTION public.link_lead_to_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Update all leads with this email to mark as converted
  UPDATE public.leads
  SET
    converted_to_user = TRUE,
    converted_user_id = NEW.id,
    converted_at = NOW()
  WHERE email = NEW.email AND converted_to_user = FALSE;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-link leads when user signs up
CREATE TRIGGER on_user_created_link_leads
  AFTER INSERT ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.link_lead_to_user();

-- Function to mark lead as Pro converted
CREATE OR REPLACE FUNCTION public.mark_lead_pro_converted()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'active' AND (OLD.status IS NULL OR OLD.status != 'active') THEN
    UPDATE public.leads
    SET
      converted_to_pro = TRUE,
      converted_to_pro_at = NOW()
    WHERE converted_user_id = NEW.user_id AND converted_to_pro = FALSE;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to mark lead as Pro when subscription becomes active
CREATE TRIGGER on_subscription_active_mark_lead
  AFTER INSERT OR UPDATE ON public.subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION public.mark_lead_pro_converted();
