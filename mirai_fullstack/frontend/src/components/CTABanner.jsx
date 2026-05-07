import { Link } from '@inertiajs/react'

export default function CTABanner({
  label       = 'Admissions 2026–27 Open',
  title       = 'Give Your Child the Mirai Advantage',
  subtitle    = 'Applications are now open for the 2026–27 academic year. Seats are limited across all year groups.',
  primaryText = 'Enroll Now',
  primaryTo   = '/student-inquiry#academic-session-header',
  secondaryText = 'Book Free Demo Class',
  secondaryTo   = '/contact',
}) {
  return (
    <section className="relative overflow-hidden py-24 text-center"
      style={{ background: 'linear-gradient(145deg, #2D1210 0%, #7A2E2A 50%, #AA4A44 100%)' }}>
      {/* ADDED IMAGE: Subtle campus background behind CTA */}
      <img
        src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=50"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-luminosity"
      decoding="async" />
      {/* Dot texture */}
      <div className="absolute inset-0 opacity-10"
           style={{
             backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
             backgroundSize: '28px 28px',
           }}/>
      {/* Brand icon watermark */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-5 hidden lg:block">
        <img src="/icon.png" alt="" style={{ height:280, width:'auto', filter:'brightness(10)' }} decoding="async" />
      </div>
      <div className="relative max-w-2xl mx-auto px-6">
        <div className="section-label mx-auto mb-4" style={{ display:'inline-flex', background:'rgba(255,255,255,0.15)', color:'white', borderColor:'transparent' }}>
          {label}
        </div>
        <h2 className="font-display font-800 text-white mb-4"
            style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'clamp(1.8rem,3.5vw,2.6rem)' }}>
          {title}
        </h2>
        <p className="text-base mb-10 leading-relaxed" style={{ color:'rgba(255,255,255,0.72)' }}>
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={primaryTo} className="btn btn-lg"
                style={{ background:'white', color:'#AA4A44', fontFamily:'var(--font-display)' }}>
            {primaryText}
          </Link>
          <Link href={secondaryTo} className="btn btn-ghost-white btn-lg">
            {secondaryText}
          </Link>
        </div>
      </div>
    </section>
  )
}
