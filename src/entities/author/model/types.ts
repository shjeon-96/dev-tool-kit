// ============================================
// Author Types
// ============================================
// E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) author system

/**
 * Social profile URLs for JSON-LD sameAs
 */
export interface SocialProfiles {
  twitter?: string;
  linkedin?: string;
  website?: string;
  github?: string;
  youtube?: string;
}

/**
 * Author entity from database
 */
export interface Author {
  id: string;
  slug: string;

  // Bilingual names
  name_ko: string;
  name_en: string;

  // Bilingual bios
  bio_ko: string | null;
  bio_en: string | null;

  // Profile image
  avatar_url: string | null;

  // E-E-A-T credentials
  credentials: string[];
  expertise_tags: string[];

  // Social profiles for JSON-LD sameAs
  social_profiles: SocialProfiles;

  // AI generation transparency
  is_ai_generated: boolean;

  // Cached article count
  article_count: number;

  // Timestamps
  created_at: string;
  updated_at: string;
}

/**
 * Author with localized content
 */
export interface LocalizedAuthor {
  id: string;
  slug: string;
  name: string;
  bio: string | null;
  avatar_url: string | null;
  credentials: string[];
  expertise_tags: string[];
  social_profiles: SocialProfiles;
  is_ai_generated: boolean;
  article_count: number;
}

/**
 * Input for creating a new author
 */
export interface CreateAuthorInput {
  slug: string;
  name_ko: string;
  name_en: string;
  bio_ko?: string;
  bio_en?: string;
  avatar_url?: string;
  credentials?: string[];
  expertise_tags?: string[];
  social_profiles?: SocialProfiles;
  is_ai_generated?: boolean;
}

/**
 * Input for updating an author
 */
export interface UpdateAuthorInput {
  name_ko?: string;
  name_en?: string;
  bio_ko?: string;
  bio_en?: string;
  avatar_url?: string;
  credentials?: string[];
  expertise_tags?: string[];
  social_profiles?: SocialProfiles;
}

/**
 * Helper function to localize author content
 */
export function localizeAuthor(
  author: Author,
  locale: "ko" | "en",
): LocalizedAuthor {
  return {
    id: author.id,
    slug: author.slug,
    name: locale === "ko" ? author.name_ko : author.name_en,
    bio: locale === "ko" ? author.bio_ko : author.bio_en,
    avatar_url: author.avatar_url,
    credentials: author.credentials,
    expertise_tags: author.expertise_tags,
    social_profiles: author.social_profiles,
    is_ai_generated: author.is_ai_generated,
    article_count: author.article_count,
  };
}

/**
 * Get social profile URLs as array for JSON-LD sameAs
 */
export function getSocialProfileUrls(profiles: SocialProfiles): string[] {
  return Object.values(profiles).filter(
    (url): url is string => typeof url === "string" && url.length > 0,
  );
}
