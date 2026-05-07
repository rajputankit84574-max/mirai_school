import { Link, Head } from '@inertiajs/react'

const B = '#AA4A44', F = '#77966D'

/* Section 2 – Sports Facilities */
const facilities = [
  { icon: '⚽', title: 'Futsal', desc: 'Indoor all-weather futsal court with professional-grade flooring, goal posts, and team training zones.' },
  { icon: '🏏', title: 'Box Cricket', desc: 'Enclosed box cricket arena for high-energy, fast-format cricket matches and coaching drills.' },
  { icon: '🏀', title: 'Basketball', desc: 'Full-size indoor basketball courts with seating, professional hoops, and coaching facilities.' },
  { icon: '🏓', title: 'Pickleball', desc: 'Dedicated pickleball courts — one of the fastest-growing sports globally, now at Mirai.' },
  { icon: '🏸', title: 'Badminton', desc: 'International-standard indoor badminton courts with sprung flooring and synthetic shuttle training.' },
]

/* Section 3 – Martial Arts & Combat Sports */
const martialArts = [
  { icon: '🥋', title: 'Taekwondo', desc: 'WTF-compliant taekwondo programme with belt grading, sparring, and national competition pathways.' },
  { icon: '🛡️', title: 'Self-Defence Training', desc: 'Practical self-defence techniques rooted in situational awareness, confidence, and personal safety.' },
  { icon: '🥊', title: 'Boxing', desc: 'Technical boxing training covering stance, footwork, combinations, and mental toughness under certified coaches.' },
  { icon: '🗡️', title: 'Fencing', desc: 'Olympic-style fencing with foil, épée, and sabre disciplines, including inter-school tournaments.' },
]

/* Section 4 – Indoor Sports */
const indoorSports = [
  { icon: '🏓', title: 'Table Tennis', desc: 'State-of-the-art TT facility with competition-grade tables, floor mats, and robot training units.' },
  { icon: '♟️', title: 'Chess', desc: 'Rated chess club, coaching sessions, and school-wide tournaments to build strategic thinking and focus.' },
  { icon: '🎯', title: 'Shooting', desc: 'Air rifle and pistol shooting range with certified range safety officers and national competition preparation.' },
]

/* Section 5 – Fitness & Movement */
const fitnessActivities = [
  { icon: '💃', title: 'Aerobics', desc: 'High-energy aerobics classes promoting cardiovascular health, coordination, and fun group fitness.' },
  { icon: '🛼', title: 'Skating', desc: 'Indoor skating rink for recreational and competitive skaters, with balance training for all levels.' },
  { icon: '🏋️', title: 'Physical Conditioning', desc: 'Structured strength and conditioning programme tailored by age and sport to maximise athletic potential.' },
]

const sportsStats = [
  { value: '20', suffix: '+', label: 'Sports Disciplines' },
  { value: 'Best', suffix: '', label: 'Trained Coaches' },
  { value: 'Remarkable', suffix: '', label: 'State & National Medals' },
  { value: 'A+',  suffix: '',  label: 'Sports Academies' },
]

export default function Sports() {
  return (
    <>
      <Head>
        <title>Sports & Athletics | World-Class Facilities at Mirai</title>
        <meta name="description" content="20+ sports disciplines, professional coaching, and elite sports academies — because physical excellence and academic achievement go hand in hand at Mirai." />
      </Head>
      <PageHero
        title="Sports & Athletics"
        subtitle="We believe a healthy body and a disciplined mind are inseparable. Sports at Mirai are central to who we are."
        breadcrumb={[{ label: 'Campus & Life' }, { label: 'Sports & Athletics' }]}
      />

      {/* ── Section 1: Sports Philosophy ────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="section-label mb-4" style={{ display: 'inline-flex' }}>Sports Philosophy</div>
              <h2 className="font-display font-800 leading-tight mb-5"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.8rem,3vw,2.6rem)', color: '#1C1917' }}>
                Sport as an Extension of Education
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: '#78716C' }}>
                At Mirai, sport is not a break from learning — it is a vehicle for it. Every physical activity is designed to integrate with our academic ethos, building qualities that extend far beyond the field or court.
              </p>
              <p className="text-base leading-relaxed mb-10" style={{ color: '#78716C' }}>
                Our coaching philosophy centres on holistic athlete development — where physical skill is developed alongside character, resilience, and a commitment to fair play.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {[
                  { icon: '⚡', title: 'Discipline', desc: 'Structured training builds the habits of consistency, punctuality, and personal accountability.' },
                  { icon: '💪', title: 'Resilience', desc: 'Sports teach students to face setbacks, lose gracefully, and come back stronger.' },
                  { icon: '🤝', title: 'Teamwork', desc: 'Collective goals and shared victories forge bonds and communication skills for life.' },
                ].map((val, i) => (
                  <div key={i} className="p-6 rounded-2xl text-center transition-all hover:shadow-lg hover:-translate-y-1 bg-white"
                    style={{ border: '1.5px solid #F0EDEA' }}>
                    <div className="text-3xl mb-3">{val.icon}</div>
                    <h4 className="font-display font-800 text-base mb-2"
                      style={{ color: '#1C1917', fontFamily: 'var(--font-display)', fontWeight: 800 }}>{val.title}</h4>
                    <p className="text-xs leading-relaxed" style={{ color: '#78716C' }}>{val.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden aspect-[4/3] relative shadow-2xl">
              <img src="/mirai_playground4_image.jpeg"
                alt="Students engaged in high-performance sports training at Mirai campus"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(20,10,8,0.5) 0%, transparent 60%)' }} />
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg">
                <p className="text-xs font-bold" style={{ color: '#1C1917' }}>20+ Sports Disciplines</p>
                <p className="text-xs mt-0.5" style={{ color: '#78716C' }}>Integrated with the IB curriculum</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsBanner stats={sportsStats} />

      {/* ── Section 2: Sports Facilities ─────────────────────────────── */}
      <section className="py-24" style={{ background: '#FAFAF8' }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader center label="Sports Facilities" title="Courts, Fields & Arenas Built for Champions"
            subtitle="Students have access to world-class infrastructure across a wide range of sports disciplines." />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mt-12">
            {facilities.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 text-center transition-all hover:shadow-xl hover:-translate-y-1 group"
                style={{ border: '1.5px solid #F0EDEA' }}>
                <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center text-3xl mb-5 transition-colors"
                  style={{ background: i % 2 === 0 ? `${B}10` : `${F}10` }}>
                  {f.icon}
                </div>
                <h4 className="font-display font-800 text-base mb-3"
                  style={{ color: '#1C1917', fontFamily: 'var(--font-display)', fontWeight: 800 }}>{f.title}</h4>
                <p className="text-xs leading-relaxed" style={{ color: '#78716C' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Martial Arts & Combat Sports ──────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: '#1C1917' }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: `radial-gradient(circle at 20% 50%, ${B} 0%, transparent 50%), radial-gradient(circle at 80% 50%, ${F} 0%, transparent 50%)` }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeader center label="Martial Arts & Combat Sports" title="Discipline. Precision. Courage." light
            subtitle="Our combat sports programme builds mental fortitude, physical conditioning, and deep self-confidence." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {martialArts.map((m, i) => (
              <div key={i} className="rounded-2xl p-8 transition-all duration-300 hover:scale-[1.03]"
                style={{ background: '#262220', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6"
                  style={{ background: i % 2 === 0 ? `${B}30` : `${F}30` }}>
                  {m.icon}
                </div>
                <h4 className="font-display font-800 text-xl mb-3"
                  style={{ color: 'white', fontFamily: 'var(--font-display)', fontWeight: 800 }}>{m.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: '#A8A29E' }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: Indoor Sports ──────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="rounded-3xl overflow-hidden aspect-[4/3] relative shadow-2xl">
              <img src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=85&auto=format"
                alt="Indoor sports at Mirai — table tennis, chess, shooting"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(20,10,8,0.5) 0%, transparent 60%)' }} />
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg">
                <p className="text-xs font-bold" style={{ color: '#1C1917' }}>Indoor Sports Centre</p>
                <p className="text-xs mt-0.5" style={{ color: '#78716C' }}>Year-round, all-weather facilities</p>
              </div>
            </div>
            <div>
              <div className="section-label mb-4" style={{ display: 'inline-flex' }}>Indoor Sports</div>
              <h2 className="font-display font-800 leading-tight mb-5"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.8rem,3vw,2.6rem)', color: '#1C1917' }}>
                Strategy, Focus & Precision
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: '#78716C' }}>
                Indoor sports develop concentration, patience, and strategic thinking — qualities as valuable in the boardroom as they are on the scoreboard. Every student has access to dedicated indoor facilities year-round.
              </p>
              <div className="space-y-5">
                {indoorSports.map((sport, i) => (
                  <div key={i} className="flex items-start gap-5 p-6 rounded-2xl transition-all hover:shadow-md bg-white"
                    style={{ border: '1px solid #F0EDEA' }}>
                    <div className="w-14 h-14 flex-shrink-0 rounded-xl flex items-center justify-center text-2xl"
                      style={{ background: i % 2 === 0 ? `${B}10` : `${F}10` }}>
                      {sport.icon}
                    </div>
                    <div>
                      <h4 className="font-display font-800 text-base mb-1"
                        style={{ color: '#1C1917', fontFamily: 'var(--font-display)', fontWeight: 800 }}>{sport.title}</h4>
                      <p className="text-sm leading-relaxed" style={{ color: '#78716C' }}>{sport.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 5: Fitness & Movement ───────────────────────────── */}
      <section className="py-24" style={{ background: '#FAFAF8' }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader center label="Fitness & Movement" title="Every Body in Motion"
            subtitle="Physical conditioning and movement form the foundation of every athlete's journey at Mirai." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {fitnessActivities.map((activity, i) => (
              <div key={i} className="rounded-2xl overflow-hidden bg-white transition-all hover:shadow-xl hover:-translate-y-1"
                style={{ border: '1.5px solid #F0EDEA' }}>
                <div className="h-2 w-full"
                  style={{ background: i === 0 ? B : i === 1 ? F : `linear-gradient(90deg, ${B}, ${F})` }} />
                <div className="p-8">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6"
                    style={{ background: i % 2 === 0 ? `${B}10` : `${F}10` }}>
                    {activity.icon}
                  </div>
                  <h4 className="font-display font-800 text-xl mb-3"
                    style={{ color: '#1C1917', fontFamily: 'var(--font-display)', fontWeight: 800 }}>{activity.title}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: '#78716C' }}>{activity.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Philosophy strip */}
          <div className="mt-14 p-8 rounded-2xl text-center"
            style={{ background: `linear-gradient(135deg, ${B}08, ${F}08)`, border: `1.5px solid ${F}20` }}>
            <p className="text-lg font-display font-800 mb-2" style={{ color: '#1C1917', fontFamily: 'var(--font-display)' }}>
              Fitness is not a programme — it is a lifestyle at Mirai.
            </p>
            <p className="text-sm" style={{ color: '#78716C' }}>
              Every student participates in structured physical education integrated with their academic timetable.
            </p>
          </div>
        </div>
      </section>

      <CTABanner
        title="Train Like a Champion at Mirai"
        subtitle="Combine world-class academic and sporting excellence under one roof. Scholarships available for promising athletes."
        primaryText="Enroll Now"
        primaryTo="/student-inquiry#academic-session-header"
        secondaryText="Book Free Campus Visit"
        secondaryTo="/contact"
      />
    </>
  )
}

