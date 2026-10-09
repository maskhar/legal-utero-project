import { articles } from './content/articles'
import { origin, seoByPath } from './data/site'

const defaultImage = '/assets/hero-register.jpg'
const servicePaths = new Set(['/haki/', '/penelusuran-merek/', '/pendaftaran-merek/', '/proteksi-merek/', '/brand-tracking/'])
const labels: Record<string, string> = {
  '/profil/': 'Profil', '/haki/': 'HAKI', '/penelusuran-merek/': 'Penelusuran Merek',
  '/pendaftaran-merek/': 'Pendaftaran Merek', '/proteksi-merek/': 'Proteksi Merek',
  '/brand-tracking/': 'Brand Tracking', '/berita/': 'Berita', '/kontak/': 'Kontak',
}

export type SeoData = {
  title: string
  description: string
  canonical: string
  image: string
  type: 'website' | 'article'
  indexable: boolean
  publishedTime?: string
}

export function normalizePath(pathname: string) {
  if (pathname === '/') return pathname
  return pathname.endsWith('/') ? pathname : pathname + '/'
}

export function getSeoData(pathname: string): SeoData {
  const path = normalizePath(pathname)
  const article = articles.find(item => path === '/' + item.slug + '/')
  const record = seoByPath[path]
  const indexable = Boolean(record || article)
  return {
    title: article ? article.title + ' | UTERO Legal' : record?.title ?? 'Halaman Tidak Ditemukan | UTERO Legal',
    description: article?.excerpt ?? record?.description ?? 'Halaman yang Anda cari tidak tersedia.',
    canonical: new URL(indexable ? path : '/', origin).toString(),
    image: new URL(article?.image ?? defaultImage, origin).toString(),
    type: article ? 'article' : 'website',
    indexable,
    publishedTime: article?.date,
  }
}

export function getStructuredData(pathname: string, seo = getSeoData(pathname)) {
  const path = normalizePath(pathname)
  if (!seo.indexable) return []
  const article = articles.find(item => path === '/' + item.slug + '/')
  const organizationId = origin + '/#organization'
  const websiteId = origin + '/#website'
  const pageId = seo.canonical + '#webpage'
  const graph: Record<string, unknown>[] = [{
    '@type': 'Organization', '@id': organizationId, name: 'UTERO Legal', url: origin + '/',
    logo: { '@type': 'ImageObject', url: origin + '/assets/logo.png' },
    email: 'legal@uteroindonesia.com', telephone: '+62-817-388-616',
  }, {
    '@type': 'WebSite', '@id': websiteId, url: origin + '/', name: 'UTERO Legal',
    inLanguage: 'id-ID', publisher: { '@id': organizationId },
  }, {
    '@type': 'WebPage', '@id': pageId, url: seo.canonical, name: seo.title,
    description: seo.description, inLanguage: 'id-ID', isPartOf: { '@id': websiteId },
    primaryImageOfPage: { '@type': 'ImageObject', url: seo.image },
  }]

  const breadcrumbItems = [{ name: 'Beranda', url: origin + '/' }]
  if (article) breadcrumbItems.push({ name: 'Berita', url: origin + '/berita/' }, { name: article.title, url: seo.canonical })
  else if (path !== '/') breadcrumbItems.push({ name: labels[path] ?? seo.title, url: seo.canonical })
  if (breadcrumbItems.length > 1) graph.push({
    '@type': 'BreadcrumbList', itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem', position: index + 1, name: item.name, item: item.url,
    })),
  })

  if (article) graph.push({
    '@type': 'Article', headline: article.title, description: article.excerpt, image: seo.image,
    datePublished: article.date, inLanguage: 'id-ID',
    mainEntityOfPage: { '@id': pageId }, publisher: { '@id': organizationId },
  })
  else if (servicePaths.has(path)) graph.push({
    '@type': 'Service', name: labels[path], description: seo.description, url: seo.canonical,
    provider: { '@id': organizationId }, areaServed: { '@type': 'Country', name: 'Indonesia' },
  })

  return graph
}
