# SEO and analytics launch checklist

Target canonical origin: https://legal.iuteroindonesia.com.

The application prerenders approved routes with unique titles, descriptions, canonical and hreflang links, Open Graph and Twitter metadata, JSON-LD, robots.txt, and sitemap.xml. Unknown routes return the branded 404 document with noindex. Nginx sends X-Robots-Tag: noindex, nofollow for every host except the production hostname, so the development hostname must remain excluded from search results.

GA4 is optional at build time. Set VITE_GA4_MEASUREMENT_ID=G-... before docker compose build. Analytics loads only after visitor consent and tracks page views plus WhatsApp, telephone, and email contact actions. Do not place secrets in any VITE_* variable.

Before production launch:

1. Create the DNS record and TLS route for legal.iuteroindonesia.com; it did not resolve during implementation on 2026-10-09.
2. Confirm the spelling of legal.iuteroindonesia.com and choose one canonical hostname. Redirect every old or alternate hostname to it with permanent redirects at the trusted reverse proxy.
3. Set the real GA4 Measurement ID. Approve a privacy notice and consent wording before enabling analytics.
4. Verify ownership in Google Search Console and Bing Webmaster Tools. A Google Domain property needs a DNS TXT record; for an HTML meta tag, create a URL-prefix property for https://legal.iuteroindonesia.com/. Set GOOGLE_SITE_VERIFICATION and BING_SITE_VERIFICATION only when the respective HTML-tag verification method is used, then rebuild. Bing also supports importing a verified Search Console site.
5. Submit https://legal.iuteroindonesia.com/sitemap.xml after DNS, TLS, redirects, and production headers are verified.
6. Inspect representative URLs with Google URL Inspection and rich-result/schema validators. Request indexing only after canonical and rendered HTML checks pass.
7. Maintain useful, accurate content and internal links. No technical setting can guarantee first position; ranking depends on intent match, authority, competition, quality, reputation, and ongoing measurement.
