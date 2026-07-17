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
    images: z
      .array(
        z.object({
          /**
           * Flickr direct image URL, e.g. https://live.staticflickr.com/…_b.jpg
           * `null` renders the stripe placeholder, as in the prototype.
           */
          src: z.url().nullable(),
          alt: z.string(),
          title: z.string(),
          description: z.string().optional(),
          /** Flickr photo page, linked from the carousel caption. */
          href: z.url().optional(),
        }),
      )
      .min(1),
  }),
});

export const collections = { series };
