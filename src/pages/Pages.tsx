import { type FormEvent, useState } from 'react'
import { Clock, ExternalLink, LoaderCircle, Mail, MapPin, Phone, Search } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Checks, Cta, SectionTitle, SimpleHero } from '../components/Sections'
import { articles } from '../content/articles'
import { whatsappUrl } from '../data/site'

type PageInfo = { eyebrow: string; title: string; intro: string; heading: string; body: string; points: string[]; image: string }
const pages: Record<string, PageInfo> = {
  profile: { eyebrow: 'Tentang Kami', title: 'Profil UTERO Legal', intro: 'Pendampingan merek dan kekayaan intelektual yang berangkat dari pengalaman ekosistem UTERO Indonesia.', heading: 'Beroperasi di Kota Malang Sejak 1998', body: 'UTERO Legal membantu pelaku usaha memahami dan menyiapkan kebutuhan perlindungan identitas bisnis. Pendampingan dibuat komunikatif agar setiap tahap dan dokumen dapat dipahami dengan jelas.', points: ['Berpengalaman dalam ekosistem kreatif dan branding', 'Pendampingan sesuai kebutuhan dan kondisi dokumen', 'Komunikasi transparan tanpa menjanjikan hasil hukum'], image: '/assets/benefit-2.jpg' },
  haki: { eyebrow: 'Hak Kekayaan Intelektual', title: 'Lindungi Aset Kreatif dan Identitas Bisnis', intro: 'HAKI mencakup perlindungan atas merek, karya, desain, dan inovasi sesuai objek serta ketentuan yang berlaku.', heading: 'Mengapa HAKI Penting?', body: 'Perlindungan yang tepat membantu memperjelas hak, mengurangi risiko sengketa, dan menjaga nilai komersial aset tidak berwujud milik bisnis Anda.', points: ['Merek untuk pembeda barang atau jasa', 'Hak cipta untuk karya ilmu, seni, dan sastra', 'Desain industri untuk tampilan produk', 'Paten untuk invensi yang memenuhi persyaratan'], image: '/assets/benefit-1.jpg' },
  search: { eyebrow: 'Layanan Merek', title: 'Penelusuran Merek Sebelum Pengajuan', intro: 'Kenali potensi kemiripan dan hambatan lebih awal sebelum memulai proses pendaftaran.', heading: 'Keputusan Lebih Terukur Sejak Awal', body: 'Penelusuran awal bukan keputusan resmi dari DJKI, namun membantu menyusun strategi pengajuan dan memahami risiko merek yang serupa.', points: ['Pemetaan nama, bunyi, dan tampilan relevan', 'Peninjauan kelas barang atau jasa', 'Ringkasan temuan untuk konsultasi lanjutan'], image: '/assets/process.jpg' },
  registration: { eyebrow: 'Layanan Merek', title: 'Pendaftaran Merek dengan Proses yang Jelas', intro: 'Pendampingan mulai dari persiapan data hingga pemantauan status permohonan.', heading: 'Alur Pendampingan Pendaftaran', body: 'Tim membantu meninjau kebutuhan, menyiapkan dokumen, menentukan kelas, dan memantau tahapan permohonan. Keputusan tetap menjadi kewenangan instansi resmi.', points: ['Konsultasi kebutuhan dan kelas', 'Penelusuran awal merek', 'Persiapan identitas dan dokumen', 'Pengajuan dan pemantauan status'], image: '/assets/hero-register.jpg' },
  protection: { eyebrow: 'Layanan Merek', title: 'Proteksi Merek Setelah Terdaftar', intro: 'Pendaftaran adalah awal. Pemantauan membantu mengenali penggunaan yang berpotensi merugikan merek Anda.', heading: 'Kenali Risiko Penggunaan Serupa', body: 'Penggunaan nama yang sama pada kelas berbeda, plesetan, atau modifikasi kata kunci dapat memerlukan kajian. Setiap respons harus mempertimbangkan status hak dan fakta kasus.', points: ['Dokumentasi indikasi penggunaan serupa', 'Peninjauan status hak dan kelas', 'Konsultasi opsi tindak lanjut yang proporsional'], image: '/assets/hero-protect.jpg' },
  tracking: { eyebrow: 'Pemantauan Merek', title: 'Brand Tracking untuk Mendeteksi Potensi Duplikasi', intro: 'Pantau sinyal penggunaan identitas serupa agar tim Anda dapat menilai tindakan lebih dini.', heading: 'Sistem Peringatan Awal untuk Merek', body: 'Brand tracking membantu mengumpulkan indikasi relevan. Temuan tetap perlu dikaji manual berdasarkan konteks penggunaan, kelas, dan bukti yang tersedia.', points: ['Pemantauan nama dan kata kunci relevan', 'Pencatatan indikasi penggunaan serupa', 'Ringkasan risiko dan rekomendasi tindak lanjut'], image: '/assets/hero-transfer.jpg' },
}

function ServicePage({ page }: { page: PageInfo }) {
  return <><SimpleHero eyebrow={page.eyebrow} title={page.title} description={page.intro} /><section className="section"><div className="shell page-detail"><div><SectionTitle align="left" eyebrow="UTERO Legal" title={page.heading} /><p>{page.body}</p><Checks items={page.points} /><a className="button" href={whatsappUrl} target="_blank" rel="noreferrer">Konsultasi WhatsApp</a></div><img src={page.image} alt="Pendampingan UTERO Legal" /></div></section><Cta /></>
}

type Trademark = {
  app_number: string
  mark_name: string
  class: string
  owner: string
  consultant: string | null
  reg_date: string | null
}

type TrademarkResponse = {
  success: boolean
  data: Trademark[]
  pagination?: { page: number; limit: number; total: number }
}

function TrademarkSearch() {
  const [results, setResults] = useState<Trademark[]>([])
  const [total, setTotal] = useState<number | null>(null)
  const [page, setPage] = useState(1)
  const [term, setTerm] = useState('')
  const [selectedClass, setSelectedClass] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function search(query: string, niceClass: string, requestedPage: number) {
    setStatus('loading')
    setMessage('')

    const params = new URLSearchParams({ q: query, page: String(requestedPage), limit: '10' })
    if (niceClass) params.set('class', niceClass)

    try {
      const response = await fetch(`/api/merek/search?${params}`, { cache: 'no-store' })
      const payload = await response.json() as TrademarkResponse
      if (!response.ok || !payload.success || !Array.isArray(payload.data)) throw new Error('Pencarian sedang tidak tersedia. Silakan coba lagi.')
      setResults(payload.data)
      setTotal(payload.pagination?.total ?? payload.data.length)
      setPage(requestedPage)
      setStatus('success')
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Pencarian sedang tidak tersedia. Silakan coba lagi.')
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const query = String(form.get('q') ?? '').trim()
    const niceClass = String(form.get('class') ?? '').trim()

    if (query.length < 2) {
      setStatus('error')
      setMessage('Masukkan sedikitnya 2 karakter nama merek.')
      return
    }

    setResults([])
    setTotal(null)
    setTerm(query)
    setSelectedClass(niceClass)
    void search(query, niceClass, 1)
  }

  return <section className="section section-pale trademark-search" aria-labelledby="trademark-search-title">
    <div className="shell trademark-search-grid">
      <div className="trademark-search-intro">
        <span className="eyebrow">Pencarian Awal</span>
        <h2 id="trademark-search-title">Cari nama merek terdaftar</h2>
        <p>Gunakan nama merek dan kelas NICE untuk melihat data pencarian awal dari API Indonesia yang bersumber dari data DJKI.</p>
        <div className="search-disclaimer"><strong>Penting:</strong> hasil ini bukan keputusan resmi, bukan jaminan merek dapat didaftarkan, dan belum mencakup kajian kemiripan bunyi, logo, atau unsur dominan.</div>
        <a className="official-link" href="https://pdki-indonesia.dgip.go.id/" target="_blank" rel="noreferrer">Verifikasi di PDKI resmi <ExternalLink size={16} aria-hidden="true" /></a>
      </div>
      <div className="trademark-search-panel">
        <form onSubmit={handleSubmit} className="trademark-search-form">
          <label htmlFor="trademark-name">Nama merek</label>
          <input id="trademark-name" name="q" type="search" minLength={2} maxLength={80} required placeholder="Contoh: Utero" autoComplete="off" />
          <label htmlFor="trademark-class">Kelas NICE <span>(opsional)</span></label>
          <select id="trademark-class" name="class" defaultValue="">
            <option value="">Semua kelas</option>
            {Array.from({ length: 45 }, (_, index) => <option key={index + 1} value={index + 1}>Kelas {index + 1}</option>)}
          </select>
          <button className="button" type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? <LoaderCircle className="search-spinner" size={18} aria-hidden="true" /> : <Search size={18} aria-hidden="true" />}
            {status === 'loading' ? 'Mencari...' : 'Cari Merek'}
          </button>
        </form>

        <div className="trademark-results" aria-live="polite" aria-busy={status === 'loading'}>
          {status === 'error' && <p className="search-message search-error" role="alert">{message}</p>}
          {total !== null && <>
            <p className="search-message"><strong>{total.toLocaleString('id-ID')}</strong> data ditemukan. Halaman {page}.</p>
            {results.length === 0 ? <p className="search-empty">Tidak ada hasil yang cocok. Coba ejaan atau kelas lain.</p> : <ul className="trademark-result-list">
              {results.map(result => <li key={`${result.app_number}-${result.class}`}>
                <div><h3>{result.mark_name}</h3><span className="trademark-class">Kelas {result.class}</span></div>
                <dl>
                  <div><dt>Nomor permohonan</dt><dd>{result.app_number}</dd></div>
                  <div><dt>Pemilik</dt><dd>{result.owner || '-'}</dd></div>
                  {result.reg_date && <div><dt>Tanggal pendaftaran</dt><dd>{result.reg_date}</dd></div>}
                </dl>
              </li>)}
            </ul>}
            {total > 10 && <nav className="trademark-pagination" aria-label="Halaman hasil pencarian">
              <button type="button" disabled={page === 1 || status === 'loading'} onClick={() => void search(term, selectedClass, page - 1)}>Sebelumnya</button>
              <span>{page} / {Math.ceil(total / 10)}</span>
              <button type="button" disabled={page >= Math.ceil(total / 10) || status === 'loading'} onClick={() => void search(term, selectedClass, page + 1)}>Berikutnya</button>
            </nav>}
          </>}
        </div>
      </div>
    </div>
  </section>
}
export function ProfilePage() { return <ServicePage page={pages.profile} /> }
export function HakiPage() { return <ServicePage page={pages.haki} /> }
export function SearchPage() { return <><SimpleHero eyebrow={pages.search.eyebrow} title={pages.search.title} description={pages.search.intro} /><TrademarkSearch /><section className="section"><div className="shell page-detail"><div><SectionTitle align="left" eyebrow="UTERO Legal" title={pages.search.heading} /><p>{pages.search.body}</p><Checks items={pages.search.points} /><a className="button" href={whatsappUrl} target="_blank" rel="noreferrer">Konsultasi WhatsApp</a></div><img src={pages.search.image} alt="Pendampingan penelusuran merek UTERO Legal" /></div></section><Cta /></> }
export function RegistrationPage() { return <ServicePage page={pages.registration} /> }
export function ProtectionPage() { return <ServicePage page={pages.protection} /> }
export function BrandTrackingPage() { return <ServicePage page={pages.tracking} /> }

export function NewsPage() {
  return <><SimpleHero eyebrow="Wawasan" title="Berita & Informasi" description="Materi edukasi dari publikasi UTERO Legal mengenai merek, HAKI, dan legalitas bisnis." /><section className="section"><div className="shell articles-grid">{articles.map(article => <article className="article-card" key={article.slug}><Link to={`/${article.slug}/`} aria-label={`Baca ${article.title}`}><img src={article.image} alt="" loading="lazy" /></Link><div><time dateTime={article.date}>{article.date}</time><h2><Link to={`/${article.slug}/`}>{article.title}</Link></h2><p>{article.excerpt}</p><Link className="article-more" to={`/${article.slug}/`}>Baca selengkapnya</Link></div></article>)}</div></section></>
}

export function ContactPage() {
  const mapUrl = 'https://www.google.com/maps?q=Rumah+Merah+OXYZ+Jl+Bantaran+1+No+25+Malang&output=embed'
  const directionsUrl = 'https://www.google.com/maps/search/?api=1&query=Rumah+Merah+OXYZ+Jl+Bantaran+1+No+25+Malang'

  return <>
    <SimpleHero eyebrow="Kontak" title="Mari Diskusikan Kebutuhan HAKI Anda" description="Hubungi UTERO Legal melalui kanal yang aktif dan terverifikasi." />
    <section className="section"><div className="shell">
      <div className="contact-grid">
        <div className="contact-details">
          <SectionTitle align="left" eyebrow="Hubungi Kami" title="Konsultasi Langsung" />
          <a href={directionsUrl} target="_blank" rel="noreferrer"><MapPin /><span><b>Alamat</b>Rumah Merah OXYZ<br />Jl. Bantaran 1 No. 25 Malang</span></a>
          <a href="mailto:legal%40uteroindonesia.com"><Mail /><span><b>Email</b>legal{'@'}uteroindonesia.com</span></a>
          <a href="tel:+62817388616"><Phone /><span><b>Telepon</b>+62 817 388 616</span></a>
          <div className="contact-item"><Clock /><span><b>Jam Layanan</b>Senin–Minggu, 08.00–20.00 WIB</span></div>
        </div>
        <div className="contact-panel"><span className="eyebrow">Respons Lebih Cepat</span><h2>Konsultasi melalui WhatsApp</h2><p>Ceritakan kebutuhan Anda. Tim membantu menentukan layanan dan dokumen awal yang relevan.</p><a className="button" href={whatsappUrl} target="_blank" rel="noreferrer">Hubungi WhatsApp</a></div>
      </div>
      <div className="contact-location">
        <div><span className="eyebrow">Lokasi Kantor</span><h2>Temukan Kami di Malang</h2><p>Rumah Merah OXYZ, Jl. Bantaran 1 No. 25 Malang</p></div>
        <a href={directionsUrl} target="_blank" rel="noreferrer">Buka petunjuk arah</a>
        <iframe title="Peta lokasi UTERO Legal di Malang" src={mapUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      </div>
    </div></section>
  </>
}

export function ArticlePage() {
  const { slug } = useParams(); const article = articles.find(item => item.slug === slug)
  if (!article) return <NotFoundPage />
  return <article><SimpleHero eyebrow="Artikel" title={article.title} description={article.excerpt} /><div className="shell article-body"><time dateTime={article.date}>{article.date}</time><img src={article.image} alt="" />{article.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}<aside>Konten dipertahankan dari publikasi UTERO Legal. Informasi bersifat edukatif, bukan nasihat hukum untuk kasus tertentu.</aside><a className="button" href={whatsappUrl} target="_blank" rel="noreferrer">Konsultasi Kebutuhan Anda</a></div></article>
}

export function NotFoundPage() {
  return <section className="not-found"><div><span>404</span><h1>Halaman tidak ditemukan</h1><p>Alamat mungkin berubah atau halaman tidak lagi tersedia.</p><Link className="button" to="/">Kembali ke Beranda</Link></div></section>
}
