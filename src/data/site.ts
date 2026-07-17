export type Photo = {
  /** Absolute URL (Flickr) or a path under /public. Null renders the stripe placeholder. */
  src: string | null;
  alt: string;
  title: string;
  /** Optional line of prose shown under the title in a carousel. */
  description?: string;
  /** Link out to the photo's Flickr page, if there is one. */
  href?: string;
};

export const site = {
  wordmark: 'BEN STANNARD',
  tagline: 'PHOTOGRAPHY — SHEFFIELD, UK',
  year: '2025',
  nav: [
    { label: 'SERIES', href: '/series' },
    { label: 'ABOUT', href: '/about' },
    { label: 'CONTACT', href: '/contact' },
  ],
  contact: {
    email: 'hello@benstannard.co.uk',
    instagram: 'https://instagram.com/',
    flickr: 'https://flickr.com/',
  },
};

/** The single photograph the homepage is built around. */
export const featured = {
  photo: {
    src: null,
    alt: 'Stanage Edge, Peak District',
    title: 'Untitled (Profile)',
  } satisfies Photo,
  index: '001',
  year: '2025',
  caption: {
    author: 'Ben Stannard',
    /** Desktop shows the full coordinate line; mobile shows the short one. */
    location: 'Stanage Edge — Coordinates: 53°21′05″N 1°38′08″W',
    locationShort: 'Stanage Edge — 53°21′05″N 1°38′08″W',
    place: 'Peak District, England, 2025',
  },
};
