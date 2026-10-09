# Architecture — target, not implemented

Baseline: React 19, TypeScript 6, Vite 8, React Router dependency, Tailwind dependency/plugin, Docker multistage and unprivileged Nginx on 8080. `src/App.tsx` remains starter; `npm run build` is `tsc -b && vite build`: no route prerender, typed content registry or site router yet. Existing `docs/DEPLOYMENT.md` and `docs/SECURITY.md` document infrastructure limits.

Target boundaries: typed reviewed records in `src/content/`; shared layout/accessible components in `src/components/`; route views in `src/pages/`; shared tokens in styles; one route registry for views, metadata and approved content. Article content should be curated structured blocks or sanitized, never untrusted raw WordPress scripts. Unknown slug must return a real 404.

Proposed build: validate content and links, build client, prerender every approved route into `dist/<route>/index.html` with unique title/description/canonical/OG and visible content, generate sitemap/robots, then inspect HTML without JavaScript. Choose and document actual prerender tooling during implementation. Nginx should serve real files first; avoid 200 SPA responses for invalid URLs. Canonical HTTPS/trailing-slash/redirect logic requires proxy/serving coordination. Fingerprinted assets cache immutable; HTML revalidates.

Compose has external `carubra-network`, `uteroindonesia-network`, `utero-id-network` and no published host ports. Check network existence, proxy ownership, DNS/TLS and container behavior before deployment. No backend or official search integration planned.
