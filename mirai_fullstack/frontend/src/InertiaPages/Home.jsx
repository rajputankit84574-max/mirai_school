/**
 * Home.jsx
 * Audit fixes applied:
 *   §1.2  — Organization + Course + FAQ schema injected
 *   §2.2  — Optimized meta title + description with keywords
 *   §2.4  — Internal links: homepage → courses → blog → admissions
 *   §2.5  — FAQ section added
 *   §4.2  — CTA text changed: "Enroll Now" + "Book Free Demo"
 *   §4.4  — Trust signals: testimonials already present; student success callout added
 *   §4.5  — Lead generation funnel: LeadMagnet component added
 *   §7.3  — WhatsApp CTA via LeadMagnet
 */
import { Link, Head } from '@inertiajs/react'
import { useEffect } from 'react'
import { useFAQs } from '../api' // FAQs can still be client-side fetched if desired
import { useSEO } from '../hooks/useSEO'
import { META, organizationSchema, courseSchema, faqSchema } from '../utils/seo'
import StatsBanner    from '../components/StatsBanner'
import CTABanner      from '../components/CTABanner'
import SectionHeader  from '../components/SectionHeader'
import LoadingSpinner from '../components/LoadingSpinner'
import FAQSection     from '../components/FAQSection'
import LeadMagnet     from '../components/LeadMagnet'

const B  = '#AA4A44'
const F  = '#77966D'
const FP = '#EFF4ED'
const BP = '#F5ECEA'

/* ── Hero ─────────────────────────────────────────────────── */
function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ 
        background: 'linear-gradient(145deg, #2D1210 0%, #6B2522 40%, #AA4A44 80%, #8B5E3C 100%)',
        paddingTop: 141
      }}
    >
      <div className="absolute inset-0 opacity-10"
           style={{ backgroundImage:'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize:'32px 32px' }}/>
      <div className="absolute bottom-0 inset-x-0 h-48"
           style={{ background:'linear-gradient(to top, rgba(255,255,255,0.06), transparent)' }}/>

      <div className="relative max-w-7xl mx-auto px-6 w-full flex flex-col justify-center min-h-[calc(100vh-141px)] py-16">

        {/* ── Top flex row: left text | right images ── */}
        <div className="flex flex-col mb-12 pt-12">

          {/* Top Level: Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-8 self-start"
               style={{ background:'rgba(255,255,255,0.12)', border:'1px solid rgba(255,255,255,0.25)', color:'white', fontFamily:'var(--font-display)' }}>
            <img src="/icon.png" alt="" style={{ height:16, width:16, filter:'brightness(10)', opacity:0.8 }} decoding="async" />
            IB World School
          </div>

          {/* Row: Heading and Adjacent Images */}
          <div className="flex items-stretch gap-12 mb-10">
            <h1 className="font-display leading-tight text-white flex-1 flex items-center"
                style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(2.4rem, 4.5vw, 4rem)' }}>
              <span>
                Mirai Experiential School – <br/>
                <span style={{ color:'#AFBFAA' }}>A Future-Ready International Learning Environment</span>
              </span>
            </h1>

            {/* Right: Height-matched Image Grid */}
            <div className="hidden xl:grid grid-cols-2 gap-3 flex-shrink-0 w-[45%] h-auto">
              <div className="rounded-2xl overflow-hidden row-span-2 relative shadow-xl border border-white/10">
                <img src="/mirai_school5_image.jpeg"
                     alt="Modern school campus building exterior"
                     className="w-full h-full object-cover" decoding="async" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)' }} />
              </div>
              <div className="rounded-2xl overflow-hidden relative shadow-xl border border-white/10">
                <img src="/mirai_coridor3_image.jpeg"
                     alt="Modern school corridor and learning spaces"
                     className="w-full h-full object-cover" decoding="async" />
                <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.25)' }} />
              </div>
              <div className="rounded-2xl overflow-hidden relative shadow-xl border border-white/10">
                <img src="/mirai_sports_image.jpeg"
                     alt="Students playing football on school sports ground"
                     className="w-full h-full object-cover" decoding="async" />
                <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.25)' }} />
              </div>
            </div>
          </div>

          {/* Description & Buttons */}
          <div className="max-w-2xl">
            <p className="text-lg md:text-xl leading-relaxed mb-10"
               style={{ color:'rgba(255,255,255,0.85)', maxWidth:600, fontFamily:'var(--font-body)' }}>
              Experience a transformative IB education where students excel through hands-on experiential learning, world-class sports, and a nurturing residential campus.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/student-inquiry#academic-session-header"
                className="btn btn-lg px-8"
                style={{ background:'white', color:B, fontFamily:'var(--font-display)', fontWeight:800, textDecoration:'none' }}>
                Enroll Now →
              </Link>
              <Link to="/contact"
                className="btn btn-ghost-white btn-lg px-8"
                style={{ textDecoration:'none' }}>
                Book Free Demo
              </Link>
            </div>
          </div>
        </div>

        {/* ── Stats strip — full-width horizontal cards ── */}
        <div className="flex gap-4 pt-10"
             style={{ borderTop:'1px solid rgba(255,255,255,0.15)' }}>
          {[
            { category:'Green Campus', value:'20+', label:'Sports Disciplines', icon:'🌿' },
            { category:'Global',       value:'1:16', label:'Teacher Ratio',      icon:'🌍' },
          ].map(({ category, value, label, icon }) => (
            <div key={category}
                 style={{
                   flex:1,
                   display:'flex',
                   alignItems:'center',
                   gap:16,
                   background:'rgba(255,255,255,0.07)',
                   border:'1px solid rgba(255,255,255,0.14)',
                   borderRadius:16,
                   padding:'12px 20px',
                   backdropFilter:'blur(12px)',
                   boxShadow:'0 2px 16px rgba(0,0,0,0.12)',
                   transition:'transform 0.2s, box-shadow 0.2s',
                 }}
                 onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 6px 24px rgba(0,0,0,0.2)'; }}
                 onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)';    e.currentTarget.style.boxShadow='0 2px 16px rgba(0,0,0,0.12)'; }}
            >
              {/* Icon bubble */}
              <div style={{
                width:40, height:40, borderRadius:12, flexShrink:0,
                background:'rgba(175,191,170,0.15)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:'1.2rem',
              }}>{icon}</div>

              {/* Left: category */}
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{
                  fontSize:'0.55rem', fontWeight:700, letterSpacing:'0.14em',
                  textTransform:'uppercase', color:'#AFBFAA',
                  fontFamily:'var(--font-body)', marginBottom:2,
                }}>{category}</div>
                <div style={{
                  fontSize:'0.68rem', color:'rgba(255,255,255,0.4)',
                  fontFamily:'var(--font-body)', letterSpacing:'0.05em',
                }}>{label}</div>
              </div>

              {/* Right: big number */}
              <div style={{
                fontFamily:'var(--font-display)', fontWeight:900,
                fontSize:'2rem', color:'white', lineHeight:1, flexShrink:0,
              }}>{value}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

/* ── Introduction Section (Audit Fix) ─────────────────────── */
function IntroSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="section-label mb-6" style={{ display: 'inline-flex' }}>Foundational Excellence</div>
            <h2 className="font-display font-800 leading-tight mb-8" 
                style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: '#1C1917' }}>
              Education Beyond Boundaries
            </h2>
            <p className="text-lg md:text-xl leading-relaxed mb-8" style={{ color: '#44403C', fontFamily: 'var(--font-body)' }}>
              At Mirai Experiential School, education extends beyond classrooms into real-world experiences, global perspectives, and holistic development.
            </p>
            <div className="p-8 rounded-3xl mb-8" style={{ background: FP, border: `1px solid ${F}20` }}>
              <p className="text-lg leading-relaxed font-medium mb-6" style={{ color: '#1A2B17', fontFamily: 'var(--font-body)' }}>
                Students benefit from academic excellence, world-class sports infrastructure, and a nurturing residential campus designed for complete development.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'Early Years Programme (EYP)', 
                  'Primary Years Programme (PYP)', 
                  'Middle Years Programme (MYP)', 
                  'Residential / Boarding Facility'
                ].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ background: F }}></div>
                    <span className="text-sm font-bold opacity-80" style={{ color: '#1A2B17', fontFamily: 'var(--font-display)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <Link to="/about" className="btn btn-primary" style={{ background: F, textDecoration: 'none' }}>
              Discover More About Mirai →
            </Link>
          </div>
          <div className="relative">
            <div className="rounded-[40px] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=75&auto=format" 
                alt="Students collaboration" 
                className="w-full aspect-[4/5] object-cover"
              />
            </div>
            {/* Aesthetic element */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full opacity-10" style={{ background: F }}></div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Marquee ──────────────────────────────────────────────── */
function Marquee() {
  const items = ['IB World School','Experiential Learning','Skill-Based Education','Residential Boarding','20+ Sports Disciplines','Global Reach','Global Exposure','1:16 Teacher Ratio','Free Campus Tour Available']
  const doubled = [...items, ...items]
  return (
    <div style={{ background:F, overflow:'hidden' }} className="py-3.5">
      <div className="flex animate-marquee whitespace-nowrap" style={{ width:'max-content' }}>
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-7 text-xs font-bold tracking-widest uppercase"
                style={{ color:'white', fontFamily:'var(--font-display)' }}>
            {item}
            <span style={{ color:'rgba(255,255,255,0.4)' }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── Program Card ─────────────────────────────────────────── */
function ProgramCard({ prog }) {
  return (
    /* Audit §2.4 internal link: card → /programmes */
    <Link to="/programmes" style={{ textDecoration:'none' }}>
      <div className="bg-white rounded-2xl border card-hover relative overflow-hidden h-full"
           style={{ border:'1.5px solid #F0EDEA', boxShadow:'0 2px 16px rgba(170,74,68,0.06)' }}>
        <div className="absolute top-0 inset-x-0 h-1 rounded-t-2xl"
             style={{ background:`linear-gradient(90deg, ${B}, ${F})` }}/>
        <div className="p-7">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5"
               style={{ background:`linear-gradient(135deg, ${B}, #C9645D)` }}>
            {prog.icon}
          </div>
          <div className="text-xs font-bold tracking-widest uppercase mb-2"
               style={{ color:F, fontFamily:'var(--font-display)' }}>{prog.age_range}</div>
          <h3 className="font-display font-800 text-lg mb-2 leading-tight"
              style={{ fontFamily:'var(--font-display)', fontWeight:800, color:'#1C1917' }}>
            {prog.program_type_display}
          </h3>
          <p className="text-sm leading-relaxed mb-5"
             style={{ color:'#78716C', fontFamily:'var(--font-body)' }}>
            {prog.description.slice(0,110)}…
          </p>
          <ul className="space-y-2">
            {prog.highlights_list.slice(0,3).map((h,i) => (
              <li key={i} className="flex items-start gap-2 text-sm pb-2"
                  style={{ borderBottom:i<2?'1px solid #F7F5F2':'none', color:'#44403C' }}>
                <span className="mt-0.5 font-bold flex-shrink-0" style={{ color:F }}>✓</span>
                <span style={{ fontFamily:'var(--font-body)' }}>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Link>
  )
}

/* ── Feature Split ────────────────────────────────────────── */
function FeatureSplit({ label, title, body, bullets, cta, ctaTo, visual, reverse=false, forest=false }) {
  const accent = forest ? F : B
  return (
    <div className={`flex flex-col ${reverse?'lg:flex-row-reverse':'lg:flex-row'} gap-14 items-center`}>
      <div className="flex-1">
        <div className={`section-label mb-4 ${forest?'section-label-forest':''}`}
             style={{ display:'inline-flex' }}>{label}</div>
        <h2 className="font-display font-800 leading-tight mb-4"
            style={{ fontFamily:'var(--font-display)', fontWeight:800,
                     fontSize:'clamp(1.7rem,3vw,2.4rem)', color:'#1C1917' }}>
          {title}
        </h2>
        <p className="leading-relaxed mb-6 text-base" style={{ color:'#78716C', fontFamily:'var(--font-body)' }}>{body}</p>
        <ul className="space-y-3 mb-8">
          {bullets.map((b,i) => (
            <li key={i} className="flex items-start gap-3 text-sm pb-3"
                style={{ borderBottom:i<bullets.length-1?'1px solid #F0EDEA':'none', color:'#44403C', fontFamily:'var(--font-body)' }}>
              <span className="text-xl flex-shrink-0">{b.icon}</span>
              {b.text}
            </li>
          ))}
        </ul>
        {/* Audit §4.2: strong CTA text */}
        <Link to={ctaTo} className="btn btn-primary" style={{ background:accent, textDecoration:'none' }}>
          {cta} →
        </Link>
      </div>
      <div className="flex-1">
        {/* ADDED IMAGE: Feature section contextual photo */}
        <div className="rounded-3xl overflow-hidden aspect-[4/3] relative">
          <img
            src={visual || (forest 
              ? "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=75&auto=format" 
              : "/sports-training-premium.png")}
            alt={title}
            className="w-full h-full object-cover"
            decoding="async" />
          <div className="absolute inset-0" style={{ background: forest ? 'rgba(26,43,23,0.35)' : 'rgba(45,18,16,0.35)' }} />
          <div className="absolute bottom-5 left-5 bg-white/95 rounded-2xl px-4 py-3 shadow-lg">
            <div className="text-xs font-bold" style={{ color:'#1C1917', fontFamily:'var(--font-display)' }}>
              {forest ? 'Project-Based Learning' : '20+ Sports Disciplines'}
            </div>
            <div className="text-xs mt-0.5" style={{ color:'#A8A29E', fontFamily:'var(--font-body)' }}>
              {forest ? 'Integrated across subjects' : 'Professional coaching'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Testimonial Card ─────────────────────────────────────── */
function TestCard({ t }) {
  return (
    <div className="bg-white rounded-2xl p-7 card-hover relative"
         style={{ border:'1.5px solid #F0EDEA', boxShadow:'0 2px 16px rgba(170,74,68,0.06)' }}>
      <div className="absolute top-4 right-6 font-display text-7xl leading-none"
           style={{ fontFamily:'var(--font-display)', color:B, opacity:0.1 }}>"</div>
      <div className="flex gap-0.5 mb-4">
        {Array(5).fill(0).map((_,i) => (
          <svg key={i} className="w-4 h-4" viewBox="0 0 20 20" fill={B}>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        ))}
      </div>
      <p className="text-sm leading-relaxed mb-6 italic" style={{ color:'#78716C', fontFamily:'var(--font-body)' }}>
        "{t.content}"
      </p>
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-display font-bold flex-shrink-0 text-sm"
             style={{ background:`linear-gradient(135deg, ${B}, #C9645D)`, fontFamily:'var(--font-display)' }}>
          {t.initials}
        </div>
        <div>
          <div className="text-sm font-bold" style={{ color:'#1C1917', fontFamily:'var(--font-display)' }}>{t.name}</div>
          <div className="text-xs" style={{ color:'#A8A29E', fontFamily:'var(--font-body)' }}>{t.role}</div>
        </div>
      </div>
    </div>
  )
}

/* ── Blog Preview Card ────────────────────────────────────── */
function BlogCard({ post }) {
  return (
    /* Audit §2.4: internal link blog card → blog detail */
    <Link to={`/blog/${post.slug}`} style={{ textDecoration:'none' }}>
      <div className="bg-white rounded-2xl overflow-hidden card-hover h-full"
           style={{ border:'1.5px solid #F0EDEA', boxShadow:'0 2px 16px rgba(170,74,68,0.05)' }}>
        {/* ADDED IMAGE: Blog card thumbnail — category-specific school image */}
        <div className="aspect-[16/9] relative overflow-hidden">
          <img
            src={post.image || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80&auto=format"}
            alt={post.title}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async" />
          <div className="absolute inset-0" style={{ background:'rgba(170,74,68,0.45)' }} />
          {post.category && (
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold"
                 style={{ background:'rgba(255,255,255,0.2)', color:'white', fontFamily:'var(--font-display)' }}>
              {post.category.name}
            </div>
          )}
        </div>
        <div className="p-6">
          <p className="text-xs mb-2 font-medium" style={{ color:'#A8A29E', fontFamily:'var(--font-body)' }}>
            {new Date(post.published_date).toLocaleDateString('en-IN',{month:'long',year:'numeric'})}
          </p>
          <h3 className="font-display font-800 text-lg leading-snug mb-2"
              style={{ fontFamily:'var(--font-display)', fontWeight:800, color:'#1C1917' }}>
            {post.title}
          </h3>
          <p className="text-sm leading-relaxed mb-4 line-clamp-2"
             style={{ color:'#78716C', fontFamily:'var(--font-body)' }}>{post.excerpt}</p>
          <span className="inline-flex items-center gap-1.5 text-sm font-bold"
                style={{ color:B, fontFamily:'var(--font-display)' }}>
            Read Article →
          </span>
        </div>
      </div>
    </Link>
  )
}

/* ══════════════════════════════════════════════════════════
   HOME PAGE
══════════════════════════════════════════════════════════ */
export default function Home({ overview, blogData }) {
  const { data: faqData }             = useFAQs()

  const programs     = overview?.programs     ?? []
  const testimonials = overview?.testimonials ?? []
  const stats        = overview?.stats        ?? []
  const facilities   = overview?.facilities   ?? []
  const blogPosts    = blogData?.results      ?? []
  const faqs         = Array.isArray(faqData) ? faqData : faqData?.results ?? []

  // Audit §1.2 + §2.2: inject schema + optimized meta
  useSEO(META.home, [
    organizationSchema(),
    faqSchema(faqs),
    courseSchema(programs),
  ])

  return (
    <>
      <Hero />
      <Marquee />

      {/* IB Programmes — Audit §2.4 internal link section */}
      <section className="py-24" style={{ background:'#FAFAF8' }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader center
            label="IB Curriculum — Skill-Based Education"
            title="IB Programmes for Every Stage of Learning"
            subtitle="From early years to the Diploma, our IB framework combines academic rigour with skill-based, experiential learning for global university readiness."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {programs.map(p => <ProgramCard key={p.id} prog={p}/>)}
          </div>
          {/* Audit §2.4: internal link homepage → programmes */}
          <div className="text-center mt-10">
            <Link to="/programmes" className="btn btn-outline" style={{ textDecoration:'none' }}>
              Explore All IB Programmes →
            </Link>
          </div>
        </div>
      </section>

      <StatsBanner stats={stats} />

      {/* Experiential / Skill-Based Learning — Audit §2.1 keyword: "skill-based" */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <FeatureSplit
            label="Experiential & Skill-Based Learning" forest
            title="Real-World Skills That Last a Lifetime"
            body="At Mirai, every subject connects to the real world. Students grow food, engineer solutions, code AI projects, perform on stage, and lead community change — all as part of daily school life."
            bullets={[
              {icon:'🌱',text:'Farm-to-table sustainability projects integrated into Science curriculum'},
              {icon:'🤖',text:'AI learning and coding integrated across subjects for future readiness'},
              {icon:'🔬',text:'Research labs, design thinking studios, and innovation maker spaces'},
              {icon:'🌍',text:'Community Action & Service (CAS) projects with real social impact'},
            ]}
            cta="Explore Experiential Learning"
            ctaTo="/experiential-learning"
            visual="/mirai_school_image.jpeg"
          />
        </div>
      </section>

      {/* Sports */}
      <section className="py-24" style={{ background:'#FAFAF8' }}>
        <div className="max-w-7xl mx-auto px-6">
          <FeatureSplit reverse
            label="Sports & Athletics"
            title="Champions Built on Every Field"
            body="20+ sports disciplines, professional coaching, and elite sports academies — because physical excellence and academic achievement go hand in hand at Mirai."
            bullets={[
              {icon:'🏏',text:'Cricket ground & nets with professional national-level coaching'},
              {icon:'🏊',text:'Olympic-size swimming pool and competitive aquatics training'},
              {icon:'⚽',text:'FIFA-quality football ground and full athletics track'},
              {icon:'🎾',text:'Indoor courts for badminton, squash, and basketball'},
            ]}
            cta="See Sports Facilities"
            ctaTo="/sports"
            visual="/mirai_sports_image.jpeg"
          />
        </div>
      </section>

      {/* Campus facilities */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader center
            label="World-Class Campus"
            title="A Green Campus Designed for Discovery"
            subtitle="Every space at Mirai has been purpose-built to support a specific kind of learning — from silent study to collaborative creation."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {(facilities.length ? facilities : [
              {id:1,name:'STEM & AI Innovation Labs',description:'Physics, chemistry, biology labs + dedicated AI coding and robotics studio.',icon:'🔬'},
              {id:2,name:'Smart Classrooms',description:'Interactive boards, AR/VR tools, 1 Gbps fibre internet throughout.',icon:'💻'},
              {id:3,name:'Library & Media Centre',description:'15,000+ titles, academic databases, podcast studio.',icon:'📚'},
              {id:4,name:'Arts & Design Studios',description:'Fine arts, ceramics, photography, filmmaking, digital design.',icon:'🎨'},
              {id:5,name:'Performing Arts Centre',description:'Multi-Purpose Auditorium with professional acoustics and full AV.',icon:'🎭'},
              {id:6,name:'Medical & Counselling',description:'24/7 nursing staff, mental health support, and wellbeing programmes.',icon:'🏥'},
            ]).map(f => (
              <div key={f.id} className="bg-white rounded-2xl border p-6 flex gap-4 items-start card-hover"
                   style={{ border:'1.5px solid #F0EDEA' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                     style={{ background:'#F5ECEA' }}>{f.icon}</div>
                <div>
                  <h4 className="font-bold text-sm mb-1" style={{ color:'#1C1917', fontFamily:'var(--font-display)' }}>{f.name}</h4>
                  <p className="text-xs leading-relaxed" style={{ color:'#78716C', fontFamily:'var(--font-body)' }}>{f.description}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Audit §2.4: internal link → campus */}
          <div className="text-center mt-10">
            <Link to="/campus" className="btn btn-outline" style={{ textDecoration:'none' }}>
              View Full Campus →
            </Link>
          </div>
        </div>
      </section>

      {/* Audit §4.4: Trust signals — testimonials */}
      <section className="py-24" style={{ background:'#FAFAF8' }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader center
            label="Student & Parent Reviews"
            title="Why Families Choose Mirai"
            subtitle="Hear directly from parents, graduates, and current students about the Mirai difference."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map(t => <TestCard key={t.id} t={t}/>)}
          </div>
          {/* Audit §4.4: student success callout — internal link */}
          <div className="text-center mt-10">
            <Link to="/about"
              className="btn btn-outline"
              style={{ textDecoration:'none' }}>
              Read Student Success Stories →
            </Link>
          </div>
        </div>
      </section>

      {/* Audit §4.5 + §4.2 + §7.3: Lead generation funnel with "Enroll Now" + "Book Free Demo" + WhatsApp */}
      <LeadMagnet />

      {/* Audit §2.4: internal link → blog */}
      <section className="py-24" style={{ background:'#FAFAF8' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between gap-4 mb-12 flex-wrap">
            <SectionHeader
              label="Career & Education Insights"
              title="School Blog & News"
              subtitle="IB education, skill-based learning, AI careers, and student success."
            />
            <Link to="/blog" className="btn btn-outline" style={{ marginBottom:48, textDecoration:'none' }}>
              View All Articles →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map(p => <BlogCard key={p.id} post={p}/>)}
          </div>
        </div>
      </section>

      {/* Audit §2.5 + §5: FAQ section for rankings + AI SEO */}
      <FAQSection maxItems={6} />

      {/* Main CTA banner */}
      <CTABanner
        label="Admissions 2026–27 Open"
        title="Give Your Child the IB Advantage"
        subtitle="Applications now open. Book a free campus tour and meet our faculty — at no cost."
        primaryText="Enroll Now"
        primaryTo="/student-inquiry#academic-session-header"
        secondaryText="Book Free Demo Class"
        secondaryTo="/contact"
      />
    </>
  )
}
