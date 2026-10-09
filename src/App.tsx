import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import HomePage from './pages/HomePage'
import { ArticlePage, BrandTrackingPage, ContactPage, HakiPage, NewsPage, NotFoundPage, ProfilePage, ProtectionPage, RegistrationPage, SearchPage } from './pages/Pages'

export default function App() {
  return <Layout><Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/profil/" element={<ProfilePage />} />
    <Route path="/haki/" element={<HakiPage />} />
    <Route path="/penelusuran-merek/" element={<SearchPage />} />
    <Route path="/pendaftaran-merek/" element={<RegistrationPage />} />
    <Route path="/proteksi-merek/" element={<ProtectionPage />} />
    <Route path="/brand-tracking/" element={<BrandTrackingPage />} />
    <Route path="/berita/" element={<NewsPage />} />
    <Route path="/kontak/" element={<ContactPage />} />
    <Route path="/:slug/" element={<ArticlePage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes></Layout>
}
