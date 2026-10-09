# Deployment

This image builds the React/Vite site with `npm ci` and `npm run build`, then serves `dist` using unprivileged Nginx on container port 8080. The application must provide `package.json`, `package-lock.json`, and a `build` script that produces `dist/index.html` and any required prerendered route HTML. The current `build` script runs TypeScript and Vite only; it does not prerender routes. Add prerendering to that script before deploying if route-specific static HTML is required. The container does not prerender at request time.

Prerequisites: Docker with Compose and existing external Docker networks `carubra-network`, `uteroindonesia-network`, and `utero-id-network`. Check with `docker network ls`. Create missing networks only if authorized by the infrastructure owner; Compose does not create external networks.

From the project root, run `docker compose build` followed by `docker compose up -d`. No host ports are published. Attach a trusted reverse proxy to one of the external networks and forward HTTP to `legal-utero:8080` (or the Compose service's network alias). Configure TLS and public routing at that proxy. Use `docker compose ps` and `docker compose logs legal-utero` to inspect status. Rebuild and redeploy after source or build-time variable changes.

Do not publish container port 8080 unless a separate, reviewed exposure plan requires it. The three shared networks allow other members of those networks to reach the service.
