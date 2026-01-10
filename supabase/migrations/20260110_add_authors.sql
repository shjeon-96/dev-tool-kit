-- ============================================
-- Authors Table Migration
-- ============================================
-- This migration adds author support for E-E-A-T optimization:
-- 1. authors - Stores author profiles with expertise credentials
-- 2. Adds author_id column to articles table

-- ============================================
-- 1. Authors Table
-- ============================================
-- Stores author profiles for E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)

CREATE TABLE IF NOT EXISTS authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Unique identifier for URLs
  slug TEXT UNIQUE NOT NULL,

  -- Bilingual names
  name_ko TEXT NOT NULL,
  name_en TEXT NOT NULL,

  -- Bilingual bios
  bio_ko TEXT,
  bio_en TEXT,

  -- Profile image
  avatar_url TEXT,

  -- E-E-A-T credentials
  credentials TEXT[] DEFAULT '{}',          -- ['SEO Expert', 'Tech Journalist', '10+ years experience']
  expertise_tags TEXT[] DEFAULT '{}',       -- ['seo', 'marketing', 'ai', 'web-development']

  -- Social profiles for sameAs in JSON-LD
  social_profiles JSONB DEFAULT '{}',       -- {"twitter": "url", "linkedin": "url", "website": "url", "github": "url"}

  -- AI generation flag (transparency)
  is_ai_generated BOOLEAN DEFAULT true,

  -- Article count cache (updated via trigger)
  article_count INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for authors
CREATE INDEX IF NOT EXISTS idx_authors_slug ON authors(slug);
CREATE INDEX IF NOT EXISTS idx_authors_expertise ON authors USING gin(expertise_tags);

-- ============================================
-- 2. Add author_id to articles
-- ============================================

ALTER TABLE articles
ADD COLUMN IF NOT EXISTS author_id UUID REFERENCES authors(id) ON DELETE SET NULL;

-- Index for author lookup
CREATE INDEX IF NOT EXISTS idx_articles_author ON articles(author_id);

-- ============================================
-- 3. Triggers
-- ============================================

-- Update updated_at for authors
DROP TRIGGER IF EXISTS update_authors_updated_at ON authors;
CREATE TRIGGER update_authors_updated_at
  BEFORE UPDATE ON authors
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Update author article count when articles change
CREATE OR REPLACE FUNCTION update_author_article_count()
RETURNS TRIGGER AS $$
BEGIN
  -- Update old author's count if changed
  IF TG_OP = 'UPDATE' AND OLD.author_id IS DISTINCT FROM NEW.author_id THEN
    IF OLD.author_id IS NOT NULL THEN
      UPDATE authors
      SET article_count = (
        SELECT COUNT(*) FROM articles
        WHERE author_id = OLD.author_id AND status = 'published'
      )
      WHERE id = OLD.author_id;
    END IF;
  END IF;

  -- Update new/current author's count
  IF NEW.author_id IS NOT NULL THEN
    UPDATE authors
    SET article_count = (
      SELECT COUNT(*) FROM articles
      WHERE author_id = NEW.author_id AND status = 'published'
    )
    WHERE id = NEW.author_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_author_article_count ON articles;
CREATE TRIGGER trigger_update_author_article_count
  AFTER INSERT OR UPDATE OF author_id, status ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_author_article_count();

-- ============================================
-- 4. Row Level Security
-- ============================================

ALTER TABLE authors ENABLE ROW LEVEL SECURITY;

-- Public read access for all authors
CREATE POLICY "Authors are viewable by everyone"
  ON authors FOR SELECT
  USING (true);

-- Service role has full access
CREATE POLICY "Service role has full access to authors"
  ON authors FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================
-- 5. Seed Data - AI Authors
-- ============================================

INSERT INTO authors (slug, name_ko, name_en, bio_ko, bio_en, avatar_url, credentials, expertise_tags, is_ai_generated)
VALUES
  (
    'alex-tech',
    '알렉스 테크',
    'Alex Tech',
    'AI와 웹 개발 분야의 전문 콘텐츠 크리에이터입니다. 최신 기술 트렌드와 개발자 도구에 대한 심층 분석을 제공합니다.',
    'AI-powered content creator specializing in web development and emerging technologies. Providing in-depth analysis of tech trends and developer tools.',
    '/images/authors/alex-tech.webp',
    ARRAY['Tech Analyst', 'AI Content Specialist', 'Web Development Expert'],
    ARRAY['technology', 'ai', 'web-development', 'programming', 'devtools'],
    true
  ),
  (
    'emma-biz',
    '엠마 비즈',
    'Emma Biz',
    '비즈니스 전략과 시장 분석 전문가입니다. 스타트업 생태계와 기업 혁신에 대한 인사이트를 공유합니다.',
    'Business strategy and market analysis specialist. Sharing insights on startup ecosystem and corporate innovation.',
    '/images/authors/emma-biz.webp',
    ARRAY['Business Analyst', 'Market Research Specialist', 'Startup Advisor'],
    ARRAY['business', 'startups', 'market-analysis', 'strategy', 'innovation'],
    true
  ),
  (
    'mia-life',
    '미아 라이프',
    'Mia Life',
    '라이프스타일과 트렌드 분석 전문가입니다. 현대인의 삶의 질 향상을 위한 실용적인 정보를 제공합니다.',
    'Lifestyle and trend analysis expert. Providing practical information for improving modern quality of life.',
    '/images/authors/mia-life.webp',
    ARRAY['Lifestyle Editor', 'Trend Analyst', 'Wellness Advocate'],
    ARRAY['lifestyle', 'trends', 'wellness', 'productivity', 'culture'],
    true
  )
ON CONFLICT (slug) DO UPDATE SET
  name_ko = EXCLUDED.name_ko,
  name_en = EXCLUDED.name_en,
  bio_ko = EXCLUDED.bio_ko,
  bio_en = EXCLUDED.bio_en,
  credentials = EXCLUDED.credentials,
  expertise_tags = EXCLUDED.expertise_tags,
  updated_at = NOW();

-- ============================================
-- Comments
-- ============================================
COMMENT ON TABLE authors IS 'Author profiles for E-E-A-T optimization with bilingual support';
COMMENT ON COLUMN authors.credentials IS 'Professional credentials for E-E-A-T signals';
COMMENT ON COLUMN authors.expertise_tags IS 'Expertise areas for knowsAbout in JSON-LD';
COMMENT ON COLUMN authors.social_profiles IS 'Social media URLs for sameAs in JSON-LD';
COMMENT ON COLUMN authors.is_ai_generated IS 'Transparency flag for AI-generated author personas';
