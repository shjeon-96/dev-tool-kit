import { BLOG_POSTS } from "../model/data";
import { BlogPost } from "../model/types";

export function getAllPosts(): BlogPost[] {
  return BLOG_POSTS.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getRecentPosts(count: number = 3): BlogPost[] {
  return getAllPosts().slice(0, count);
}
