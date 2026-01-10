-- Migration: Add SEO-enhanced columns to articles table
-- Created: 2026-01-10
-- Purpose: Support FAQ rich snippets and key takeaways for improved SEO

-- Add faqs column (JSONB for flexible FAQ structure)
ALTER TABLE articles
ADD COLUMN IF NOT EXISTS faqs JSONB DEFAULT NULL;

-- Add key_takeaways columns (array of strings)
ALTER TABLE articles
ADD COLUMN IF NOT EXISTS key_takeaways_ko TEXT[] DEFAULT NULL;

ALTER TABLE articles
ADD COLUMN IF NOT EXISTS key_takeaways_en TEXT[] DEFAULT NULL;

-- Add comments for documentation
COMMENT ON COLUMN articles.faqs IS 'FAQ items for SEO rich snippets. Format: [{question_ko, question_en, answer_ko, answer_en}]';
COMMENT ON COLUMN articles.key_takeaways_ko IS 'Key takeaways in Korean for quick summary';
COMMENT ON COLUMN articles.key_takeaways_en IS 'Key takeaways in English for quick summary';

-- Create index for efficient FAQ queries (GIN index for JSONB)
CREATE INDEX IF NOT EXISTS idx_articles_faqs ON articles USING GIN (faqs) WHERE faqs IS NOT NULL;
