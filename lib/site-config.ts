/**
 * The one place the canonical domain is written down. Everything that
 * needs an absolute URL — metadataBase, sitemap.ts, robots.ts, JSON-LD,
 * canonical tags — imports this instead of hardcoding the domain, so a
 * future domain change is a one-line edit instead of a grep-and-replace.
 */
export const SITE_URL = "https://boxa.click";
