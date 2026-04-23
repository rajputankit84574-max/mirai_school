import { useState } from 'react'

const B = '#AA4A44' // Brand terracotta
const F = '#77966D' // Forest green

export default function TopTicker() {
  const [isPaused, setIsPaused] = useState(false)

  const tickerItems = [
    { text: '🎓 Admissions Open for Session 2026-27 – Limited Seats Available', link: '/admissions' },
    { text: '📞 Call for Inquiry: +91 95999 31471', link: 'tel:+919599931471' },
    { text: '💬 WhatsApp Us for Instant Support', link: 'https://wa.me/919599931471' },
    { text: '✨ Ranked #1 for Experiential Learning in the Region', link: '/about' },
  ]

  return (
    <div 
      className="fixed top-0 left-0 w-full overflow-hidden z-[60]"
      style={{ 
        background: '#1C1917', 
        height: '40px',
        borderBottom: `1px solid rgba(255,255,255,0.05)`
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div 
        className={`flex whitespace-nowrap items-center h-full ${isPaused ? 'pause-animation' : 'animate-ticker'}`}
      >
        {/* Repeat items twice for seamless loop */}
        {[...tickerItems, ...tickerItems].map((item, idx) => (
          <a
            key={idx}
            href={item.link}
            className="inline-flex items-center px-12 text-[11px] font-bold uppercase tracking-widest text-white/80 hover:text-white transition-colors duration-300"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {item.text}
            <span className="ml-12 w-1.5 h-1.5 rounded-full" style={{ background: B }} />
          </a>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 30s linear infinite;
        }
        .pause-animation {
          animation-play-state: paused;
        }
      `}} />
    </div>
  )
}
