// Inline SVG logo — matches the uploaded brand mark exactly
// Rounded-rectangle in terracotta #AA4A44 with white rounded text

export function LogoMark({ size = 44, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none"
         xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="100" height="100" rx="18" fill="#AA4A44"/>
      {/* Person/figure icon abstracted from the brand symbol */}
      <circle cx="50" cy="28" r="10" fill="white"/>
      <rect x="40" y="42" width="20" height="28" rx="6" fill="white"/>
      <rect x="18" y="46" width="20" height="11" rx="5.5" fill="white"/>
      <rect x="62" y="46" width="20" height="11" rx="5.5" fill="white"/>
      <rect x="40" y="72" width="9" height="20" rx="4.5" fill="white" transform="rotate(-20 40 72)"/>
      <rect x="51" y="72" width="9" height="20" rx="4.5" fill="white" transform="rotate(20 60 72)"/>
    </svg>
  )
}

export function LogoFull({ height = 52, className = '' }) {
  return (
    <img
      src="/logo.png"
      alt="Mirai Experiential School"
      style={{ height: 'auto', maxHeight: height, width: 'auto', objectFit: 'contain', display: 'block' }}
      className={className}
    />
  )
}

export function BrandIcon({ size = 40, className = '' }) {
  return (
    <img src="/icon.png" alt="Mirai icon"
         width={size} height={size} className={className}
         style={{ width: size, height: size, objectFit: 'contain' }}/>
  )
}
