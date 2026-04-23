import { useState, useEffect, useCallback } from 'react'
import { useSEO } from '../hooks/useSEO'
import { META, organizationSchema } from '../utils/seo'
import PageHero from '../components/PageHero'
import CTABanner from '../components/CTABanner'

const B = '#AA4A44', F = '#77966D'

const photos = [
  /* ── Campus ─────────────────────────────────────────── */
  { cat: 'Campus', title: 'Main Campus Building',       caption: 'State-of-the-art infrastructure built for inspired learning',      url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=900&q=80&auto=format', span: 'tall' },
  { cat: 'Campus', title: 'Campus Architecture',        caption: 'Contemporary design blending with nature',                          url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900&q=80&auto=format' },
  { cat: 'Campus', title: 'Green Campus Grounds',       caption: 'Expansive green campus encouraging outdoor exploration',            url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=900&q=80&auto=format' },
  { cat: 'Campus', title: 'School Library',             caption: '15,000+ titles across disciplines for curious readers',             url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=900&q=80&auto=format' },
  { cat: 'Campus', title: 'Learning Corridor',          caption: 'Every space at Mirai is designed to inspire',                       url: 'https://images.unsplash.com/photo-1519311965067-36d3e5f33d39?w=900&q=80&auto=format', span: 'wide' },

  /* ── Residential Life ────────────────────────────────── */
  { cat: 'Residential Life', title: 'Boarding House',           caption: 'Safe, warm, and home-like residential spaces',                url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80&auto=format', span: 'tall' },
  { cat: 'Residential Life', title: 'Student Dormitory',        caption: 'Comfortable and structured boarding rooms for every student',  url: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=900&q=80&auto=format' },
  { cat: 'Residential Life', title: 'Common Room',              caption: 'Community spaces for relaxation, bonding, and creativity',      url: 'https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=900&q=80&auto=format' },
  { cat: 'Residential Life', title: 'Evening Study Hall',       caption: 'Structured evening study with dedicated mentor support',        url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=80&auto=format' },
  { cat: 'Residential Life', title: 'Dining Hall',              caption: 'Nutritional, balanced meals served in a vibrant community hall', url: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=900&q=80&auto=format', span: 'wide' },

  /* ── Sports ──────────────────────────────────────────── */
  { cat: 'Sports', title: 'Sports Arena',              caption: 'Olympic-standard outdoor fields for multiple sports',               url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=900&q=80&auto=format', span: 'tall' },
  { cat: 'Sports', title: 'Basketball Court',          caption: 'Full-size indoor and outdoor basketball facilities',                 url: 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?w=900&q=80&auto=format' },
  { cat: 'Sports', title: 'Martial Arts Training',     caption: 'Taekwondo, self-defence, and fencing programmes for all ages',      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80&auto=format' },
  { cat: 'Sports', title: 'Athletics & Fitness',       caption: 'Professional gym and fitness training facilities on campus',        url: 'https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?w=900&q=80&auto=format' },
  { cat: 'Sports', title: 'Swimming & Aquatics',       caption: 'Aquatics centre offering swimming training and water sports',       url: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=900&q=80&auto=format', span: 'wide' },

  /* ── Classroom Learning ──────────────────────────────── */
  { cat: 'Classroom Learning', title: 'Collaborative Learning',  caption: 'Students learn best when they explore together',              url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=900&q=80&auto=format', span: 'tall' },
  { cat: 'Classroom Learning', title: 'Science Laboratory',      caption: 'Hands-on experiments in fully equipped science labs',         url: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=900&q=80&auto=format' },
  { cat: 'Classroom Learning', title: 'AI & Robotics Lab',       caption: 'Cutting-edge tools for machine learning and IoT projects',    url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=80&auto=format' },
  { cat: 'Classroom Learning', title: 'Smart Classrooms',        caption: 'Technology-enabled learning with AR, VR, and interactive tools', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900&q=80&auto=format' },
  { cat: 'Classroom Learning', title: 'Student Presentations',   caption: 'Building confidence through public speaking and research',    url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=900&q=80&auto=format', span: 'wide' },

  /* ── Events ──────────────────────────────────────────── */
  { cat: 'Events', title: 'Annual Cultural Festival',  caption: '"Verve 2026" — 35+ cultures celebrate on one stage',                url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&q=80&auto=format', span: 'tall' },
  { cat: 'Events', title: 'Research Symposium',        caption: 'MYP students present original research to industry professionals',  url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80&auto=format' },
  { cat: 'Events', title: 'Sports Day & Awards',       caption: 'Celebrating athletic excellence across all disciplines',             url: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=900&q=80&auto=format' },
  { cat: 'Events', title: 'Debate Championship',       caption: 'Students argue, reason, and inspire from the podium',              url: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=900&q=80&auto=format', span: 'wide' },
]

const CATS = ['All', 'Campus', 'Residential Life', 'Sports', 'Classroom Learning', 'Events']

const catColors = {
  'Campus':             { bg: `${B}18`, color: B },
  'Residential Life':   { bg: '#7C3AED18', color: '#7C3AED' },
  'Sports':             { bg: `${F}18`, color: F },
  'Classroom Learning': { bg: '#D9770618', color: '#D97706' },
  'Events':             { bg: '#2563EB18', color: '#2563EB' },
}

export default function Gallery() {
  useSEO(META.gallery, [organizationSchema()])

  const [active, setActive]   = useState('All')
  const [light, setLight]     = useState(null) // index into filtered list

  const filtered = active === 'All' ? photos : photos.filter(p => p.cat === active)

  const close  = ()  => setLight(null)
  const prev   = useCallback(() => setLight(i => (i - 1 + filtered.length) % filtered.length), [filtered.length])
  const next   = useCallback(() => setLight(i => (i + 1) % filtered.length), [filtered.length])

  /* Keyboard navigation */
  useEffect(() => {
    if (light === null) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'Escape')     close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [light, next, prev])

  /* Lock body scroll when lightbox open */
  useEffect(() => {
    document.body.style.overflow = light !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [light])

  const current = light !== null ? filtered[light] : null

  return (
    <>
      <PageHero
        title="Photo Gallery"
        subtitle="Explore life at Mirai through our visual stories — from classroom discovery to campus celebrations."
        breadcrumb={[{ label: 'News & Media' }, { label: 'Gallery' }]}
      />

      {/* ── Category Filter Tabs ─────────────────────────────────────── */}
      <section className="pt-16 pb-4 sticky top-0 z-20" style={{ background: 'white', borderBottom: '1px solid #F0EDEA' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-2">
            {CATS.map(cat => (
              <button key={cat} onClick={() => { setActive(cat); setLight(null) }}
                className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200"
                style={{
                  background: active === cat ? B : 'transparent',
                  color: active === cat ? 'white' : '#78716C',
                  border: `1.5px solid ${active === cat ? B : '#E7E5E3'}`,
                  fontFamily: 'var(--font-display)',
                }}>
                {cat === 'All' ? `🖼️ All (${photos.length})` : `${cat} (${photos.filter(p => p.cat === cat).length})`}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery Grid ─────────────────────────────────────────────── */}
      <section className="py-16" style={{ background: '#FAFAF8' }}>
        <div className="max-w-7xl mx-auto px-6">

          {/* Category heading */}
          {active !== 'All' && (
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-3"
                style={{ background: catColors[active]?.bg, color: catColors[active]?.color, fontFamily: 'var(--font-display)' }}>
                {active}
              </div>
              <h2 className="font-display font-800 text-2xl" style={{ color: '#1C1917', fontFamily: 'var(--font-display)', fontWeight: 800 }}>
                {active === 'Campus'             && 'World-Class Infrastructure & Spaces'}
                {active === 'Residential Life'   && 'A Home Away From Home'}
                {active === 'Sports'             && 'Athletics, Movement & Champion Mindset'}
                {active === 'Classroom Learning' && 'Innovation, Inquiry & Discovery'}
                {active === 'Events'             && 'Every Moment Worth Celebrating'}
              </h2>
            </div>
          )}

          {/* Masonry-style responsive grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {filtered.map((img, i) => (
              <div key={`${img.cat}-${i}`}
                className="relative group overflow-hidden rounded-2xl break-inside-avoid cursor-zoom-in shadow-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                onClick={() => setLight(i)}
                style={{ display: 'block' }}>

                {/* Image */}
                <img
                  src={img.url}
                  alt={img.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ height: img.span === 'tall' ? 420 : img.span === 'wide' ? 280 : 260, width: '100%' }}
                />

                {/* Category badge */}
                <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
                  style={{ background: catColors[img.cat]?.bg || `${B}18`, color: catColors[img.cat]?.color || B, backdropFilter: 'blur(8px)' }}>
                  {img.cat}
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-400"
                  style={{ background: 'linear-gradient(to top, rgba(20,10,8,0.85) 0%, transparent 60%)' }}>
                  <h4 className="text-white font-display font-800 text-base mb-1"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>{img.title}</h4>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>{img.caption}</p>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    🔍 Click to preview
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-24">
              <div className="text-5xl mb-4">🖼️</div>
              <p className="text-base" style={{ color: '#78716C' }}>No photos in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Lightbox Modal ───────────────────────────────────────────── */}
      {current && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(10,8,6,0.95)', backdropFilter: 'blur(12px)' }}
          onClick={close}>

          {/* Content — stop propagation so clicking image doesn't close */}
          <div className="relative max-w-5xl w-full mx-4 flex flex-col items-center" onClick={e => e.stopPropagation()}>

            {/* Counter */}
            <div className="absolute -top-10 left-0 text-xs font-bold" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-display)' }}>
              {light + 1} / {filtered.length}
            </div>

            {/* Close */}
            <button onClick={close}
              className="absolute -top-10 right-0 text-white text-2xl transition-opacity hover:opacity-70 font-light"
              style={{ fontFamily: 'var(--font-display)' }}>
              ✕
            </button>

            {/* Image */}
            <img
              src={current.url}
              alt={current.title}
              className="w-full rounded-2xl shadow-2xl"
              style={{ maxHeight: '75vh', objectFit: 'contain' }}
            />

            {/* Caption */}
            <div className="mt-5 text-center px-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3"
                style={{ background: catColors[current.cat]?.bg, color: catColors[current.cat]?.color }}>
                {current.cat}
              </div>
              <h3 className="text-white font-display font-800 text-xl mb-1"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>{current.title}</h3>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{current.caption}</p>
            </div>

            {/* Prev / Next */}
            <div className="flex gap-4 mt-6">
              <button onClick={prev}
                className="px-6 py-3 rounded-full text-sm font-bold transition-all hover:opacity-80"
                style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.15)', fontFamily: 'var(--font-display)' }}>
                ← Prev
              </button>
              <button onClick={next}
                className="px-6 py-3 rounded-full text-sm font-bold transition-all hover:opacity-80"
                style={{ background: B, color: 'white', fontFamily: 'var(--font-display)' }}>
                Next →
              </button>
            </div>
          </div>

          {/* Keyboard hint */}
          <div className="absolute bottom-6 left-0 right-0 text-center text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
            ← → to navigate · Esc to close
          </div>
        </div>
      )}

      <CTABanner
        title="Experience Mirai in Person"
        subtitle="While photos tell a story, nothing compares to the actual experience. Book your campus tour today."
        primaryText="Book a Campus Visit"
        primaryTo="/contact"
        secondaryText="Enroll Now"
        secondaryTo="/student-inquiry#academic-session-header"
      />
    </>
  )
}

