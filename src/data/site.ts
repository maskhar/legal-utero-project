export const origin = 'https://legal.iuteroindonesia.com'
export const whatsappUrl = 'https://wa.me/62817388616?text=Hi%2C%20saya%20ingin%20melakukan%20pendaftaran%20merek%20saya.%20Apa%20yang%20harus%20saya%20lakukan%3F'
export type NavItem = { label: string; href: string; children?: NavItem[] }
export const navItems: NavItem[] = [
  { label: 'Beranda', href: '/' }, { label: 'Profil', href: '/profil/' }, { label: 'HAKI', href: '/haki/' },
  { label: 'Merek', href: '/pendaftaran-merek/', children: [
    { label: 'Penelusuran Merek', href: '/penelusuran-merek/' }, { label: 'Pendaftaran Merek', href: '/pendaftaran-merek/' },
    { label: 'Proteksi Merek', href: '/proteksi-merek/' }, { label: 'Brand Tracking', href: '/brand-tracking/' },
  ] },
  { label: 'Berita', href: '/berita/' }, { label: 'Kontak', href: '/kontak/' },
]
export const brandLinks = [
  { label: 'UTERO Indonesia', href: 'https://uteroindonesia.com/' }, { label: 'UTERO Group', href: 'https://uterogroup.com/' },
  { label: 'Dadik Wahyu Chang, S.H., M.H.', href: 'https://dadikwahyuchang.id/' },
]
export const benefits = [
  { title: 'Perlindungan Hukum yang Kuat', description: 'Lindungi hak eksklusif atas penggunaan nama dan logo dari pelanggaran.', image: '/assets/benefit-1.jpg', background: '/assets/benefit-bg-1.jpg', points: ['Pengajuan Pendaftaran Merek', 'Verifikasi Hak Merek', 'Pemantauan Pendaftaran'], href: '/lindungi-hak-eksklusif-atas-nama-dan-logo-dari-pelanggaran/' },
  { title: 'Meningkatkan Nilai Bisnis', description: 'Merek terdaftar menambah kredibilitas dan daya saing bisnis Anda.', image: '/assets/benefit-2.jpg', background: '/assets/benefit-bg-2.jpg', points: ['Penilaian Merek', 'Strategi Branding', 'Konsultasi Pemasaran'], href: '/mengoptimalkan-nilai-bisnis-melalui-perlindungan-merek-terdaftar/' },
  { title: 'Hak Eksklusif atas Penggunaan Merek', description: 'Dapatkan hak eksklusif atas penggunaan nama dan logo bisnis Anda.', image: '/assets/benefit-3.jpg', background: '/assets/benefit-bg-3.jpg', points: ['Penetapan Kategori', 'Pencegahan Pelanggaran', 'Pengelolaan Hak'], href: '/dapatkan-hak-eksklusif-untuk-nama-dan-logo-bisnis-anda/' },
]
export const services = [
  { number: '01', title: 'Pendaftaran Merek', description: 'Dukungan proses pendaftaran merek untuk membantu melindungi identitas bisnis Anda.', href: '/pendaftaran-merek/' },
  { number: '02', title: 'Perpanjangan Merek', description: 'Pendampingan administrasi perpanjangan masa perlindungan merek terdaftar.', href: '/kontak/' },
  { number: '03', title: 'Pengalihan Merek', description: 'Konsultasi dan pendampingan pengalihan hak atas merek kepada pihak lain.', href: '/kontak/' },
  { number: '04', title: 'Perubahan Merek', description: 'Pendampingan perubahan data pada merek sesuai kebutuhan dan ketentuan yang berlaku.', href: '/kontak/' },
]
export const team = [
  { name: 'Dadik Wahyu Chang, S.H., M.H.', role: 'Konsultan Brand', image: '/assets/team-1.jpg' },
  { name: 'Siti Sadrianti, S.Sos.', role: 'Administrator Hak Merek', image: '/assets/team-2.jpg' },
  { name: 'Alvi Sayrina, S.Ikom.', role: 'Administrator Hak Cipta', image: '/assets/team-3.jpg' },
  { name: 'Wijayanti Lestari, S.M.', role: 'Staf Administrasi', image: '/assets/team-4.jpg' },
]
export const faqs = [
  { question: 'Apa itu pendaftaran merek dan mengapa penting?', answer: 'Pendaftaran merek adalah proses permohonan perlindungan hukum atas tanda yang membedakan barang atau jasa. Pendaftaran membantu pemilik memperoleh hak eksklusif sesuai peraturan yang berlaku.' },
  { question: 'Bagaimana cara mendaftar merek?', answer: 'Proses dimulai dengan menyiapkan nama atau logo merek, identitas pemohon, daftar barang atau jasa, lalu melakukan penelusuran dan pengajuan permohonan.' },
  { question: 'Berapa lama proses pendaftaran merek?', answer: 'Durasi bergantung pada tahapan pemeriksaan dan kondisi setiap permohonan. Tim UTERO Legal dapat membantu menjelaskan tahapan yang relevan untuk permohonan Anda.' },
  { question: 'Apa yang harus dilakukan jika masa berlaku merek hampir berakhir?', answer: 'Hubungi tim UTERO Legal untuk meninjau status dan persyaratan perpanjangan sebelum masa perlindungan berakhir.' },
  { question: 'Apa yang terjadi jika merek saya dilanggar oleh pihak lain?', answer: 'Setiap perkara memerlukan penelaahan fakta dan dokumen. Konsultasikan situasi Anda untuk menentukan langkah yang sesuai tanpa menjanjikan hasil hukum tertentu.' },
]
type SeoRecord = { title: string; description: string }
export const seoByPath: Record<string, SeoRecord> = {
  '/': { title: 'UTERO Legal | Konsultasi dan Pendaftaran Merek', description: 'Informasi dan pendampingan penelusuran, pendaftaran, proteksi, dan pengelolaan merek bersama UTERO Legal.' },
  '/profil/': { title: 'Profil | UTERO Legal', description: 'Kenali UTERO Legal dan layanan pendampingan hukum merek untuk kebutuhan bisnis Anda.' },
  '/haki/': { title: 'HAKI | UTERO Legal', description: 'Informasi dasar hak kekayaan intelektual dan perlindungan merek untuk pelaku usaha.' },
  '/penelusuran-merek/': { title: 'Penelusuran Merek | UTERO Legal', description: 'Konsultasi penelusuran merek sebagai langkah awal sebelum pengajuan pendaftaran.' },
  '/pendaftaran-merek/': { title: 'Pendaftaran Merek | UTERO Legal', description: 'Pendampingan proses pendaftaran merek untuk nama dan logo bisnis Anda.' },
  '/proteksi-merek/': { title: 'Proteksi Merek | UTERO Legal', description: 'Konsultasi perlindungan merek dan penanganan kebutuhan hukum terkait merek.' },
  '/brand-tracking/': { title: 'Brand Tracking | UTERO Legal', description: 'Informasi layanan pemantauan merek dan konsultasi ruang lingkup yang sesuai.' },
  '/berita/': { title: 'Berita dan Informasi | UTERO Legal', description: 'Artikel pilihan mengenai merek, legalitas, dan hak kekayaan intelektual.' },
  '/kontak/': { title: 'Kontak | UTERO Legal', description: 'Hubungi UTERO Legal melalui WhatsApp, telepon, atau email untuk konsultasi awal.' },
}
