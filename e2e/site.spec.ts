import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const routes = ['/', '/profil/', '/haki/', '/penelusuran-merek/', '/pendaftaran-merek/', '/proteksi-merek/', '/brand-tracking/', '/berita/', '/kontak/']

test('kartu keuntungan memakai foto, ikon, dan poin seperti referensi', async ({ page }) => {
  await page.goto('/')
  const cards = page.locator('.benefit-card')
  await expect(cards).toHaveCount(3)
  for (const card of await cards.all()) {
    await expect(card.locator('img')).toBeVisible()
    await expect(card.locator('li')).toHaveCount(3)
    expect(await card.evaluate(element => getComputedStyle(element).backgroundImage)).toContain('benefit-bg-')
  }
  await expect(cards.first()).toHaveAttribute('href', '/lindungi-hak-eksklusif-atas-nama-dan-logo-dari-pelanggaran/')
})

test('kartu keuntungan muncul saat digulir, merespons hover, dan menghormati reduced motion', async ({ page }) => {
  await page.goto('/')
  const card = page.locator('.benefit-card').first()
  await card.scrollIntoViewIfNeeded()
  await expect(card).toHaveClass(/is-visible/)
  await expect(card).toHaveCSS('opacity', '1')
  await card.hover()
  await expect(card).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, -7)')

  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.reload()
  const reducedCard = page.locator('.benefit-card').first()
  await reducedCard.scrollIntoViewIfNeeded()
  await expect(reducedCard).toHaveCSS('opacity', '1')
  await expect(reducedCard).toHaveCSS('transform', 'none')
})

test('header tetap terlihat saat halaman digulir pada desktop dan mobile', async ({ page }) => {
  for (const viewport of [{ width: 1368, height: 752 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport)
    await page.goto('/haki/')
    const header = page.locator('.site-header')
    await expect(header).toHaveCSS('position', 'sticky')
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await expect.poll(() => header.evaluate(element => Math.round(element.getBoundingClientRect().top))).toBe(0)
    await expect(header).toBeVisible()
  }
})

test('metadata SEO, schema, sitemap, dan halaman 404 siap untuk indexing', async ({ page, request }) => {
  await page.goto('/haki/')
  await expect(page).toHaveTitle('HAKI | UTERO Legal')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://legal.iuteroindonesia.com/haki/')
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /index, follow/)
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /^https:\/\/legal\.iuteroindonesia\.com\//)
  const schema = JSON.parse(await page.locator('script[data-seo-schema]').textContent() ?? '{}')
  expect(schema['@graph'].some((item: { '@type': string }) => item['@type'] === 'Organization')).toBeTruthy()
  expect(schema['@graph'].some((item: { '@type': string }) => item['@type'] === 'Service')).toBeTruthy()

  const sitemap = await request.get('/sitemap.xml')
  expect(sitemap.ok()).toBeTruthy()
  expect(await sitemap.text()).toContain('https://legal.iuteroindonesia.com/haki/')
  const robots = await request.get('/robots.txt')
  expect(await robots.text()).toContain('https://legal.iuteroindonesia.com/sitemap.xml')

  await page.goto('/halaman-yang-tidak-ada/')
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow')
})

for (const route of routes) test(`${route} loads without browser errors`, async ({ page }) => {
  const errors: string[] = []
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  page.on('pageerror', error => errors.push(error.message))
  const response = await page.goto(route)
  expect(response?.ok()).toBeTruthy()
  await expect(page.locator('h1').first()).toBeVisible()
  expect(errors).toEqual([])
})

test('mobile menu, FAQ, article, contact, 404, and accessibility work', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Buka menu' }).click()
  await expect(page.getByRole('link', { name: 'Profil' })).toBeVisible()
  const faq = page.getByRole('button', { name: /bagaimana cara mendaftar merek/i })
  await faq.click(); await expect(faq).toHaveAttribute('aria-expanded', 'true')
  await page.goto('/berita/'); await page.locator('.article-card h2 a').first().click(); await expect(page.locator('.article-body')).toBeVisible()
  await page.goto('/kontak/'); await expect(page.getByRole('link', { name: 'legal@uteroindonesia.com', exact: true })).toBeVisible()
  await expect(page.getByTitle('Peta lokasi UTERO Legal di Malang')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Buka petunjuk arah' })).toHaveAttribute('href', /google\.com\/maps/)
  await page.goto('/tidak-ada/'); await expect(page.getByText('404')).toBeVisible()
  await page.goto('/'); expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBeTruthy()
})
