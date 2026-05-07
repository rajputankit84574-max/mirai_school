import { useState } from 'react'
import { Head, Link } from '@inertiajs/react'
import PageHero from '../components/PageHero'
import SectionHeader from '../components/SectionHeader'
import CTABanner from '../components/CTABanner'

const B = '#AA4A44', F = '#77966D'

const categoryColors = {
  Achievement:   { bg: `${B}12`, text: B },
  Competition:   { bg: `${F}12`, text: F },
  Announcement: { bg: '#2563EB12', text: '#2563EB' },
  Event:        { bg: '#7C3AED12', text: '#7C3AED' },
  Academics:    { bg: '#D9770612', text: '#D97706' },
}

const newsItems = [
  {
    date: '2026-04-10',
    category: 'Achievement',
    title: 'Mirai Students Win Gold at International Science Olympiad',
    excerpt: 'Three MYP students secured Gold medals at the International Science Olympiad in Singapore, competing against 1,200+ students from 60 countries.',
    image: 'https://images.unsplash.com/photo-1576319155264-99536e0be1ee?w=800&q=75&auto=format',
    featured: true,
  },
  {
    date: '2026-04-05',
    category: 'Competition',
    title: 'Mirai Debate Team Wins State-Level Championship',
    excerpt: 'Our senior debate team clinched first place at the Rajasthan State Debate Championship, with three individual best-speaker awards.',
    image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=75&auto=format',
    featured: false,
  },
  {
    date: '2026-03-28',
    category: 'Announcement',
    title: 'Admissions Open for 2026–27 Academic Year',
    excerpt: 'Applications are now being accepted for all IB programmes (EYP, PYP, MYP) for the upcoming academic session. Limited seats available.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=75&auto=format',
    featured: false,
  },
  {
    date: '2026-03-25',
    category: 'Event',
    title: 'Annual Cultural Festival "Verve 2026" — A Spectacular Success',
    excerpt: 'A three-day celebration of global cultures featured performances, art exhibitions, and culinary experiences representing 35+ nationalities.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=75&auto=format',
    featured: false,
  },
  {
    date: '2026-03-12',
    category: 'Academics',
    title: 'State-of-the-Art AI & Robotics Lab Inaugurated',
    excerpt: 'Industry experts inaugurated Mirai\'s new AI and Robotics Innovation Lab, equipped with advanced tools for machine learning, drone programming, and IoT.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=75&auto=format',
    featured: false,
  },
  {
    date: '2026-03-05',
    category: 'Competition',
    title: 'Robotics Team Qualifies for National Finals',
    excerpt: 'The Mirai Robotics Club has qualified for the National Junior Robotics Championship after winning the regional round with a score of 98/100.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=75&auto=format',
    featured: false,
  },
  {
    date: '2026-02-20',
    category: 'Achievement',
    title: 'Mirai Earns IB World School Accreditation',
    excerpt: 'Mirai Experiential School has received full IB World School status, recognising our commitment to international-standard holistic education.',
    image: 'https://images.unsplash.com/photo-1461280360983-bd93eaa5051b?w=800&q=75&auto=format',
    featured: false,
  },
  {
    date: '2026-02-14',
    category: 'Event',
    title: 'Research Symposium 2026 — Student Innovations on Display',
    excerpt: 'MYP students presented original research projects to faculty, parents, and industry guests, covering topics from climate science to behavioural economics.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=85&auto=format',
    featured: false,
  },
]

const upcomingEvents = [
  { date: 'May 5, 2026',  title: 'PYP Exhibition Day',              desc: 'Final showcase of PYP student inquiry projects for parents and community.' },
  { date: 'May 15, 2026', title: 'Boarding Open House',             desc: 'A guided tour of residential facilities for prospective boarding families.' },
  { date: 'Jun 1, 2026',  title: 'Sports Day & Annual Awards',     desc: 'School-wide athletics day followed by the Sports Awards ceremony.' },
  { date: 'Jun 20, 2026', title: 'Summer Term Orientation',        desc: 'Welcome session for all new students joining the 2026–27 academic year.' },
]

const CATEGORIES = ['All', 'Achievement', 'Competition', 'Announcement', 'Event', 'Academics']

const fmt = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })

export default function News() {
  const [active, setActive] = useState('All')

  const featured = newsItems.find(n => n.featured)
  const rest = newsItems.filter(n => !n.featured && (active === 'All' || n.category === active))

  return (
    <>
      <Head>
        <title>News & Events | Mirai Experiential School</title>
        <meta name="description" content="Latest achievements, student competitions, announcements, and upcoming events at Mirai Experiential School." />
      </Head>

      <PageHero
        title="News & Events"
        subtitle="Latest achievements, student competitions, announcements, and upcoming events at Mirai Experiential School."
        breadcrumb={[{ label: 'News & Media' }, { label: 'News & Events' }]}
      />

      {/* ── Featured Story ────────────────────────────────────────────── */}
      {featured && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="section-label mb-6" style={{ display: 'inline-flex' }}>Featured Story</div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white rounded-3xl overflow-hidden border shadow-xl"
              style={{ border: '1.5px solid #F0EDEA' }}>
              <div className="aspect-[4/3] overflow-hidden relative">
                <img src={featured.image} alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(20,10,8,0.35) 0%, transparent 60%)' }} />
                <div className="absolute top-5 left-5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-white"
                  style={{ background: B }}>
                  {featured.category}
                </div>
              </div>
              <div className="p-10 lg:pr-14">
                <div className="text-xs font-medium mb-3" style={{ color: '#A8A29E' }}>{fmt(featured.date)}</div>
                <h2 className="font-display font-800 leading-tight mb-4"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.5rem,2.5vw,2rem)', color: '#1C1917' }}>
                  {featured.title}
                </h2>
                <p className="text-base leading-relaxed mb-8" style={{ color: '#78716C' }}>{featured.excerpt}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Category Filter + News Grid ───────────────────────────────── */}
      <section className="py-16" style={{ background: '#FAFAF8' }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader label="Latest Updates" title="Mirai in the Spotlight"
            subtitle="Celebrating our community's achievements, competitions, and announcements." />

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mt-8 mb-10">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActive(cat)}
                className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
                style={{
                  background: active === cat ? B : 'white',
                  color: active === cat ? 'white' : '#78716C',
                  border: `1.5px solid ${active === cat ? B : '#E7E5E3'}`,
                  fontFamily: 'var(--font-display)',
                }}>
                {cat}
              </button>
            ))}
          </div>

          {/* News cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {rest.map((item, i) => {
              const cc = categoryColors[item.category] || { bg: `${B}10`, text: B }
              return (
                <div key={i} className="bg-white rounded-2xl overflow-hidden border transition-all hover:shadow-xl hover:-translate-y-1"
                  style={{ border: '1.5px solid #F0EDEA' }}>
                  <div className="aspect-[16/9] relative overflow-hidden">
                    <img src={item.image} alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy" decoding="async" />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                      style={{ background: cc.bg, color: cc.text, backdropFilter: 'blur(4px)' }}>
                      {item.category}
                    </div>
                  </div>
                  <div className="p-7">
                    <div className="text-xs font-medium mb-2" style={{ color: '#A8A29E' }}>{fmt(item.date)}</div>
                    <h3 className="font-display font-800 text-lg leading-snug mb-3"
                      style={{ color: '#1C1917', fontFamily: 'var(--font-display)', fontWeight: 800 }}>{item.title}</h3>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: '#78716C' }}>{item.excerpt}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Upcoming Events ───────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader center label="Upcoming Events" title="What's Coming Up at Mirai"
            subtitle="Mark your calendars — exciting events, open days, and celebrations are just around the corner." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {upcomingEvents.map((ev, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border transition-all hover:shadow-xl hover:-translate-y-1"
                style={{ border: '1.5px solid #F0EDEA' }}>
                <div className="h-1.5" style={{ background: i % 2 === 0 ? B : F }} />
                <div className="p-7">
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
                    style={{ background: i % 2 === 0 ? `${B}10` : `${F}10`, color: i % 2 === 0 ? B : F }}>
                    📅 {ev.date}
                  </div>
                  <h4 className="font-display font-800 text-base mb-2"
                    style={{ color: '#1C1917', fontFamily: 'var(--font-display)', fontWeight: 800 }}>{ev.title}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: '#78716C' }}>{ev.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Stay Connected with Mirai"
        subtitle="Follow our journey of excellence, innovation, and community. Apply now and be part of the Mirai story."
        primaryText="Enroll Now"
        primaryTo="/student-inquiry#academic-session-header"
        secondaryText="Book a Campus Visit"
        secondaryTo="/contact"
      />
    </>
  )
}
