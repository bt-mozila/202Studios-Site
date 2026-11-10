import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Modal from './components/Modal.jsx'
import { TermsContent, PrivacyContent } from './components/LegalContent.jsx'
import BackToTop from './components/BackToTop.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import Loader from './components/Loader.jsx'
import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx'
import Hosting from './pages/Hosting.jsx'
import PortfolioDetails from './pages/PortfolioDetails.jsx'
import { scrollToId } from './lib/utils'

function titleFor(pathname) {
  if (pathname.startsWith('/hosting-packages')) return '202Studios - Hosting Packages'
  return '202Studios'
}

export default function App() {
  const location = useLocation()
  const [legal, setLegal] = useState(null) // 'terms' | 'privacy' | null

  const variant = location.pathname.startsWith('/portfolio/')
    ? 'details'
    : location.pathname === '/'
      ? 'home'
      : 'inner'

  // AOS (scroll animations) - init once
  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, mirror: false })
    }
  }, [])

  // On every route change: set the title, scroll to the #hash (with header offset) or back to the top, refresh AOS
  useEffect(() => {
    document.title = titleFor(location.pathname)
    const id = location.hash ? decodeURIComponent(location.hash.slice(1)) : null
    const timer = window.setTimeout(() => {
      if (id) {
        if (!scrollToId(id)) window.scrollTo(0, 0)
      } else {
        window.scrollTo(0, 0)
      }
      if (window.AOS) window.AOS.refreshHard()
    }, 60)
    return () => window.clearTimeout(timer)
  }, [location.pathname, location.hash])

  return (
    <>
      <CustomCursor />
      <Header variant={variant} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/hosting-packages" element={<Hosting />} />
        <Route path="/portfolio/:slug" element={<PortfolioDetails />} />
        <Route path="*" element={<Home />} />
      </Routes>

      <Footer onOpenLegal={setLegal} />

      <Loader />
      <BackToTop />

      <Modal open={legal === 'terms'} id="termsModal" title="Terms of Service" onClose={() => setLegal(null)}>
        <TermsContent />
      </Modal>
      <Modal open={legal === 'privacy'} id="privacyPolicyModal" title="Privacy Policy" onClose={() => setLegal(null)}>
        <PrivacyContent />
      </Modal>
    </>
  )
}
