const DEFAULT = [
  { value:'Green', suffix:'', label:'Campus' },
  { value:'98', suffix:'%', label:'Global Pathway' },
  { value:'100', suffix:'+', label:'Expert Educators' },
  { value:'Global', suffix:'', label:'' },
]
export default function StatsBanner({ stats, forest = false }) {
  const items = stats?.length ? stats : DEFAULT
  const bg    = forest ? '#77966D' : '#AA4A44'
  const bgDark = forest ? '#5C7854' : '#8B3A35'
  return (
    <section style={{ background: `linear-gradient(135deg, ${bgDark}, ${bg})` }} className="py-14 relative overflow-hidden">
      {/* ADDED IMAGE: Students on sports field — subtle background texture */}
      <img
        src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&q=40"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-luminosity"
      decoding="async" />
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {items.map((s, i) => (
            <div key={i} className="py-4 px-2">
              <div className="font-display font-800 leading-none mb-2"
                   style={{ fontFamily:'var(--font-display)', fontWeight:800,
                            fontSize:'clamp(2.2rem,4vw,3rem)', color:'white' }}>
                {s.value}{s.suffix}
              </div>
              <div className="w-6 h-0.5 mx-auto mb-2" style={{ background:'rgba(255,255,255,0.35)' }}/>
              <div className="text-xs font-semibold tracking-wider uppercase"
                   style={{ color:'rgba(255,255,255,0.7)', fontFamily:'var(--font-display)' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
