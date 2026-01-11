// Author Query Functions
// Server-side queries for fetching authors from Supabase

import { getUntypedServiceClient } from "@/shared/lib/supabase/server";
import type { Author } from "./types";

/**
 * Get all authors
 */
export async function getAllAuthors(): Promise<Author[]> {
  const supabase = getUntypedServiceClient();

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
  const supabase = getUntypedServiceClient();

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
  const supabase = getUntypedServiceClient();

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
  const supabase = getUntypedServiceClient();

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
  const supabase = getUntypedServiceClient();

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
  const supabase = getUntypedServiceClient();

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
