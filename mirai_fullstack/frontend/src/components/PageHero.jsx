import { Link } from 'react-router-dom'

const B = '#AA4A44'

export default function PageHero({ title, subtitle, breadcrumb = [] }) {
  return (
    <section
      className="relative overflow-hidden pt-40 pb-20 text-center"
      style={{
        background: 'linear-gradient(145deg, #2D1210 0%, #7A2E2A 45%, #AA4A44 100%)',
      }}
    >
      {/* ADDED IMAGE: Real campus aerial as hero background */}
      <img
        src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1400&q=60"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-luminosity"
      decoding="async" />
      {/* Subtle dot-grid texture */}
      <div className="absolute inset-0 opacity-10"
           style={{
             backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
             backgroundSize: '32px 32px',
           }}/>
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24"
           style={{ background: 'linear-gradient(to bottom, transparent, rgba(170,74,68,0.3))' }}/>

      <div className="relative max-w-3xl mx-auto px-6">
        {breadcrumb.length > 0 && (
          <div className="flex items-center justify-center gap-2 mb-5 text-xs"
               style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}>
            <Link to="/" className="transition-colors hover:text-white">Home</Link>
            {breadcrumb.map((b, i) => (
              <span key={i} className="flex items-center gap-2">
                <span style={{ color: 'rgba(255,255,255,0.3)' }}>›</span>
                {i === breadcrumb.length - 1 ? (
                  <span style={{ color: 'rgba(255,255,255,0.85)' }}>{b.label}</span>
                ) : (
                  <Link to={b.to} className="transition-colors hover:text-white">{b.label}</Link>
                )}
              </span>
            ))}
          </div>
        )}
        <h1 className="font-display text-4xl md:text-5xl font-800 text-white mb-4 leading-tight"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)', maxWidth: 560, margin: '0 auto' }}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
