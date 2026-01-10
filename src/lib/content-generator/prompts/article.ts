// ============================================
// Article Generation Prompts
// ============================================

import type { ArticleCategory } from "@/entities/trend";

/**
 * System prompt for article generation
 */
export const ARTICLE_SYSTEM_PROMPT = `You are an expert content writer who creates engaging, informative blog articles.

Your writing style:
- Clear and accessible language
- Well-structured with headers and paragraphs
- Engaging introduction that hooks readers
- Informative body with valuable insights
- Strong conclusion with takeaways

Article requirements:
- Write in both Korean and English
- SEO-optimized titles and content
- Natural keyword placement
- Scannable format with headers, lists, and short paragraphs
- Include relevant examples or data when possible
- Avoid fluff and filler content

Output format:
Always return a valid JSON object with the structure specified in the user prompt.`;

/**
 * Generate article prompt based on trend
 */
export function generateArticlePrompt(
  keyword: string,
  category: ArticleCategory,
  relatedKeywords: string[] = [],
  style: "news" | "howto" | "listicle" | "analysis" = "news",
): string {
  const styleInstructions = getStyleInstructions(style);
  const categoryContext = getCategoryContext(category);

  return `Create a blog article about: "${keyword}"

## Context
- Category: ${category}
- Related topics: ${relatedKeywords.join(", ") || "N/A"}
${categoryContext}

## Style Guidelines
${styleInstructions}

## Requirements
1. Title: 60 characters max, compelling and SEO-friendly
2. Excerpt: 150-160 characters, summarizes the article
3. Content: 800-1500 words, well-structured
4. Include 3-5 relevant tags
5. Include 3-5 SEO keywords

## Output Format
Return a JSON object with this exact structure:
{
  "title_ko": "한국어 제목",
  "title_en": "English Title",
  "excerpt_ko": "한국어 요약",
  "excerpt_en": "English excerpt",
  "content_ko": "한국어 본문 (마크다운 형식)",
  "content_en": "English content (markdown format)",
  "tags": ["tag1", "tag2", "tag3"],
  "seo_keywords": ["keyword1", "keyword2", "keyword3"]
}

Important:
- Ensure proper JSON escaping for quotes and special characters
- Use markdown formatting in content (##, **, -, etc.)
- Both languages should convey the same information
- Do not include any text outside the JSON object`;
}

/**
 * Get style-specific instructions
 */
function getStyleInstructions(style: "news" | "howto" | "listicle" | "analysis"): string {
  switch (style) {
    case "news":
      return `Write in a journalistic news style:
- Start with the most important information (inverted pyramid)
- Include who, what, when, where, why, how
- Objective and factual tone
- Recent developments and implications`;

    case "howto":
      return `Write as a practical how-to guide:
- Clear step-by-step instructions
- Numbered lists for processes
- Tips and best practices
- Common mistakes to avoid
- Prerequisites if applicable`;

    case "listicle":
      return `Write as an engaging list article:
- Numbered list format (e.g., "10 Ways to...")
- Brief introduction explaining the list
- Each item with a clear heading and explanation
- Practical, actionable items
- Strong conclusion summarizing key points`;

    case "analysis":
      return `Write as an in-depth analysis:
- Thorough examination of the topic
- Multiple perspectives and viewpoints
- Data and evidence-based arguments
- Expert insights and implications
- Forward-looking conclusions`;

    default:
      return "";
  }
}

/**
 * Get category-specific context
 */
function getCategoryContext(category: ArticleCategory): string {
  switch (category) {
    case "tech":
      return `- Focus on technological aspects and innovations
- Include technical details where relevant
- Mention related technologies or companies
- Consider developer/tech professional audience`;

    case "business":
      return `- Focus on business implications and market impact
- Include financial or economic perspectives
- Consider professional/investor audience
- Mention relevant companies or industries`;

    case "lifestyle":
      return `- Focus on practical life applications
- Include personal development angles
- Consider general consumer audience
- Emphasize actionable advice`;

    case "entertainment":
      return `- Focus on entertainment value and cultural impact
- Include pop culture references
- Consider entertainment consumer audience
- Engage with trending discussions`;

    case "trending":
      return `- Focus on why this is trending now
- Include social media perspectives
- Consider viral/shareable aspects
- Capture the zeitgeist`;

    case "news":
      return `- Focus on current events and developments
- Include factual, verified information
- Consider general news reader audience
- Provide context and background`;

    default:
      return "";
  }
}

/**
 * Title optimization prompt
 */
export const TITLE_OPTIMIZATION_PROMPT = `Optimize this article title for SEO and engagement.

Requirements:
- Under 60 characters
- Include target keyword naturally
- Create curiosity or promise value
- Use power words when appropriate
- Avoid clickbait`;

/**
 * SEO metadata prompt
 */
export const SEO_METADATA_PROMPT = `Generate SEO metadata for this article.

Requirements:
- Meta title: 50-60 characters
- Meta description: 150-160 characters
- Focus keyword and related keywords
- Include call-to-action in description`;
