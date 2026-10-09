import { Link } from 'react-router-dom'
import { Benefits, Cta, FAQ, Hero, Process, Services, Team } from '../components/Sections'
import { articles } from '../content/articles'

export default function HomePage() {
  return <>
    <Hero /><Process /><Benefits /><Services /><Team /><FAQ />
    <section className="section section-pale" aria-labelledby="home-news"><div className="shell">
      <div className="section-title"><span>Artikel</span><h2 id="home-news">Berita & Informasi</h2></div>
      <div className="articles-grid">{articles.slice(1, 4).map(article => <article className="article-card" key={article.slug}>
        <Link to={`/${article.slug}/`} aria-label={`Baca ${article.title}`}><img src={article.image} alt="" loading="lazy" /></Link>
        <div><time dateTime={article.date}>{article.date}</time><h3><Link to={`/${article.slug}/`}>{article.title}</Link></h3><p>{article.excerpt}</p><Link className="article-more" to={`/${article.slug}/`}>Baca selengkapnya</Link></div>
      </article>)}</div><p className="all-articles"><Link className="button" to="/berita/">Lihat semua artikel</Link></p>
    </div></section><Cta />
  </>
}
