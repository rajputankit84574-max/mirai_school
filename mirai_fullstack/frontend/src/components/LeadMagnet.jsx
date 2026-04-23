/**
 * LeadMagnet.jsx
 * Audit fix §4.5: "No Conversion Funnel — Add free demo class, free consultation"
 * Audit fix §4.2: CTA buttons → "Enroll Now", "Book Free Demo"
 * Audit fix §7.3: Lead Generation Funnel — demo booking, WhatsApp CTA, free trial
 */
import { Link } from 'react-router-dom'

const B  = '#AA4A44'
const F  = '#77966D'
const WA_NUMBER = '919599931471'  // WhatsApp number (country code + number)

export default function LeadMagnet() {
  const whatsappUrl = `https://wa.me/${WA_NUMBER}?text=Hi%2C%20I%27m%20interested%20in%20learning%20more%20about%20Mirai%20Experiential%20School.%20Could%20you%20please%20share%20details%20about%20admissions%3F`

  return (
    <section
      className="py-16"
      style={{ background: 'white', borderTop: '1px solid #F0EDEA', borderBottom: '1px solid #F0EDEA' }}
    >
      <div className="max-w-5xl mx-auto px-6">
        <div
          className="rounded-3xl overflow-hidden"
          style={{ background: `linear-gradient(135deg, #2D1210 0%, ${B} 60%, ${F} 100%)` }}
        >
          {/* Dot pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none"
               style={{
                 backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
                 backgroundSize: '28px 28px',
               }}/>
          <div className="relative px-8 py-10 md:px-12 md:py-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-3"
                  style={{ background: 'rgba(255,255,255,0.15)', color: 'white', fontFamily: 'var(--font-display)' }}
                >
                  🎓 Limited Seats — 2026–27
                </div>
                <h3
                  className="font-display font-800 text-white mb-2"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}
                >
                  Book Your Free Campus Tour Today
                </h3>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-body)' }}>
                  Meet our faculty, see our facilities, and get all your admissions questions answered — at no cost.
                </p>
              </div>

              {/* Audit §4.2 + §4.5: Strong CTAs — "Enroll Now" + "Book Free Demo" + WhatsApp */}
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <Link
                  to="/student-inquiry#academic-session-header"
                  className="btn btn-lg"
                  style={{ background: 'white', color: B, fontFamily: 'var(--font-display)', fontWeight: 800, textDecoration: 'none' }}
                >
                  Enroll Now →
                </Link>
                <Link
                  to="/contact"
                  className="btn btn-ghost-white btn-lg"
                  style={{ textDecoration: 'none' }}
                >
                  Book Free Demo
                </Link>
                {/* Audit §7.3: WhatsApp CTA */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-lg"
                  style={{
                    background: '#25D366',
                    color: 'white',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    textDecoration: 'none',
                  }}
                >
                  {/* WhatsApp icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
