import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import TopTicker from './TopTicker'

const B = '#AA4A44'   // brand terracotta
const F = '#77966D'   // forest green

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Admissions', to: '/admissions#admission-form' },
  {
    label: 'Campus & Life', to: '#',
    children: [
      { label: 'Campus & Facilities', to: '/campus' },
      { label: 'Residential Life (Boarding)', to: '/residential' },
      { label: 'Sports & Athletics', to: '/sports' },
      { label: 'Student Life', to: '/student-life' },
    ],
  },
  {
    label: 'Academics', to: '#',
    children: [
      { label: 'Academic Programmes', to: '/programmes' },
      { label: 'Experiential Learning', to: '/experiential-learning' },
      { label: 'Global Exposure', to: '/global-exposure' },
    ],
  },
  {
    label: 'News & Media', to: '#',
    children: [
      { label: 'News & Events', to: '#', comingSoon: true },
      { label: 'Gallery', to: '/gallery' },
    ],
  },
  { label: 'Contact', to: '/contact' },
]

/**
 * 📱 Mobile Menu Component
 */
function MobileMenu({ isOpen, onSelect }) {
  return (
    <div
      className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[90vh] py-6' : 'max-h-0'}`}
      style={{ background: 'white', borderTop: isOpen ? '1px solid rgba(0,0,0,0.05)' : 'none' }}
    >
      <div className="space-y-2">
        {navLinks.map(link =>
          link.children ? (
            <div key={link.label} className="py-2">
              <div className="px-4 py-2 text-[11px] font-bold tracking-[0.2em] uppercase opacity-40 mb-1"
                   style={{ color: '#000', fontFamily: 'var(--font-display)' }}>
                {link.label}
              </div>
              <div className="space-y-1">
                {link.children.map(c => {
                  if (c.comingSoon) {
                    return (
                      <div key={c.label} className="group/cs relative flex items-center justify-between px-4 py-3 rounded-2xl text-[15px] font-semibold text-stone-400 cursor-default"
                           style={{ fontFamily: 'var(--font-display)' }}>
                        {c.label}
                        <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600/60 flex items-center gap-1.5 animate-pulse">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                          Coming Soon
                        </span>
                      </div>
                    )
                  }
                  return (
                    <NavLink key={c.to} to={c.to} onClick={onSelect}
                      className="flex items-center px-4 py-3 rounded-2xl text-[15px] font-semibold transition-all"
                      style={({ isActive }) => ({
                        fontFamily: 'var(--font-display)',
                        color: isActive ? B : '#44403C',
                        background: isActive ? '#FDF8F7' : 'transparent',
                      })}>
                      {c.label}
                    </NavLink>
                  )
                })}
              </div>
            </div>
          ) : (
            <NavLink key={link.to} to={link.to} onClick={onSelect}
              className="flex items-center px-4 py-4 rounded-2xl text-[16px] font-bold transition-all"
              style={({ isActive }) => ({
                fontFamily: 'var(--font-display)',
                color: isActive ? B : '#44403C',
                background: isActive ? '#FDF8F7' : 'transparent',
              })}>
              {link.label}
            </NavLink>
          )
        )}
        <div className="mt-8 px-4 flex flex-col gap-3">
          <Link to="/student-inquiry#academic-session-header" className="py-4 px-6 text-center text-white font-bold rounded-2xl shadow-lg"
             style={{ background: B, boxShadow: '0 10px 25px -5px rgba(170, 74, 68, 0.4)' }}>
            Enroll Now →
          </Link>
          <Link to="/contact" className="py-4 px-6 text-center font-bold rounded-2xl border border-stone-200"
             style={{ color: '#44403C' }}>
            Book a Visit
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  return (
    <>
      <TopTicker />
      <nav
        className="fixed left-0 right-0 z-50 transition-all duration-500"
        style={{ top: '45px' }}
      >
        <div 
          className={`max-w-7xl mx-auto px-6 transition-all duration-300 rounded-2xl ${
            scrolled ? 'shadow-xl shadow-stone-200/50' : ''
          }`}
          style={{
            background: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid',
            borderColor: scrolled ? 'rgba(0,0,0,0.05)' : 'transparent',
          }}
        >
          {/* Main Desktop Bar */}
          <div className={`flex items-center justify-between transition-all duration-500 ${scrolled ? 'h-20' : 'h-24'}`}>

            {/* ── Logo ── */}
            <Link to="/" className="flex items-center flex-shrink-0">
              <img 
                src="/logo.png" 
                alt="Mirai Experiential School"
                className="transition-all duration-500 hover:scale-105"
                style={{
                  height: 'auto',
                  maxHeight: scrolled ? 72 : 88,
                  width: 'auto',
                  maxWidth: 260,
                  objectFit: 'contain',
                  display: 'block',
                  filter: 'drop-shadow(0 2px 6px rgba(170,74,68,0.18))',
                }} 
              />
            </Link>

            {/* ── Desktop Nav Links ── */}
            <ul className="hidden lg:flex items-center gap-1 list-none">
              {navLinks.map(link => (
                <li key={link.label} className="relative group">
                  {link.children ? (
                    <>
                      <button
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[14px] font-semibold transition-all duration-200 group-hover:bg-stone-100/50"
                        style={{ fontFamily: 'var(--font-display)', color: '#44403C' }}
                      >
                        {link.label}
                        <svg className="w-3.5 h-3.5 opacity-60 transition-transform duration-300 group-hover:rotate-180"
                             fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/>
                        </svg>
                      </button>
                      <div
                        className="absolute top-full left-0 mt-2 w-64 rounded-2xl py-3 opacity-0 invisible -translate-y-4
                                   group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out"
                        style={{ 
                          background: 'white', 
                          boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)', 
                          border: '1px solid rgba(0,0,0,0.05)' 
                        }}
                      >
                        {link.children.map(c => {
                          if (c.comingSoon) {
                            return (
                              <div key={c.label} className="relative group/cs px-5 py-3 cursor-default flex items-center justify-between transition-all duration-200">
                                <span className="text-[14px] font-medium text-stone-400" 
                                      style={{ fontFamily: 'var(--font-body)' }}>
                                  {c.label}
                                </span>
                                <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-100 text-stone-500 border border-stone-200 opacity-0 group-hover/cs:opacity-100 transition-opacity duration-300">
                                  Coming Soon
                                </span>
                              </div>
                            )
                          }
                          return (
                            <NavLink key={c.to} to={c.to}
                              className="flex items-center gap-3 px-5 py-3 text-[14px] font-medium transition-all duration-200"
                              style={({ isActive }) => ({
                                fontFamily: 'var(--font-body)',
                                color: isActive ? B : '#44403C',
                                background: isActive ? '#FDF8F7' : 'transparent',
                              })}
                            >
                              {c.label}
                            </NavLink>
                          )
                        })}
                      </div>
                    </>
                  ) : (
                    <NavLink to={link.to}
                      className="relative block px-4 py-2 rounded-xl text-[14px] font-semibold transition-all duration-300 group"
                      style={({ isActive }) => ({
                        fontFamily: 'var(--font-display)',
                        color: isActive ? B : '#44403C',
                      })}
                    >
                      {link.label}
                      <span 
                        className={`absolute bottom-0 left-4 right-4 h-0.5 rounded-full transition-transform duration-300 scale-x-0 group-hover:scale-x-100`}
                        style={{ background: B }}
                      />
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>

            {/* ── Desktop CTAs & Socials ── */}
            <div className="hidden lg:flex items-center gap-4">
              <Link to="/contact"
                className="text-[14px] font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 border-[1.5px]"
                style={{ 
                  fontFamily: 'var(--font-display)', 
                  color: B,
                  background: 'white',
                  borderColor: B
                }}
              >
                Book a Visit
              </Link>
              <Link to="/student-inquiry#academic-session-header"
                className="btn flex items-center justify-center"
                style={{ 
                  background: B, 
                  color: 'white', 
                  padding: '12px 24px', 
                  borderRadius: '14px',
                  fontSize: '14px',
                  fontWeight: '700',
                  boxShadow: '0 8px 20px -6px rgba(170, 74, 68, 0.4)'
                }}>
                Enroll Now 
                <span>→</span>
              </Link>

              <div className="flex items-center gap-3 ml-2 border-l border-stone-200 pl-4">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-stone-600 hover:text-[#E4405F] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="https://www.linkedin.com/company/mirai-experiential-school/posts/?feedView=all" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-stone-600 hover:text-[#0A66C2] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>

            {/* ── Hamburger ── */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex flex-col justify-center gap-1.5 w-10 h-10 items-center rounded-xl transition-all hover:bg-stone-100"
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-0.5 rounded-full transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}
                    style={{ background: B }}/>
              <span className={`block w-6 h-0.5 rounded-full transition-all duration-300 ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`}
                    style={{ background: B }}/>
              <span className={`block w-6 h-0.5 rounded-full transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}
                    style={{ background: B }}/>
            </button>
          </div>

          {/* ── Mobile menu ── */}
          <MobileMenu isOpen={mobileOpen} onSelect={() => setMobileOpen(false)} />
        </div>
      </nav>
    </>
  )
}
