import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { articles } from '../src/content/articles'
import { renderPage } from '../src/entry-server'
import { origin } from '../src/data/site'
import { getSeoData, getStructuredData } from '../src/seo'

const fixedRoutes = ['/', '/profil/', '/haki/', '/penelusuran-merek/', '/pendaftaran-merek/', '/proteksi-merek/', '/brand-tracking/', '/berita/', '/kontak/']
const articleRoutes = articles.map(article => '/' + article.slug + '/')
const routes = [...fixedRoutes, ...articleRoutes]
const template = await readFile('dist/index.html', 'utf8')
const googleVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim()
const bingVerification = process.env.BING_SITE_VERIFICATION?.trim()

for (const route of routes) {
  const seo = getSeoData(route)
  const graph = getStructuredData(route, seo)
  const head = [
    '<meta name="robots" content="index, follow, max-image-preview:large" />',
    '<link rel="canonical" href="' + seo.canonical + '" />',
    '<link rel="alternate" hreflang="id-ID" href="' + seo.canonical + '" />',
    '<link rel="alternate" hreflang="x-default" href="' + seo.canonical + '" />',
    '<meta property="og:title" content="' + escapeHtml(seo.title) + '" />',
    '<meta property="og:description" content="' + escapeHtml(seo.description) + '" />',
    '<meta property="og:url" content="' + seo.canonical + '" />',
    '<meta property="og:type" content="' + seo.type + '" />',
    '<meta property="og:locale" content="id_ID" />',
    '<meta property="og:site_name" content="UTERO Legal" />',
    '<meta property="og:image" content="' + seo.image + '" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    '<meta name="twitter:title" content="' + escapeHtml(seo.title) + '" />',
    '<meta name="twitter:description" content="' + escapeHtml(seo.description) + '" />',
    '<meta name="twitter:image" content="' + seo.image + '" />',
    seo.publishedTime ? '<meta property="article:published_time" content="' + seo.publishedTime + '" />' : '',
    googleVerification ? '<meta name="google-site-verification" content="' + escapeHtml(googleVerification) + '" />' : '',
    bingVerification ? '<meta name="msvalidate.01" content="' + escapeHtml(bingVerification) + '" />' : '',
    '<script type="application/ld+json" data-seo-schema>' + safeJson({ '@context': 'https://schema.org', '@graph': graph }) + '</script>',
  ].filter(Boolean).join('')
  const html = template
    .replace('<div id="root"></div>', '<div id="root" data-prerender-path="' + route + '">' + renderPage(route) + '</div>')
    .replace(/<title>.*?<\/title>/, '<title>' + escapeHtml(seo.title) + '</title>')
    .replace(/<meta name="description" content=".*?"\s*\/>/, '<meta name="description" content="' + escapeHtml(seo.description) + '" />')
    .replace('</head>', head + '</head>')
  const output = route === '/' ? 'dist/index.html' : join('dist', route.slice(1), 'index.html')
  await mkdir(dirname(output), { recursive: true })
  await writeFile(output, html)
}

const sitemapEntries = routes.map(route => {
  const article = articles.find(item => route === '/' + item.slug + '/')
  const lastmod = article ? '<lastmod>' + article.date + '</lastmod>' : ''
  return '  <url><loc>' + origin + route + '</loc>' + lastmod + '</url>'
}).join('\n')
await writeFile('dist/sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + sitemapEntries + '\n</urlset>\n')
await writeFile('dist/robots.txt', 'User-agent: *\nAllow: /\nSitemap: ' + origin + '/sitemap.xml\n')

const notFound = template
  .replace('<div id="root"></div>', '<div id="root" data-prerender-path="/__404__/">' + renderPage('/__404__/') + '</div>')
  .replace(/<title>.*?<\/title>/, '<title>Halaman Tidak Ditemukan | UTERO Legal</title>')
  .replace('</head>', '<meta name="robots" content="noindex, nofollow" /></head>')
await writeFile('dist/404.html', notFound)
console.log('Prerendered ' + routes.length + ' routes.')

function escapeHtml(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

function safeJson(value: unknown) {
  return JSON.stringify(value).replaceAll('<', '\\u003c')
}
