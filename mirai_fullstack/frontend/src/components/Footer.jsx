import { Link } from '@inertiajs/react'

const B = '#AA4A44'

const cols = {
  Academics: [
    { label: 'IB Programmes',         href: '/programmes' },
    { label: 'Experiential Learning',  href: '/experiential-learning' },
    { label: 'Global Exposure',        href: '/global-exposure' },
    { label: 'Student Life',           href: '/student-life' },
  ],
  Campus: [
    { label: 'Facilities',         href: '/campus' },
    { label: 'Sports & Athletics', href: '/sports' },
    { label: 'Boarding',           href: '/residential' },
    { label: 'About Us',           href: '/about' },
  ],
  Admissions: [
    { label: 'How to Apply',  href: '/admissions' },
    { label: 'Fee Structure', href: '/admissions' },
    { label: 'Book a Visit',  href: '/contact' },
    { label: 'School Blog',   href: '/blog' },
  ],
}

export default function Footer() {
  return (
    <footer style={{ background: '#1C1917', color: 'rgba(255,255,255,0.75)' }}>
      {/* Top wave divider */}
      <div style={{ background: '#F7F5F2', lineHeight: 0 }}>
        <svg viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg" style={{ display:'block' }}>
          <path d="M0,40 C360,0 1080,0 1440,40 L1440,40 L0,40 Z" fill="#1C1917"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <img
              src="/logo.png"
              alt="Mirai Experiential School"
              style={{
                height: 'auto',
                maxHeight: 72,
                width: 'auto',
                maxWidth: 220,
                objectFit: 'contain',
                marginBottom: 16,
                display: 'block',
              }}
            />
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 280 }}>
              Nurturing curious minds and compassionate hearts through IB education, experiential learning, and a vibrant residential community.
            </p>
            <div className="space-y-2 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {[
                ['📍', 'DOO/BKL, Ansal Avantika, Ghaziabad, 201002'],
                ['📞', '+91 95999 31471'],
                ['✉️', 'admit@miraischool.in'],
              ].map(([icon, text]) => (
                <div key={text} className="flex gap-2.5 items-start">
                  <span style={{ color: B, flexShrink: 0 }}>{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
            
            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <a href="https://www.linkedin.com/company/mirai-experiential-school/posts/?feedView=all" aria-label="LinkedIn" title="LinkedIn" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-[#0A66C2] hover:text-white transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://www.instagram.com/miraiexp/?hl=en" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-[#E4405F] hover:text-white transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://wa.me/919599931471" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-[#25D366] hover:text-white transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.887.002-5.462-4.415-9.89-9.881-9.891-2.646 0-5.14 1.033-7.017 2.911s-2.906 4.372-2.907 7.019c0 2.13.594 3.738 1.587 5.394l-.993 3.634 3.73-.972zm11.332-6.524c-.313-.156-1.853-.915-2.142-1.018-.289-.105-.499-.156-.709.156-.211.314-.816 1.018-1.001 1.229-.184.21-.368.236-.681.079-.313-.156-1.32-.486-2.515-1.552-.929-.828-1.556-1.851-1.738-2.164-.184-.313-.02-.482.137-.638.141-.14.313-.368.469-.553.156-.184.209-.314.313-.526.105-.21.052-.394-.027-.553-.079-.158-.709-1.71-.971-2.339-.255-.615-.515-.532-.709-.541-.184-.009-.394-.009-.605-.009-.21 0-.552.079-.841.394s-1.104 1.079-1.104 2.632c0 1.553 1.131 3.053 1.288 3.264.158.21 2.227 3.4 5.393 4.766.753.325 1.341.519 1.801.665.757.241 1.446.207 1.99.126.607-.09 1.853-.758 2.116-1.494.263-.737.263-1.368.184-1.494-.078-.127-.289-.21-.602-.366z"/></svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(cols).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-sm font-bold mb-4 uppercase tracking-widest"
                  style={{ color: B, fontFamily: 'var(--font-display)', fontSize: '0.68rem' }}>
                {heading}
              </h4>
              <ul className="space-y-2.5">
                {links.map(l => (
                  <li key={l.href}>
                    <Link href={l.href}
                      className="text-sm transition-colors duration-150"
                      style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}
                      onMouseEnter={e => e.target.style.color = B}
                      onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Instagram Grid Section */}
        <div className="mb-16 pt-12" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div>
              <h4 className="text-sm font-bold mb-2 uppercase tracking-widest"
                  style={{ color: B, fontFamily: 'var(--font-display)', fontSize: '0.68rem' }}>
                📸 Experience Mirai Life
              </h4>
              <h3 className="text-2xl font-bold text-white font-display">Our Instagram Feed</h3>
            </div>
            <a href="https://www.instagram.com/miraiexp/?hl=en" target="_blank" rel="noopener noreferrer" 
               className="text-sm font-bold text-white hover:text-brand transition-colors flex items-center gap-2">
              Follow @miraiexp <span className="text-xl">→</span>
            </a>
          </div>
          

          <div className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h4 className="text-white font-bold mb-1">📸 See School Life | 🎓 Book a Visit Today</h4>
              <p className="text-sm text-white/50">Experience our vibrant campus first-hand.</p>
            </div>
            <div className="flex gap-4">
              <a href="tel:+919599931471" className="btn btn-outline" style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}>Call Now</a>
              <a href="https://wa.me/919599931471" className="btn btn-primary" style={{ background: B }}>WhatsApp Us</a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6"
             style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)' }}>
            © {new Date().getFullYear()} Mirai Experiential School. All rights reserved.
          </p>
          <div className="flex gap-2">
            {['IB World School', 'CBSE Affiliated', 'ISO Certified'].map(b => (
              <span key={b}
                className="text-xs px-3 py-1 rounded-full"
                style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)', fontFamily:'var(--font-display)' }}>
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
