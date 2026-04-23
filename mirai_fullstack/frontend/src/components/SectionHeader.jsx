export default function SectionHeader({ label, title, subtitle, center = false, forest = false }) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      {label && (
        <div className={`section-label ${forest ? 'section-label-forest' : ''} mb-4 ${center ? 'mx-auto' : ''}`}
             style={{ display: 'inline-flex' }}>
          {label}
        </div>
      )}
      <h2 className="font-display font-800 leading-tight mb-4"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: '#1C1917' }}>
        {title}
      </h2>
      {subtitle && (
        <p className={`leading-relaxed text-base ${center ? 'mx-auto' : ''}`}
           style={{ color: '#78716C', maxWidth: 560, fontFamily: 'var(--font-body)' }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
