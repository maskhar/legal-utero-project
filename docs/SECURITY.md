# Security

The default deployment publishes no host ports. Nginx runs unprivileged on port 8080, with a read-only root filesystem, temporary `/tmp`, dropped Linux capabilities, and `no-new-privileges`. The reverse proxy should enforce TLS and any required access policy. Membership in the three external networks is not isolation: any container on those networks may connect to this service.

Treat all `VITE_*` build variables as public. Never put tokens, private keys, or credentials in frontend assets or build arguments. Serve sensitive APIs from a separate authenticated backend. Review generated `dist` before release, keep image dependencies updated, and scan the built image in the deployment pipeline.

Trademark search uses a same-origin Nginx proxy. `API_INDONESIA` is injected at container startup, not at build time; `.env` is excluded from Docker context and Git. The public search endpoint is restricted to GET requests with bounded query parameters and rate-limited per source IP. As this is a public endpoint, monitor provider credits and add stronger upstream quotas if traffic warrants it. The generated Nginx config containing the key lives on a private container tmpfs; do not expose it through file serving or logs.

Nginx sets browser headers and a Content Security Policy. Contact page embeds Google Maps (`www.google.com`/`maps.google.com`); visiting it sends the visitor's IP and browser data to Google. The development domain uses Cloudflare, whose injected analytics script is allowed only from `static.cloudflareinsights.com`, with analytics connections to `cloudflareinsights.com`. Review both third-party integrations against privacy requirements. Configure HSTS at the TLS-terminating proxy. Unknown paths serve the prerendered 404 response rather than the homepage.
