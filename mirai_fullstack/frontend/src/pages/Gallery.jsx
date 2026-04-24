import { useState, useEffect, useCallback } from 'react'
import { useSEO } from '../hooks/useSEO'
import { META, organizationSchema } from '../utils/seo'
import PageHero from '../components/PageHero'
import CTABanner from '../components/CTABanner'

const B = '#AA4A44', F = '#77966D'

const photos = [
  /* ── Campus ─────────────────────────────────────────── */
  { cat: 'Campus', title: 'Main Academic Block',       caption: 'State-of-the-art infrastructure built for inspired learning',      url: '/mirai_school2_image.jpeg', span: 'tall' },
  { cat: 'Campus', title: 'Modern Architecture',        caption: 'Contemporary design blending with nature',                          url: '/mirai_school3_image.jpeg' },
  { cat: 'Campus', title: 'Green Campus Vista',       caption: 'Expansive green campus encouraging outdoor exploration',            url: '/mirai_school5_image.jpeg' },
  { cat: 'Campus', title: 'Secondary Wing',             caption: 'Dedicated spaces for higher secondary research and learning',       url: '/mirai_school7_image.jpeg' },
  { cat: 'Campus', title: 'Interactive Corridors',      caption: 'Every space at Mirai is designed to inspire curiosity',             url: '/mirai_coridor2_image.jpeg', span: 'wide' },
  { cat: 'Campus', title: 'Campus Pathway',             caption: 'Seamless connectivity across learning zones',                       url: '/mirai_coridor4_image.jpeg' },

  /* ── Residential Life ────────────────────────────────── */
  { cat: 'Residential Life', title: 'Boarding House Exterior',   caption: 'Safe, warm, and home-like residential spaces',                url: '/mirai_school6_image.jpeg', span: 'tall' },
  { cat: 'Residential Life', title: 'Welcoming Reception',        caption: '24/7 dedicated support for our residential family',           url: '/mirai_reception_image.jpeg' },
  { cat: 'Residential Life', title: 'Lobby & Lounge',            caption: 'Community spaces for relaxation and social bonding',          url: '/mirai_reception4_image.jpeg' },
  { cat: 'Residential Life', title: 'Parent Lounge',              caption: 'Comfortable spaces for visiting families and interactions',   url: '/mirai_reception5_image.jpeg' },
  { cat: 'Residential Life', title: 'Residential Services',       caption: 'Hygienic and professionally managed student facilities',       url: '/mirai_reception6_image.jpeg', span: 'wide' },

  /* ── Sports ──────────────────────────────────────────── */
  { cat: 'Sports', title: 'Multi-Sport Arena',         caption: 'Olympic-standard outdoor fields for multiple sports',               url: '/mirai_sports_image.jpeg', span: 'tall' },
  { cat: 'Sports', title: 'Cricket Grounds',           caption: 'Professional turf and practice nets for young cricketers',          url: '/mirai_playground2_image.jpeg' },
  { cat: 'Sports', title: 'Main Playground',           caption: 'Expansive fields for athletics, football, and team sports',         url: '/mirai_playground3_image.jpeg' },
  { cat: 'Sports', title: 'Sports Infrastructure',      caption: 'High-performance facilities integrated with the IB curriculum',      url: '/mirai_playground4_image.jpeg', span: 'wide' },

  /* ── Classroom Learning ──────────────────────────────── */
  { cat: 'Classroom Learning', title: 'Collaborative Study',     caption: 'Students learn best when they explore and inquiry together',  url: '/mirai_activity_book_image.jpeg', span: 'tall' },
  { cat: 'Classroom Learning', title: 'Academic Research',       caption: 'Developing critical thinking through independent inquiry',    url: '/mirai_activity_book2_image.jpeg' },
  { cat: 'Classroom Learning', title: 'Innovation Lab',          caption: 'Hands-on experimentation in our modern activity rooms',       url: '/mirai_activityroom_image.jpeg' },
  { cat: 'Classroom Learning', title: 'Primary Discovery Zone',  caption: 'Nurturing curiosity in our younger learners',                 url: '/mirai_activityroom2_image.jpeg' },
  { cat: 'Classroom Learning', title: 'Smart Technology',        caption: 'Technology-enabled learning with interactive tools',          url: '/mirai_school4_image.jpeg', span: 'wide' },

  /* ── Events (Coming Soon) ────────────────────────────── */
  // { cat: 'Events', title: 'Student Showcases',         caption: 'Celebrating achievement and talent across all grades',              url: '/mirai_activity_3_image.jpeg', span: 'tall' },
  // { cat: 'Events', title: 'Cultural Festival',         caption: 'Annual celebrations of global heritage and diversity',              url: '/mirai_activity_4_image.jpeg' },
  // { cat: 'Events', title: 'Science Symposium',         caption: 'Presenting original research and innovative solutions',               url: '/mirai_activity_5_image.jpeg' },
  // { cat: 'Events', title: 'Annual Day',                caption: 'Grand stage performances by the Mirai student body',                url: '/mirai_activity_7_image.jpeg' },
  // { cat: 'Events', title: 'Expert-Led Skill Workshops', caption: 'Interactive sessions focused on developing future-ready skills',     url: '/mirai_activity_8.jpeg' },
  // { cat: 'Events', title: 'Award Ceremony',            caption: 'Recognising excellence in academics, sports, and arts',             url: '/mirai_activity_9_image.jpeg', span: 'wide' },
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
                {cat === 'All' ? `🖼️ All (${photos.length})` : cat === 'Events' ? `${cat} (Coming Soon)` : `${cat} (${photos.filter(p => p.cat === cat).length})`}
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
            <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-stone-200">
              <div className="text-6xl mb-6">📅</div>
              <h3 className="text-2xl font-display font-800 mb-2" style={{ color: '#1C1917', fontFamily: 'var(--font-display)', fontWeight: 800 }}>
                {active === 'Events' ? 'Events Coming Soon' : 'No Photos Yet'}
              </h3>
              <p className="text-base max-w-md mx-auto" style={{ color: '#78716C' }}>
                {active === 'Events' 
                  ? 'Our event gallery is currently being curated. We look forward to sharing our vibrant school celebrations with you shortly.' 
                  : 'We are currently updating our gallery for this category. Please check back soon.'}
              </p>
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

