-- ============================================
-- Trend Blog Tables Migration
-- ============================================
-- This migration creates tables for the automated trend blog system:
-- 1. trends - Stores detected trends from various sources
-- 2. articles - Stores AI-generated articles
-- 3. publish_queue - Manages article publishing schedule

-- ============================================
-- 1. Trends Table
-- ============================================
-- Stores trend data collected from Google Trends, Reddit, News RSS, etc.

CREATE TABLE IF NOT EXISTS trends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Source information
  source TEXT NOT NULL CHECK (source IN ('google_trends', 'reddit', 'news_rss', 'twitter', 'manual')),
  keyword TEXT NOT NULL,

  -- Metrics
  volume INTEGER DEFAULT 0,                    -- Search volume or popularity score
  competition_score DECIMAL(3,2) DEFAULT 0.5,  -- 0.0 (low) to 1.0 (high)
  priority_score DECIMAL(5,2) DEFAULT 0,       -- Calculated priority for content generation

  -- Categorization
  region TEXT DEFAULT 'global',                -- 'kr', 'us', 'global', etc.
  category TEXT CHECK (category IN ('tech', 'business', 'lifestyle', 'entertainment', 'trending', 'news')),

  -- Status tracking
  detected_at TIMESTAMPTZ DEFAULT NOW(),
  processed BOOLEAN DEFAULT FALSE,
  processed_at TIMESTAMPTZ,

  -- Additional data
  metadata JSONB DEFAULT '{}',                 -- Store source-specific data
  related_keywords TEXT[],

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for trends
CREATE INDEX IF NOT EXISTS idx_trends_processed ON trends(processed, detected_at DESC);
CREATE INDEX IF NOT EXISTS idx_trends_source ON trends(source, detected_at DESC);
CREATE INDEX IF NOT EXISTS idx_trends_category ON trends(category);
CREATE INDEX IF NOT EXISTS idx_trends_priority ON trends(priority_score DESC) WHERE processed = FALSE;
CREATE INDEX IF NOT EXISTS idx_trends_keyword ON trends USING gin(to_tsvector('english', keyword));

-- ============================================
-- 2. Articles Table
-- ============================================
-- Stores AI-generated blog articles with bilingual support (ko, en)

CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Relationship to trend
  trend_id UUID REFERENCES trends(id) ON DELETE SET NULL,

  -- URL and identification
  slug TEXT UNIQUE NOT NULL,

  -- Korean content
  title_ko TEXT NOT NULL,
  excerpt_ko TEXT,
  content_ko TEXT NOT NULL,

  -- English content
  title_en TEXT NOT NULL,
  excerpt_en TEXT,
  content_en TEXT NOT NULL,

  -- Categorization
  category TEXT NOT NULL CHECK (category IN ('tech', 'business', 'lifestyle', 'entertainment', 'trending', 'news')),
  tags TEXT[] DEFAULT '{}',

  -- SEO
  seo_keywords TEXT[] DEFAULT '{}',
  meta_title_ko TEXT,
  meta_title_en TEXT,
  meta_description_ko TEXT,
  meta_description_en TEXT,

  -- Metrics
  reading_time_minutes INTEGER DEFAULT 5,
  word_count_ko INTEGER DEFAULT 0,
  word_count_en INTEGER DEFAULT 0,

  -- Generation metadata
  ai_model TEXT DEFAULT 'claude-haiku',
  generation_prompt_hash TEXT,
  generation_cost_usd DECIMAL(10,6) DEFAULT 0,

  -- Status
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'scheduled', 'published', 'archived')),

  -- Scheduling
  scheduled_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for articles
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status, scheduled_at);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published_at DESC) WHERE status = 'published';
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_trend ON articles(trend_id);
CREATE INDEX IF NOT EXISTS idx_articles_search_ko ON articles USING gin(to_tsvector('simple', title_ko || ' ' || COALESCE(content_ko, '')));
CREATE INDEX IF NOT EXISTS idx_articles_search_en ON articles USING gin(to_tsvector('english', title_en || ' ' || COALESCE(content_en, '')));

-- ============================================
-- 3. Publish Queue Table
-- ============================================
-- Manages the scheduling and status of article publishing

CREATE TABLE IF NOT EXISTS publish_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Article reference
  article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,

  -- Scheduling
  priority INTEGER DEFAULT 0,                  -- Higher = publish first
  scheduled_time TIMESTAMPTZ NOT NULL,

  -- Status tracking
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled')),

  -- Retry mechanism
  retry_count INTEGER DEFAULT 0,
  max_retries INTEGER DEFAULT 3,
  last_error TEXT,

  -- Processing metadata
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for publish_queue
CREATE INDEX IF NOT EXISTS idx_publish_queue_status ON publish_queue(status, scheduled_time);
CREATE INDEX IF NOT EXISTS idx_publish_queue_pending ON publish_queue(scheduled_time) WHERE status = 'pending';
CREATE INDEX IF NOT EXISTS idx_publish_queue_article ON publish_queue(article_id);

-- ============================================
-- 4. Analytics Table (Optional)
-- ============================================
-- Track article performance for content optimization

CREATE TABLE IF NOT EXISTS article_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,

  -- Metrics (updated periodically)
  page_views INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  avg_time_on_page INTEGER DEFAULT 0,         -- In seconds
  bounce_rate DECIMAL(5,2) DEFAULT 0,

  -- Engagement
  social_shares INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,

  -- Date tracking
  date DATE NOT NULL,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(article_id, date)
);

-- Indexes for analytics
CREATE INDEX IF NOT EXISTS idx_analytics_article ON article_analytics(article_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_date ON article_analytics(date DESC);

-- ============================================
-- 5. Trigger Functions
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables
DROP TRIGGER IF EXISTS update_trends_updated_at ON trends;
CREATE TRIGGER update_trends_updated_at
  BEFORE UPDATE ON trends
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_articles_updated_at ON articles;
CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_publish_queue_updated_at ON publish_queue;
CREATE TRIGGER update_publish_queue_updated_at
  BEFORE UPDATE ON publish_queue
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_article_analytics_updated_at ON article_analytics;
CREATE TRIGGER update_article_analytics_updated_at
  BEFORE UPDATE ON article_analytics
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 6. Row Level Security (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE trends ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE publish_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_analytics ENABLE ROW LEVEL SECURITY;

-- Public read access for published articles
CREATE POLICY "Published articles are viewable by everyone"
  ON articles FOR SELECT
  USING (status = 'published');

-- Service role has full access (for cron jobs)
CREATE POLICY "Service role has full access to trends"
  ON trends FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to articles"
  ON articles FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to publish_queue"
  ON publish_queue FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to analytics"
  ON article_analytics FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================
-- 7. Helper Functions
-- ============================================

-- Calculate priority score for a trend
CREATE OR REPLACE FUNCTION calculate_trend_priority(
  p_volume INTEGER,
  p_detected_at TIMESTAMPTZ,
  p_competition_score DECIMAL
) RETURNS DECIMAL AS $$
DECLARE
  volume_score DECIMAL;
  freshness_score DECIMAL;
  competition_score DECIMAL;
  hours_old DECIMAL;
BEGIN
  -- Volume score (0-40 points)
  volume_score := LEAST(p_volume::DECIMAL / 1000, 40);

  -- Freshness score (0-30 points) - newer is better
  hours_old := EXTRACT(EPOCH FROM (NOW() - p_detected_at)) / 3600;
  freshness_score := GREATEST(30 - hours_old * 2, 0);

  -- Competition score (0-30 points) - lower competition is better
  competition_score := 30 - (COALESCE(p_competition_score, 0.5) * 30);

  RETURN volume_score + freshness_score + competition_score;
END;
$$ LANGUAGE plpgsql;

-- Get next articles to publish
CREATE OR REPLACE FUNCTION get_pending_articles(p_limit INTEGER DEFAULT 5)
RETURNS TABLE (
  article_id UUID,
  slug TEXT,
  scheduled_time TIMESTAMPTZ,
  priority INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    pq.article_id,
    a.slug,
    pq.scheduled_time,
    pq.priority
  FROM publish_queue pq
  JOIN articles a ON a.id = pq.article_id
  WHERE pq.status = 'pending'
    AND pq.scheduled_time <= NOW()
  ORDER BY pq.priority DESC, pq.scheduled_time ASC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- Comments
-- ============================================
COMMENT ON TABLE trends IS 'Stores detected trends from Google Trends, Reddit, News RSS, etc.';
COMMENT ON TABLE articles IS 'Stores AI-generated blog articles with bilingual support';
COMMENT ON TABLE publish_queue IS 'Manages article publishing schedule and status';
COMMENT ON TABLE article_analytics IS 'Tracks article performance metrics';
