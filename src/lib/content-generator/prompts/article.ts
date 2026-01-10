// ============================================
// Article Generation Prompts - SEO Optimized
// ============================================
// Based on 2025-2026 Google SEO guidelines:
// - E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)
// - FAQ Schema for rich snippets
// - Structured data optimization
// - Voice/AI search optimization

import type { ArticleCategory } from "@/entities/trend";

/**
 * System prompt for article generation - Enhanced for E-E-A-T
 */
export const ARTICLE_SYSTEM_PROMPT = `You are an expert content writer specializing in creating high-quality, authoritative articles that demonstrate E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness).

## Your Expertise
- Write with authority and deep subject matter knowledge
- Include specific details, data points, and industry insights
- Reference credible sources and current developments
- Provide unique perspectives and analysis
- Share practical, actionable insights based on expertise

## Writing Excellence
- Use a confident, authoritative voice
- Structure content for both readers and search engines
- Create engaging introductions that immediately provide value
- Write in clear, accessible language while maintaining expertise
- Include concrete examples, statistics, or case studies when relevant

## SEO Best Practices (2025-2026)
- Optimize for semantic search and user intent
- Create content that answers "People Also Ask" questions
- Structure with clear H2/H3 hierarchy for featured snippets
- Natural keyword integration (no stuffing)
- Write for both traditional search and AI overviews

## Content Quality Standards
- Every paragraph must provide value
- Remove fluff, filler, and redundant information
- Ensure factual accuracy and cite sources where applicable
- Provide depth that mass-produced content cannot match
- Include unique insights that demonstrate real expertise

## Output Format
Always return a valid JSON object as specified. Ensure proper escaping of special characters, quotes, and newlines within JSON strings.`;

/**
 * Generate article prompt based on trend - Enhanced for SEO
 */
export function generateArticlePrompt(
  keyword: string,
  category: ArticleCategory,
  relatedKeywords: string[] = [],
  style: "news" | "howto" | "listicle" | "analysis" = "news",
): string {
  const styleInstructions = getStyleInstructions(style);
  const categoryContext = getCategoryContext(category);

  return `Create a comprehensive, authoritative article about: "${keyword}"

## Context & Targeting
- Category: ${category}
- Related topics: ${relatedKeywords.join(", ") || "N/A"}
${categoryContext}

## Article Style
${styleInstructions}

## SEO Requirements (Critical)

### Title Optimization
- Korean title: Max 50 characters (for display)
- English title: Max 60 characters
- Include primary keyword naturally
- Use power words (essential, complete, proven, ultimate)
- Create curiosity or promise clear value
- Must work as a Schema.org headline (max 110 chars total)

### Meta Description (Excerpt)
- 150-160 characters exactly
- Include primary keyword in first 60 characters
- Add a compelling call-to-action
- Summarize the key value proposition

### Content Structure
1. **Hook Introduction** (first 100 words)
   - Address the reader's intent immediately
   - Include the target keyword naturally
   - Promise what they'll learn/gain

2. **Table of Contents** (include as ## headings)
   - Use clear, keyword-rich H2 headings
   - 3-5 main sections minimum

3. **Main Content** (800-1500 words)
   - Short paragraphs (2-3 sentences max)
   - Bullet points and numbered lists
   - Bold key terms and insights
   - Include specific data, statistics, or examples
   - Answer related questions naturally

4. **Key Takeaways** (at the end)
   - 3-5 actionable bullet points
   - Summarize main insights

### FAQ Section (Critical for Rich Snippets)
- Generate 4 FAQs based on "People Also Ask" style questions
- Questions should be what real users would search
- Answers should be 2-4 sentences, direct and valuable
- Include target keyword in at least 2 questions

### Keyword Strategy
- Primary keyword: "${keyword}"
- Use primary keyword: 3-5 times naturally
- Include related terms: ${relatedKeywords.slice(0, 5).join(", ") || "variations of primary keyword"}
- LSI keywords: Include semantically related terms

## Output Format
Return a JSON object with this exact structure:
{
  "title_ko": "한국어 제목 (50자 이내, 키워드 포함)",
  "title_en": "English Title (60 chars max, include keyword)",
  "excerpt_ko": "한국어 메타 설명 (150-160자, 키워드 포함, CTA 포함)",
  "excerpt_en": "English meta description (150-160 chars, keyword + CTA)",
  "content_ko": "한국어 본문 (마크다운, 800-1500단어, 구조화된 형식)",
  "content_en": "English content (markdown, 800-1500 words, structured)",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "seo_keywords": ["primary-keyword", "related1", "related2", "related3", "related4"],
  "faqs": [
    {"question_ko": "질문1?", "question_en": "Question 1?", "answer_ko": "답변1", "answer_en": "Answer 1"},
    {"question_ko": "질문2?", "question_en": "Question 2?", "answer_ko": "답변2", "answer_en": "Answer 2"},
    {"question_ko": "질문3?", "question_en": "Question 3?", "answer_ko": "답변3", "answer_en": "Answer 3"},
    {"question_ko": "질문4?", "question_en": "Question 4?", "answer_ko": "답변4", "answer_en": "Answer 4"}
  ],
  "key_takeaways_ko": ["핵심1", "핵심2", "핵심3"],
  "key_takeaways_en": ["Takeaway 1", "Takeaway 2", "Takeaway 3"]
}

## Critical Reminders
- Ensure all JSON strings have properly escaped quotes and newlines
- Both language versions should have equivalent quality and depth
- FAQs should be genuine questions users would search for
- Content must demonstrate expertise, not just summarize`;
}

/**
 * Get style-specific instructions - Enhanced
 */
function getStyleInstructions(
  style: "news" | "howto" | "listicle" | "analysis",
): string {
  switch (style) {
    case "news":
      return `Write as breaking news/current events coverage:
- Lead with the most newsworthy information (inverted pyramid)
- Answer: Who, What, When, Where, Why, How in first 2 paragraphs
- Include quotes or attributed statements where relevant
- Provide context and background for the story
- Discuss implications and what to watch for
- Maintain objectivity while providing expert analysis
- Time-sensitive language where appropriate`;

    case "howto":
      return `Write as an expert practical guide:
- Start with what the reader will achieve
- Prerequisites or requirements section
- Numbered step-by-step instructions
- Pro tips and best practices in callout boxes
- Common mistakes and how to avoid them
- Troubleshooting section for common issues
- Expected outcomes and success indicators
- Resources for further learning`;

    case "listicle":
      return `Write as an engaging, valuable list article:
- Strong headline with specific number (e.g., "7 Proven Ways...")
- Brief introduction explaining the list's value
- Each item with:
  - Clear, benefit-focused subheading
  - 2-3 paragraphs of substantive explanation
  - Specific example or case study
  - Actionable advice
- Items ordered by importance or logic
- Strong conclusion tying items together`;

    case "analysis":
      return `Write as in-depth expert analysis:
- Executive summary with key findings
- Comprehensive examination from multiple angles
- Data-driven arguments with specific statistics
- Expert perspectives and industry context
- Comparison of different viewpoints
- Implications for different stakeholders
- Forward-looking predictions and trends
- Methodology or reasoning explanation where relevant`;

    default:
      return "";
  }
}

/**
 * Get category-specific context - Enhanced for authority
 */
function getCategoryContext(category: ArticleCategory): string {
  switch (category) {
    case "tech":
      return `## Tech Category Guidelines
- Demonstrate technical expertise and understanding
- Include specific technologies, versions, and implementations
- Reference industry leaders, companies, or open-source projects
- Discuss technical architecture or methodology where relevant
- Consider developer, IT professional, and tech enthusiast audiences
- Include performance metrics, benchmarks, or comparisons
- Mention security or privacy implications when applicable`;

    case "business":
      return `## Business Category Guidelines
- Focus on business strategy, market dynamics, and ROI
- Include financial data, market statistics, or industry metrics
- Reference case studies, company examples, or market leaders
- Consider C-suite, investor, and professional audiences
- Discuss competitive landscape and market positioning
- Include actionable business insights and recommendations
- Address risk factors and opportunity costs`;

    case "lifestyle":
      return `## Lifestyle Category Guidelines
- Connect topic to daily life improvements
- Include practical, immediately applicable advice
- Consider diverse audience demographics and situations
- Share relatable examples and scenarios
- Focus on wellness, productivity, or quality of life
- Balance aspirational content with achievable steps
- Include cost-benefit considerations for consumers`;

    case "entertainment":
      return `## Entertainment Category Guidelines
- Capture cultural relevance and trending discussions
- Include industry context and behind-the-scenes insights
- Reference key players, creators, or influencers
- Consider fan communities and casual audiences
- Discuss cultural impact and broader implications
- Include engaging multimedia references
- Balance news coverage with analysis and commentary`;

    case "trending":
      return `## Trending Topic Guidelines
- Explain why this topic is trending NOW
- Include social media context and viral factors
- Capture the zeitgeist and public sentiment
- Provide unique angle beyond surface coverage
- Consider multiple audience perspectives
- Include real-time data or engagement metrics
- Discuss potential longevity vs. fleeting interest`;

    case "news":
      return `## News Category Guidelines
- Prioritize accuracy and verified information
- Include multiple sources and perspectives
- Provide essential context and background
- Consider general reader with varying familiarity
- Discuss immediate and long-term implications
- Maintain journalistic standards and objectivity
- Include expert opinions or official statements`;

    default:
      return "";
  }
}

/**
 * Title optimization prompt - Enhanced
 */
export const TITLE_OPTIMIZATION_PROMPT = `Optimize this article title for SEO and engagement.

Requirements:
- Under 60 characters for display, under 110 for Schema.org
- Include target keyword in first half
- Use power words: Ultimate, Essential, Complete, Proven, Expert
- Create curiosity gap or promise specific value
- Match search intent (informational, navigational, transactional)
- Avoid clickbait - deliver on promise
- Test: Would you click this in search results?`;

/**
 * SEO metadata prompt - Enhanced
 */
export const SEO_METADATA_PROMPT = `Generate SEO metadata optimized for 2025 search standards.

Requirements:
- Meta title: 50-60 characters, keyword-first when natural
- Meta description: 150-160 characters exactly
  - Include primary keyword in first 60 chars
  - Add unique value proposition
  - End with call-to-action
  - Use active voice
- Focus keyword: Single primary target
- Secondary keywords: 3-5 related terms
- Schema considerations: Support NewsArticle, FAQPage markup`;
