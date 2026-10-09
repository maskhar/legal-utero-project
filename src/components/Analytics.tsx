import { useEffect, useSyncExternalStore } from 'react'
import { useLocation } from 'react-router-dom'

type Consent = 'accepted' | 'declined' | null
type Gtag = (...args: unknown[]) => void

declare global {
  interface Window {
    dataLayer?: unknown[][]
    gtag?: Gtag
    uteroGa4Loaded?: string
    uteroGa4Path?: string
  }
}

const consentKey = 'utero-analytics-consent'
const consentEvent = 'utero-analytics-consent-change'
const measurementId = ((import.meta as ImportMeta & { env?: Record<string, string> }).env?.VITE_GA4_MEASUREMENT_ID ?? '').trim()
const validMeasurementId = /^G-[A-Z0-9]+$/.test(measurementId) ? measurementId : ''

function readConsent(): Consent {
  const stored = window.localStorage.getItem(consentKey)
  return stored === 'accepted' || stored === 'declined' ? stored : null
}

function subscribeConsent(callback: () => void) {
  window.addEventListener('storage', callback)
  window.addEventListener(consentEvent, callback)
  return () => { window.removeEventListener('storage', callback); window.removeEventListener(consentEvent, callback) }
}

function loadGa4(id: string) {
  window.dataLayer ??= []
  window.gtag ??= (...args: unknown[]) => { window.dataLayer?.push(args) }
  if (window.uteroGa4Loaded === id) return
  window.uteroGa4Loaded = id
  window.gtag('js', new Date())
  window.gtag('config', id, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false })
  const script = document.createElement('script')
  script.async = true
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id)
  document.head.appendChild(script)
}

export function Analytics() {
  const { pathname, search } = useLocation()
  const consent = useSyncExternalStore(subscribeConsent, readConsent, () => null)

  useEffect(() => {
    if (!validMeasurementId || consent !== 'accepted') return
    loadGa4(validMeasurementId)
    const pagePath = pathname + search
    if (window.uteroGa4Path === pagePath) return
    window.uteroGa4Path = pagePath
    window.gtag?.('event', 'page_view', { page_title: document.title, page_location: window.location.href, page_path: pagePath })
  }, [consent, pathname, search])

  useEffect(() => {
    if (!validMeasurementId || consent !== 'accepted') return
    const trackContact = (event: MouseEvent) => {
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href]')
      if (!link) return
      const href = link.href
      if (href.startsWith('https://wa.me/')) window.gtag?.('event', 'generate_lead', { method: 'whatsapp', page_path: pathname })
      else if (href.startsWith('tel:')) window.gtag?.('event', 'contact', { method: 'phone', page_path: pathname })
      else if (href.startsWith('mailto:')) window.gtag?.('event', 'contact', { method: 'email', page_path: pathname })
    }
    document.addEventListener('click', trackContact)
    return () => document.removeEventListener('click', trackContact)
  }, [consent, pathname])

  if (!validMeasurementId || consent !== null) return null
  const choose = (value: Exclude<Consent, null>) => { window.localStorage.setItem(consentKey, value); window.dispatchEvent(new Event(consentEvent)) }
  return <aside className="analytics-consent" aria-label="Persetujuan analitik"><p><strong>Bantu kami meningkatkan situs.</strong> Izinkan Google Analytics mengukur penggunaan situs. Kami tidak mengaktifkannya tanpa persetujuan Anda.</p><div><button type="button" className="button button-small" onClick={() => choose('accepted')}>Izinkan</button><button type="button" className="button button-small button-outline" onClick={() => choose('declined')}>Tolak</button></div></aside>
}
