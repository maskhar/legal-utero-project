import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { ArrowRight, Check, ChevronLeft, ChevronRight, FileCheck2, Search, ShieldCheck, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { benefits, faqs, services, team, whatsappUrl } from '../data/site'
export function SectionTitle({ eyebrow, title, description, align = 'center' }: { eyebrow?: string; title: string; description?: string; align?: 'left' | 'center' }) { return <div className={`section-title section-title-${align}`}>{eyebrow && <span>{eyebrow}</span>}<h2>{title}</h2>{description && <p>{description}</p>}</div> }
export function Checks({ items }: { items: string[] }) { return <ul className="checks">{items.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul> }
export function SimpleHero({ eyebrow, title, description, children }: { eyebrow?: string; title: string; description?: string; children?: ReactNode }) { return <section className="simple-hero"><div className="shell"><div className="simple-hero-copy">{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h1>{title}</h1>{description && <p>{description}</p>}{children}</div></div></section> }
const slides = [
  { title: 'Daftarkan Merek Anda dengan Mudah', text: 'Perlindungan hak merek yang cepat dan mudah dimulai dari persiapan yang tepat.', image: '/assets/hero-register.jpg' },
  { title: 'Jaga Hak Merek Anda Tanpa Khawatir', text: 'Konsultasikan kebutuhan perlindungan merek bisnis Anda bersama tim UTERO Legal.', image: '/assets/hero-protect.jpg' },
  { title: 'Alihkan Hak Merek dengan Lancar', text: 'Dapatkan informasi tentang dokumen dan proses pengalihan hak merek.', image: '/assets/hero-transfer.jpg' },
]
export function Hero() {
  const [active, setActive] = useState(0); const [paused, setPaused] = useState(false)
  useEffect(() => { if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; const timer = window.setInterval(() => setActive((value) => (value + 1) % slides.length), 7000); return () => window.clearInterval(timer) }, [paused])
  const select = (index: number) => setActive((index + slides.length) % slides.length)
  return <section className="hero" aria-roledescription="carousel" aria-label="Layanan UTERO Legal" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>{slides.map((slide, index) => <article className={`hero-slide ${index === active ? 'is-active' : ''}`} key={slide.title} aria-hidden={index !== active} style={{ backgroundImage: `linear-gradient(90deg, rgba(20,22,27,.88), rgba(50,10,13,.56) 52%, rgba(20,22,27,.12)), url(${slide.image})` }}><div className="shell hero-inner"><div className="hero-copy"><span className="eyebrow">UTERO Legal</span><h1>{slide.title}</h1><p>{slide.text}</p><a className="button" href={whatsappUrl} target="_blank" rel="noreferrer">Konsultasi Merek <ArrowRight size={18} aria-hidden="true" /></a></div></div></article>)}<div className="hero-controls shell"><button type="button" onClick={() => select(active - 1)} aria-label="Slide sebelumnya"><ChevronLeft /></button><div className="hero-dots">{slides.map((slide, index) => <button type="button" key={slide.title} className={index === active ? 'is-active' : ''} onClick={() => select(index)} aria-label={`Tampilkan slide ${index + 1}`} aria-current={index === active ? 'true' : undefined} />)}</div><button type="button" onClick={() => select(active + 1)} aria-label="Slide berikutnya"><ChevronRight /></button></div></section>
}
export function Process() { return <section className="section process"><div className="shell process-grid"><div><SectionTitle align="left" eyebrow="Proses" title="2 Langkah Mudah untuk Memulai Pendaftaran Merek Anda" description="Siapkan informasi awal berikut, lalu konsultasikan kebutuhan pendaftaran merek Anda." /><div className="process-steps"><div><span><Search /></span><div><h3>Isi Nama Merek</h3><p>Masukkan nama merek yang ingin ditelusuri.</p></div></div><div><span><UserRound /></span><div><h3>Isi Identitas</h3><p>Siapkan identitas dan dokumen dasar pemohon.</p></div></div></div><a className="button button-outline" href={whatsappUrl} target="_blank" rel="noreferrer">Daftar Merek</a></div><div className="process-visual"><img src="/assets/process.jpg" width="720" height="720" alt="Proses penelusuran dan pendaftaran merek" /></div></div></section> }
function BenefitCard({ item, index }: { item: (typeof benefits)[number]; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const card = cardRef.current
    if (!card || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setVisible(true); return }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
    }, { threshold: .18 })
    observer.observe(card)
    return () => observer.disconnect()
  }, [])

  const style = { '--benefit-background': `url(${item.background})`, '--benefit-delay': `${index * 110}ms` } as CSSProperties
  return <Link ref={cardRef} className={`benefit-card ${visible ? 'is-visible' : ''}`} to={item.href} style={style}>
    <div className="benefit-card-content"><img src={item.image} width="90" height="90" alt="" loading="lazy" /><h3>{item.title}</h3><p>{item.description}</p>
      <ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul>
    </div>
  </Link>
}
export function Benefits() {
  const sectionRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const section = sectionRef.current
    if (!section || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    section.classList.add('has-motion')
    return () => section.classList.remove('has-motion')
  }, [])

  return <section ref={sectionRef} className="section section-pale benefits"><div className="shell">
    <SectionTitle eyebrow="Keuntungan" title="Mengapa Pendaftaran Merek Itu Penting?" description={'Proses pendaftaran merek mengadopsi prinsip "First To File", yang berarti pihak pertama yang mendaftarkan merek berhak atas hak kepemilikan merek tersebut. Dengan kata lain, pendaftaran merek adalah langkah penting untuk memastikan hak eksklusif dan perlindungan hukum atas identitas bisnis Anda.'} />
    <div className="card-grid benefit-grid">{benefits.map((item, index) => <BenefitCard item={item} index={index} key={item.title} />)}</div>
  </div></section>
}
export function Services() { const icons = [FileCheck2, ShieldCheck, ArrowRight, Search]; return <section className="section"><div className="shell"><SectionTitle eyebrow="Layanan" title="Kelola Merek Anda dengan Layanan Kami" /><div className="service-grid">{services.map((service, index) => { const Icon = icons[index]; return <Link className="service-card" to={service.href} key={service.number}><div className="service-top"><span className="service-icon"><Icon /></span><strong>{service.number}</strong></div><h3>{service.title}</h3><p>{service.description}</p><span className="service-link">Lihat layanan <ArrowRight size={15} /></span></Link> })}</div></div></section> }
export function Team() { return <section className="section section-pale"><div className="shell"><div className="team-heading"><SectionTitle align="left" eyebrow="Tim Paramerah" title="Tim Ahli Kami" /><p>Tim bekerja dengan penuh perhatian dan dedikasi untuk membantu kebutuhan merek Anda.</p></div><div className="team-grid">{team.map((member) => <article className="team-card" key={member.name}><img src={member.image} width="560" height="720" alt={member.name} loading="lazy" /><div><span>{member.role}</span><h3>{member.name}</h3></div></article>)}</div></div></section> }
function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) { const [open, setOpen] = useState(index === 0); const id = useId(); return <div className={`faq-item ${open ? 'is-open' : ''}`}><h3><button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((value) => !value)}><span>{question}</span><span aria-hidden="true">+</span></button></h3><div id={id} className="faq-panel" hidden={!open}><p>{answer}</p></div></div> }
export function FAQ() { return <section className="section"><div className="shell faq-shell"><SectionTitle eyebrow="FAQ" title="Pertanyaan & Jawaban" description="Jawaban umum tentang pendaftaran dan pengelolaan merek." /><div className="faq-list">{faqs.map((faq, index) => <FaqItem key={faq.question} {...faq} index={index} />)}</div></div></section> }
export function Cta() { return <section className="section cta"><div className="shell cta-inner"><div><span className="eyebrow">Konsultasi Awal</span><h2>Dapatkan Hak Eksklusif untuk Nama dan Logo Bisnis Anda</h2><p>Diskusikan kebutuhan penelusuran, pendaftaran, atau pengelolaan merek Anda bersama UTERO Legal.</p></div><a className="button button-light" href={whatsappUrl} target="_blank" rel="noreferrer">Hubungi via WhatsApp <ArrowRight size={18} /></a></div></section> }
