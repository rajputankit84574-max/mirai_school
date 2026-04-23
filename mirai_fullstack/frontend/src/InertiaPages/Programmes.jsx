import { Link, Head } from '@inertiajs/react'
import { useSEO } from '../hooks/useSEO'
import { META, courseSchema, faqSchema, organizationSchema } from '../utils/seo'
import FAQSection from '../components/FAQSection'
import LeadMagnet from '../components/LeadMagnet'
import ProspectusMagnet from '../components/ProspectusMagnet'
import PageHero from '../components/PageHero'
import SectionHeader from '../components/SectionHeader'
import StatsBanner from '../components/StatsBanner'
import CTABanner from '../components/CTABanner'

import { ProgramCard } from '../components/BrandCard'

const B = '#AA4A44', F = '#77966D'

/* ── Static fallback — shown instantly while API loads ── */
const FALLBACK_PROGRAMS = [
  {
    id:'eyp', icon:'🌸', age_range:'Ages 3–6',
    program_type_display:'Early Years Programme (EYP)',
    description:'The EYP fosters a love for learning through play-based discovery, creativity, and rich social interactions in a nurturing and joyful early childhood environment.',
    highlights_list:['Play-based discovery and exploration','Creativity and imagination building','Social and emotional development','Language and early literacy foundations'],
  },
  {
    id:'pyp', icon:'🌱', age_range:'Ages 6–11',
    program_type_display:'Primary Years Programme (PYP)',
    description:'The PYP nurtures curiosity, collaboration, and independent thinking through inquiry-based, interdisciplinary projects that connect learning to real-world issues.',
    highlights_list:['Inquiry learning across disciplines','Interdisciplinary collaborative projects','Student-led Exhibition each year','Social-emotional wellbeing built in'],
  },
  {
    id:'myp', icon:'🔭', age_range:'Ages 11–16',
    program_type_display:'Middle Years Programme (MYP)',
    description:'The MYP develops critical thinking, global awareness, and personal research skills through real-world connections across 8 subject areas.',
    highlights_list:['Critical thinking and global awareness','8 subject groups with interdisciplinary projects','Personal Project in Grade 10','Community & Service learning'],
  },
  {
    id:'dp', icon:'🎓', age_range:'Ages 16–19',
    program_type_display:'Diploma Programme (DP)',
    description:'The globally recognised IB Diploma opens doors to top universities worldwide through rigorous academics, extended research, and critical theory.',
    highlights_list:['6 subject groups + Theory of Knowledge','Extended Essay (4,000-word research)','Creativity, Activity & Service (CAS)','98% pass rate — avg. score 36.4/45'],
  },
]

const programStats = [
  {value:'98',suffix:'%',label:'IB Diploma Pass Rate'},
  {value:'36.4',suffix:'',label:'Average IB Score (of 45)'},
  {value:'120',suffix:'+',label:'University Pathways'},
  {value:'1:16',suffix:'',label:'Student–Teacher Ratio'},
]

/* 3.5 Learning Methodology */
const methodology = [
  { icon: '🔍', title: 'Inquiry Learning', desc: 'Students are empowered to ask meaningful questions and construct their own understanding through guided exploration.' },
  { icon: '🛠️', title: 'Project-Based Learning', desc: 'Real-world projects challenge students to apply knowledge collaboratively, building critical thinking and creativity.' },
  { icon: '🌿', title: 'Experiential Activities', desc: 'Hands-on experiences inside and outside the classroom connect abstract concepts to lived, practical realities.' },
  { icon: '🪞', title: 'Reflective Thinking', desc: 'Students regularly reflect on their learning journey, fostering metacognition, self-awareness, and continuous growth.' },
]

/* 3.6 Assessment Philosophy */
const assessmentTypes = [
  { icon: '🎤', title: 'Project Presentations', desc: 'Students communicate their research and creative work to peers, teachers, and community audiences.' },
  { icon: '📄', title: 'Research Work', desc: 'Independent and collaborative research projects that develop academic rigour and investigative skills.' },
  { icon: '✅', title: 'Formative Assessments', desc: 'Regular, low-stakes evaluations help teachers give timely feedback and guide every student\'s progress.' },
]

export default function Programmes({ programs }) {
  useSEO(META.programmes, [courseSchema(programs ?? []), organizationSchema()])
  return (
    <>
      <PageHero title="Academic Programmes"
        subtitle="The International Baccalaureate framework, delivered with Mirai's signature experiential approach."
        breadcrumb={[{label:'Academic Programmes'}]}/>

      {/* 3.1 IB Curriculum Overview */}
      <section className="py-20" style={{ background: '#FAFAF8' }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader center label="IB Curriculum Overview" title="A Framework Built for the Whole Learner"
            subtitle="The IB framework at Mirai goes beyond academics — it develops thinkers, communicators, and global citizens." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {[
              { icon: '💡', title: 'Conceptual Learning', desc: 'Students engage with big ideas and transferable concepts that connect knowledge across subjects and disciplines.' },
              { icon: '🔎', title: 'Inquiry-Based Exploration', desc: 'Learning is driven by curiosity. Students analyse, research, and investigate meaningful questions in every unit.' },
              { icon: '🌐', title: 'Interdisciplinary Thinking', desc: 'Subjects are taught in integrated, thematic ways. Students apply knowledge across disciplines to solve real-world problems.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border p-8 flex flex-col gap-4 transition-all hover:shadow-lg hover:-translate-y-1"
                style={{ border: '1.5px solid #F0EDEA' }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{ background: '#F5ECEA' }}>{item.icon}</div>
                <h4 className="font-bold text-lg" style={{ color: '#1C1917', fontFamily: 'var(--font-display)' }}>{item.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: '#78716C', fontFamily: 'var(--font-body)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-base" style={{ color: '#78716C' }}>
            Students learn to <strong>analyse, research, and apply knowledge</strong> in real-world contexts — preparing them for life beyond school.
          </p>
        </div>
      </section>

      {/* 3.2 – 3.4 Programme Cards (EYP, PYP, MYP, DP) */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader center label="Programmes for Every Stage" title="Learning at Every Age"
            subtitle="Each IB programme develops the whole child — academically, personally, and socially." />
          
          <div className="flex justify-center -mt-8 mb-12">
            <ProspectusMagnet />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {((programs && programs.length > 0) ? programs : FALLBACK_PROGRAMS)
              .map(p => <ProgramCard key={p.id} prog={p} />)}
          </div>
        </div>
      </section>

      <StatsBanner stats={programStats} />

      {/* 3.5 Learning Methodology */}
      <section className="py-24" style={{ background: '#FAFAF8' }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader center label="Learning Methodology" title="How We Teach at Mirai"
            subtitle="Mirai integrates four core pedagogical approaches to make learning meaningful, lasting, and transformative." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {methodology.map((m, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 text-center transition-all hover:shadow-xl hover:-translate-y-1"
                style={{ border: '1.5px solid #F0EDEA' }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-5"
                  style={{ background: `linear-gradient(135deg, ${B}15, ${F}15)` }}>{m.icon}</div>
                <h4 className="font-bold text-base mb-3" style={{ color: '#1C1917', fontFamily: 'var(--font-display)' }}>{m.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: '#78716C', fontFamily: 'var(--font-body)' }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3.6 Assessment Philosophy */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="section-label mb-4" style={{ display: 'inline-flex' }}>Assessment Philosophy</div>
              <h2 className="font-display font-800 leading-tight mb-5"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#1C1917' }}>
                Evaluation That Celebrates Growth
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: '#78716C' }}>
                At Mirai, assessment goes beyond grades. Student evaluation is holistic and multidimensional — designed to reflect genuine learning, not just test performance.
              </p>
              <div className="space-y-5">
                {assessmentTypes.map((a, i) => (
                  <div key={i} className="flex items-start gap-5 p-5 bg-stone-50 rounded-2xl border"
                    style={{ border: '1px solid #F0EDEA' }}>
                    <div className="w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center text-xl"
                      style={{ background: '#F5ECEA' }}>{a.icon}</div>
                    <div>
                      <h4 className="font-bold text-sm mb-1" style={{ color: '#1C1917', fontFamily: 'var(--font-display)' }}>{a.title}</h4>
                      <p className="text-sm leading-relaxed" style={{ color: '#78716C', fontFamily: 'var(--font-body)' }}>{a.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden aspect-[4/3] relative shadow-2xl">
              <img src="https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800&q=85&auto=format"
                alt="Students presenting project work at Mirai School"
                className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-sm font-semibold">Authentic assessment through real presentations and research.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection category="programmes" maxItems={5} />
      <LeadMagnet />
      <CTABanner title="Enrol in the IB Programme Today" subtitle="Give your child the international advantage of an IB education at Mirai." />
    </>
  )
}

