import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import AnchorLink from './AnchorLink.jsx'
import { asset } from '../lib/utils'

const HOME_LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'aboutUs', label: 'About Us' },
  { id: 'services', label: 'Services' },
  { id: 'portfolio', label: 'Portfolio' },
]

/**
 * variant:
 *  - 'home'    : one-page nav with scroll-spy (as on the original index.html)
 *  - 'inner'   : top bar + full nav (shop, hosting packages)
 *  - 'details' : top bar + logo only (portfolio details)
 */
export default function Header({ variant }) {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeId, setActiveId] = useState('hero')

  // close the mobile menu whenever the route changes
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname, location.hash])

  // header "scrolled" state + scroll-spy for the home page
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100)

      if (variant === 'home') {
        const position = window.scrollY + 200
        let current = null
        HOME_LINKS.forEach(({ id }) => {
          const section = document.getElementById(id)
          if (!section) return
          const top = section.getBoundingClientRect().top + window.scrollY
          if (position >= top && position <= top + section.offsetHeight) current = id
        })
        setActiveId(current)
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('load', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('load', onScroll)
    }
  }, [variant, location.pathname])

  const closeMobile = () => setMobileOpen(false)
  const path = location.pathname

  return (
    <>
      {variant !== 'home' && (
        <div
          id="topbar"
          className={`fixed-top d-flex align-items-center ${scrolled ? 'topbar-scrolled' : ''} ${variant === 'details' ? 'topbar-inner-pages' : ''}`}
        >
          <div className="container d-flex align-items-center justify-content-center justify-content-md-between">
            <div className="contact-info d-flex align-items-center">
              <i className="bi bi-envelope-fill"></i>
              <a href="mailto:info@202studios.co.bw">info@202studios.co.bw</a>
              <i className="bi bi-phone-fill phone-icon"></i>
              <a href="tel:+26773660486">+267 73 660 486</a>
            </div>
          </div>
        </div>
      )}

      <header
        id="header"
        className={`fixed-top d-flex align-items-center ${scrolled ? 'header-scrolled' : ''} ${variant === 'details' ? 'header-inner-pages' : ''}`}
      >
        <div className="container d-flex align-items-center justify-content-between">
          <h1 className="logo">
            <Link to="/">
              <img src={asset('assets/img/Branding/202Studios-logo-white.png')} alt="202Studios Logo" className="logo-img" />
            </Link>
          </h1>

          {variant !== 'details' && (
            <nav id="navbar" className={`navbar ${mobileOpen ? 'navbar-mobile' : ''}`}>
              <ul>
                {variant === 'home' ? (
                  HOME_LINKS.map(({ id, label }) => (
                    <li key={id}>
                      <AnchorLink
                        id={id}
                        className={`nav-link scrollto ${activeId === id ? 'active' : ''}`}
                        onNavigate={closeMobile}
                      >
                        {label}
                      </AnchorLink>
                    </li>
                  ))
                ) : (
                  <>
                    <li><Link className="nav-link" to="/">Home</Link></li>
                    <li><AnchorLink id="aboutUs" className="nav-link" onNavigate={closeMobile}>About Us</AnchorLink></li>
                    <li><AnchorLink id="services" className="nav-link" onNavigate={closeMobile}>Services</AnchorLink></li>
                    <li><AnchorLink id="portfolio" className="nav-link" onNavigate={closeMobile}>Portfolio</AnchorLink></li>
                    <li><Link className={`nav-link ${path === '/shop' ? 'active' : ''}`} to="/shop">Store</Link></li>
                    <li><Link className={`nav-link ${path === '/hosting-packages' ? 'active' : ''}`} to="/hosting-packages">Hosting</Link></li>
                  </>
                )}
              </ul>
              <i
                className={`bi ${mobileOpen ? 'bi-x' : 'bi-list'} mobile-nav-toggle`}
                onClick={() => setMobileOpen((o) => !o)}
                role="button"
                aria-label="Toggle navigation"
              ></i>
            </nav>
          )}
        </div>
      </header>
    </>
  )
}
