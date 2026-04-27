import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import WhatsAppButton from './components/layout/WhatsAppButton'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import HomePage from './pages/HomePage'
import TreatmentsPage from './pages/TreatmentsPage'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [language, setLanguage] = useState('de')
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="bg-white text-[#4A3F35]">
      <Header
        scrolled={scrolled}
        menuOpen={menuOpen}
        language={language}
        onLanguageChange={setLanguage}
        onMenuToggle={() => setMenuOpen((prev) => !prev)}
        onMenuClose={() => setMenuOpen(false)}
      />
      <Routes>
        <Route path="/" element={<HomePage language={language} />} />
        <Route path="/behandlungen" element={<TreatmentsPage language={language} />} />
        <Route path="/uber-mera" element={<AboutPage language={language} />} />
        <Route path="/kontakt" element={<ContactPage language={language} />} />
      </Routes>
      <Footer language={language} />
      <WhatsAppButton />
    </div>
  )
}

export default App
