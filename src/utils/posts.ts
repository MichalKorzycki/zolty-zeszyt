import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

export const PAGE_SIZE = 9;

/**
 * Get all posts sorted by date (newest first) and filtered to exclude hidden posts
 */
export async function getSortedPosts(): Promise<CollectionEntry<"posts">[]> {
  const posts = await getCollection("posts");
  return posts
    .filter((entry) => !entry.data.hidden)
    .sort(
      (a, b) =>
        new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf()
    );
}

/**
 * Extract all unique tags from a collection of posts
 */
export function getAllTags(posts: CollectionEntry<"posts">[]): string[] {
  return [...new Set(posts.flatMap((post) => post.data.tags))];
}
