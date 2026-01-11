-- ============================================
-- Add Topic Cluster fields to articles table
-- For SEO Topical Authority structure
-- ============================================

-- Add topic cluster columns to articles table
ALTER TABLE articles
ADD COLUMN IF NOT EXISTS parent_article_id UUID REFERENCES articles(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS topic_cluster_id UUID,
ADD COLUMN IF NOT EXISTS is_pillar_page BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS cluster_order SMALLINT DEFAULT 0;

-- Create indexes for efficient cluster queries
CREATE INDEX IF NOT EXISTS idx_articles_topic_cluster ON articles(topic_cluster_id) WHERE topic_cluster_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_articles_parent ON articles(parent_article_id) WHERE parent_article_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_articles_pillar ON articles(is_pillar_page) WHERE is_pillar_page = true;

-- Add comment for documentation
COMMENT ON COLUMN articles.parent_article_id IS 'Reference to the pillar article this cluster article belongs to';
COMMENT ON COLUMN articles.topic_cluster_id IS 'UUID grouping articles in the same topic cluster';
COMMENT ON COLUMN articles.is_pillar_page IS 'True if this is a comprehensive pillar/guide page';
COMMENT ON COLUMN articles.cluster_order IS 'Order within the topic cluster for navigation';
