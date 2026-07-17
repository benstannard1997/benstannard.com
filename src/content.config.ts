import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
// Astro re-exports Zod v4, whose bundled `z` namespace binding is deprecated;
// importing the module namespace gets the same API without the warning.
import * as z from 'astro/zod';

const series = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/series' }),
  schema: z.object({
    title: z.string(),
    /** Zero-padded, shown as "SERIES 01". */
    index: z.string(),
    year: z.string(),
    location: z.string().optional(),
    /** Lower sorts first on the series index. */
    order: z.number(),
    /** One-line summary for the series index. The markdown body is the long form. */
    summary: z.string(),
    // Only `src` and `alt` matter for real content, and even those are
    // optional here — a missing `src` renders the stripe placeholder and a
    // missing `alt`/`title` gets a generated fallback in [slug].astro, so a
    // half-filled-in image entry still builds rather than failing.
    images: z
      .array(
        z.object({
          /**
           * Flickr direct image URL, e.g. https://live.staticflickr.com/…_b.jpg
           * `null` or omitted renders the stripe placeholder, as in the prototype.
           */
          src: z.url().nullable().optional(),
          alt: z.string().optional(),
          title: z.string().optional(),
          description: z.string().optional(),
          /** Flickr photo page, linked from the carousel caption. */
          href: z.url().optional(),
        }),
      )
      .min(1),
  }),
});

const home = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/home' }),
  // Every field here is optional: this collection is meant to be quick to drop
  // a new photo into without having to fill in every caption line up front.
  // Missing values get sensible fallbacks in src/pages/index.astro rather than
  // here, since a couple of the fallbacks (index, sort order) depend on a
  // photo's position among its siblings, which a single file's schema can't see.
  schema: z.object({
    /** Zero-padded, shown as "INDEX 001" in the footer. */
    index: z.string().optional(),
    year: z.string().optional(),
    /** Lower sorts first; also decides which photo is default when JS is off. */
    order: z.number().optional(),
    image: z
      .object({
        /**
         * Flickr direct image URL, e.g. https://live.staticflickr.com/…_b.jpg
         * `null` or omitted renders the stripe placeholder, as in the prototype.
         */
        src: z.url().nullable().optional(),
        alt: z.string().optional(),
      })
      .optional(),
    caption: z
      .object({
        author: z.string().optional(),
        /** Desktop shows the full line; mobile shows the short one. */
        location: z.string().optional(),
        locationShort: z.string().optional(),
        place: z.string().optional(),
      })
      .optional(),
  }),
});

export const collections = { series, home };
