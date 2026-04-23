// Generic feature card used across campus, sports, programmes, etc.
const B = '#AA4A44'
const F = '#77966D'

export function FeatureCard({ icon, label, title, desc, accent = 'brand' }) {
  const color = accent === 'forest' ? F : B
  return (
    <div className="bg-white rounded-2xl overflow-hidden card-hover"
         style={{ border: '1.5px solid #F0EDEA', boxShadow: '0 2px 16px rgba(170,74,68,0.05)' }}>
      {/* ADDED IMAGE: contextual school photo per card icon */}
      <div className="aspect-[16/9] overflow-hidden relative">
        <img
          src={{
            '🔬':'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=600&q=75&auto=format',
            '💻':'https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&q=75&auto=format',
            '📚':'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&q=75&auto=format',
            '🎨':'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&q=75&auto=format',
            '🎵':'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&q=75&auto=format',
            '🎭':'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=75&auto=format',
            '🌾':'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=75&auto=format',
            '🏗️':'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=75&auto=format',
            '🏕️':'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=600&q=75&auto=format',
            '🤝':'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=75&auto=format',
            '🗺️':'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&q=75&auto=format',
            '🏛️':'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&q=75&auto=format',
            '🏆':'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600&q=75&auto=format',
            '🌏':'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=600&q=75&auto=format',
            '💬':'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&q=75&auto=format',
            '🎪':'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=75&auto=format',
            '🏅':'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600&q=75&auto=format',
            '🌐':'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&q=75&auto=format',
            '🎸':'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&q=75&auto=format',
            '📰':'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=75&auto=format',
          }[icon] || 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=75&auto=format'}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        decoding="async" />
        <div className="absolute inset-0" style={{ background: accent === 'forest' ? 'rgba(26,43,23,0.38)' : 'rgba(45,18,16,0.38)' }} />
        {label && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold"
               style={{ background: 'rgba(255,255,255,0.18)', color: 'white', fontFamily: 'var(--font-display)' }}>
            {label}
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-display font-800 text-lg leading-snug mb-2"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: '#1C1917' }}>
          {title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: '#78716C', fontFamily: 'var(--font-body)' }}>{desc}</p>
      </div>
    </div>
  )
}

export function FacilityTile({ icon, title, desc }) {
  return (
    <div className="bg-white rounded-2xl border p-6 flex gap-4 items-start card-hover"
         style={{ border: '1.5px solid #F0EDEA' }}>
      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
           style={{ background: '#F5ECEA' }}>{icon}</div>
      <div>
        <h4 className="font-bold text-sm mb-1" style={{ color: '#1C1917', fontFamily: 'var(--font-display)' }}>{title}</h4>
        <p className="text-xs leading-relaxed" style={{ color: '#78716C', fontFamily: 'var(--font-body)' }}>{desc}</p>
      </div>
    </div>
  )
}

export function ProgramCard({ prog }) {
  return (
    <div className="bg-white rounded-2xl card-hover relative overflow-hidden"
         style={{ border: '1.5px solid #F0EDEA', boxShadow: '0 2px 16px rgba(170,74,68,0.06)' }}>
      <div className="absolute top-0 inset-x-0 h-1 rounded-t-2xl"
           style={{ background: `linear-gradient(90deg, ${B}, ${F})` }}/>
      <div className="p-7">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5"
             style={{ background: `linear-gradient(135deg, ${B}, #C9645D)` }}>
          {prog.icon}
        </div>
        <div className="text-xs font-bold tracking-widest uppercase mb-2"
             style={{ color: F, fontFamily: 'var(--font-display)' }}>{prog.age_range}</div>
        <h3 className="font-display font-800 text-lg mb-2 leading-tight"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: '#1C1917' }}>
          {prog.program_type_display}
        </h3>
        <p className="text-sm leading-relaxed mb-5" style={{ color: '#78716C', fontFamily: 'var(--font-body)' }}>
          {prog.description}
        </p>
        <ul className="space-y-2">
          {prog.highlights_list.map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-sm pb-2"
                style={{ borderBottom: i < prog.highlights_list.length - 1 ? '1px solid #F7F5F2' : 'none', color: '#44403C' }}>
              <span className="font-bold flex-shrink-0 mt-0.5" style={{ color: F }}>✓</span>
              <span style={{ fontFamily: 'var(--font-body)' }}>{h}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
