import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import LanguageModal from './components/LanguageModal'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Donate from './pages/Donate'
import Contact from './pages/Contact'

function ScrollToTop() {
  const { pathname } = useLocation()
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  
  return null
}

function AppContent() {
  const { lang } = useLanguage()

  /* Update HTML lang attribute when language changes */
  useEffect(() => {
    if (lang) {
      document.documentElement.lang = lang
    }
  }, [lang])

  /* Show language modal when no language is selected */
  if (!lang) {
    return <LanguageModal />
  }

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}

export default App
