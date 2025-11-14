# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Żółty Zeszyt" (Yellow Notebook) is a recipe blog built with Astro, featuring a collection of cooking recipes in Polish. The site uses Astro's content collections for managing posts, TailwindCSS for styling, and includes features like tag-based filtering, pagination, and RSS feeds.

## Development Commands

```bash
npm run dev           # Start development server at localhost:4321
npm run build         # Build production site to ./dist/
npm run preview       # Preview production build locally
npm run astro         # Run Astro CLI commands
```

## Build and Deployment

The project uses a Makefile for advanced build and deployment:

```bash
make build            # Build with nvm use 18 && npm run build
make compress         # Compress static assets with gzip/brotli
make deploy           # Deploy to /usr/share/nginx/html/zoltyzeszyt/
```

The compress target uses Zopfli for gzip, Brotli for .br compression, and pngquant for PNG optimization.

## Content Architecture

### Content Collections

Posts are managed via Astro's content collections in `src/content/posts/`. Each post is a markdown file with frontmatter:

```yaml
---
pubDate: 2025-03-15
author: Michał Korzycki
title: Recipe Title
description: Recipe description
image:
  url: "/images/recipe.jpg"
  alt: "Alt text"
tags: ["Thai", "Salad"]
hidden: false  # Optional, defaults to false
---
```

Schema is defined in `src/content/config.ts` using Zod validation.

### Post Utilities

`src/utils/posts.ts` provides core functions:

- `getSortedPosts()` - Returns all posts sorted by date (newest first), filtered to exclude hidden posts
- `getAllTags(posts)` - Extracts unique tags from posts collection
- `PAGE_SIZE` constant = 9 (used for pagination)

### Routing Structure

- `/` - Homepage with paginated post grid
- `/posts/[...slug]` - Individual post pages using `getStaticPaths()` with `getSortedPosts()`
- `/posts/[page]` - Paginated post listings
- `/tags/` - All tags index
- `/tags/[tag]` - Posts filtered by tag with pagination
- `/rss.xml` - RSS feed generation

## Key Patterns

### Static Path Generation

All dynamic routes use Astro's `getStaticPaths()` pattern:

```typescript
export async function getStaticPaths() {
  const posts = await getSortedPosts();
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}
```

### Layout Hierarchy

- `BaseLayout.astro` - Root layout with BaseHead, Navigation, Footer
- `MarkdownPostLayout.astro` - Extends BaseLayout for recipe posts, includes:
  - Hero image from frontmatter
  - Publication date
  - Tag links
  - Share button functionality

### TypeScript Path Aliases

Use `@/*` to reference `src/*`:

```typescript
import BaseLayout from "@/layouts/BaseLayout.astro";
import EntriesOne from "@/components/entries/EntriesOne.astro";
```

## Styling

- TailwindCSS with custom theme configuration in `tailwind.config.cjs`
- Custom fonts: Inter (sans), Gilda Display (display), JetBrains Mono (mono)
- Custom blue color palette with 50-950 shades
- Typography, forms, and aspect-ratio plugins enabled
- Prose styles for markdown content via `.prose-styles` class

## Configuration Notes

- Site URL configured as 'https://lexingtonthemes.com' in `astro.config.mjs` (likely needs updating for production)
- Markdown drafts enabled
- Shiki syntax highlighting with CSS variables theme
- MDX support enabled
- SEO handled via @astrolib/seo in MarkdownPostLayout (contains placeholder URLs/handles)

## Working with Posts

When adding new recipes:
1. Create markdown file in `src/content/posts/`
2. Include required frontmatter (pubDate, author, title, description, image, tags)
3. Use `hidden: true` to draft posts without removing them
4. Images should be in `/public/images/`
5. Posts automatically appear on homepage and tag pages after build
