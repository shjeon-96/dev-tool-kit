// Author Query Functions
// Server-side queries for fetching authors from Supabase

import { createClient } from "@supabase/supabase-js";
import type { Author } from "./types";

// Create Supabase client for server-side queries
// Returns null if env vars are not available (e.g., during CI build)
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseKey);
}

/**
 * Get all authors
 */
export async function getAllAuthors(): Promise<Author[]> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("authors")
    .select("*")
    .order("article_count", { ascending: false });

  if (error) {
    console.error("[Queries] getAllAuthors error:", error);
    return [];
  }

  return data || [];
}

/**
 * Get author by slug
 */
export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("authors")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("[Queries] getAuthorBySlug error:", error);
    return null;
  }

  return data;
}

/**
 * Get author by ID
 */
export async function getAuthorById(id: string): Promise<Author | null> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("authors")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("[Queries] getAuthorById error:", error);
    return null;
  }

  return data;
}

/**
 * Get authors by expertise tag
 */
export async function getAuthorsByExpertise(tag: string): Promise<Author[]> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("authors")
    .select("*")
    .contains("expertise_tags", [tag])
    .order("article_count", { ascending: false });

  if (error) {
    console.error("[Queries] getAuthorsByExpertise error:", error);
    return [];
  }

  return data || [];
}

/**
 * Get all author slugs (for static generation)
 */
export async function getAllAuthorSlugs(): Promise<string[]> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase.from("authors").select("slug");

  if (error) {
    console.error("[Queries] getAllAuthorSlugs error:", error);
    return [];
  }

  return (data || []).map((row) => row.slug);
}

/**
 * Get featured authors (top by article count)
 */
export async function getFeaturedAuthors(limit: number = 3): Promise<Author[]> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("authors")
    .select("*")
    .order("article_count", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[Queries] getFeaturedAuthors error:", error);
    return [];
  }

  return data || [];
}
