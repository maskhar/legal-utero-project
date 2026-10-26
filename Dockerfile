FROM node:22-alpine AS build
WORKDIR /app
ARG VITE_GA4_MEASUREMENT_ID
ARG GOOGLE_SITE_VERIFICATION
ARG BING_SITE_VERIFICATION
ENV VITE_GA4_MEASUREMENT_ID=$VITE_GA4_MEASUREMENT_ID
ENV GOOGLE_SITE_VERIFICATION=$GOOGLE_SITE_VERIFICATION
ENV BING_SITE_VERIFICATION=$BING_SITE_VERIFICATION
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build && test -f dist/index.html

FROM nginxinc/nginx-unprivileged:1.27-alpine
ENV NGINX_ENVSUBST_FILTER=API_INDONESIA
COPY nginx/default.conf /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist/ /usr/share/nginx/html/
EXPOSE 8080
