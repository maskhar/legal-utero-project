# Reference audit — 2026-10-09

Sources: live https://legal.uteroindonesia.com/, public WordPress API, local `artifacts/reference/data/reference-audit.json`, nine desktop screenshots in `artifacts/reference/screenshots/reference-*-desktop.png` and `artifacts/reference/screenshots/reference-home-mobile.png`. API header reported **71 pages**; posts API returned **16 published posts**. Counts may change. Nine routes sampled; not exhaustive review of 71 bodies, article details, menus or responsive states.

| Route | Observed | Follow-up |
| --- | --- | --- |
| `/` | Multiple hero slides, two-step explanation, numbered services, team, FAQ/news/contact | Match composition, section order, CTAs |
| `/profil/` | “Sejak 1998, Beroperasi di Kota Malang”, mission/values/vision | Verify history and staff |
| `/haki/` | Template counters “Proyek Selesai”, “Happy Clients”, “Experienced Team” | Replace unsupported counters |
| `/penelusuran-merek/` | No meaningful headings beyond footer | Draft approved service explanation |
| `/pendaftaran-merek/` | Perunggu/Perak/Emas and Bronze/Silver/Gold package headings | Confirm prices/inclusions |
| `/proteksi-merek/` | Plagiarism examples and 24/7 monitoring claim | Verify capability and terms |
| `/brand-tracking/` | Thin page about duplication | Explain approved monitoring scope |
| `/berita/` | Listing includes two same-title legalitas posts | Review duplicate/canonical |
| `/kontak/` | Office address/enquiries/hours headings | Verify actual details |

Homepage observed logo `/wp-content/uploads/2024/02/logo-1.png` (471×200), hero images `Home-3-1.png`, `Home-2-1.png`, `Home-1-2.png`. Some service icons load from third-party `themepanthers.com` demo. Contact actions include `mailto:legal@uteroindonesia.com`, `tel:+62 817-388-616`, `https://wa.me/62817388616`; two additional team WhatsApp numbers need ownership confirmation. Font, exact spacing, animation and remaining colors require fresh browser measurement. WordPress also exposes template pages such as `sample-page`, `shop-2`, `checkout-2`, `home-16`: published does not mean approved. Reinspect dropdowns, footer, article bodies, asset rights and redirects before implementation.
