import { boolean } from "astro/zod";
import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
    schema: z.object({
      title: z.string(),
      pubDate: z.date(),
      description: z.string(),
      author: z.string(),
      hidden: z.boolean().default(false),
      image: z.object({
        url: z.string(),
        alt: z.string()
      }),

      tags: z.array(z.string())
    })
 });

export const collections = {
  posts: postsCollection,
};