import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useBlogPost } from '../api'
import { useSEO } from '../hooks/useSEO'
import { articleSchema, organizationSchema } from '../utils/seo'
import LoadingSpinner from '../components/LoadingSpinner'

const B = '#AA4A44', F = '#77966D'
const RELATED_IMG = 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=75&auto=format'

/* ── Full fallback posts — used when API 404s or is slow ── */
const FALLBACK_DETAIL = {
  'benefits-of-residential-school-education': {
    title: '10 Powerful Benefits of Residential School Education for Students',
    meta_title: '10 Powerful Benefits of Residential School Education for Students',
    meta_description: 'Residential schooling offers students an environment that nurtures academic growth, independence, and personal development.',
    excerpt: 'Residential schooling offers students an environment that nurtures academic growth, independence, and personal development.',
    image: 'https://images.unsplash.com/photo-1560785496-3c9d27877182?w=1400&q=80&auto=format',
    author: 'Mirai Admissions Team',
    published_date: '2025-04-10',
    views: 1024,
    category: { name: 'Residential School', slug: 'campus-life' },
    content: `Residential schooling offers students an environment that nurtures academic growth, independence, and personal development. Schools like Mirai Experiential School provide structured residential life where students learn responsibility, discipline, and collaboration while receiving high-quality education.\n\nKey Benefits\n\n1. Independence and Self-Reliance\nStudents learn to manage their daily routines, responsibilities, and time effectively.\n\n2. Strong Academic Focus\nResidential students have supervised study hours and structured learning schedules.\n\n3. Holistic Development\nStudents participate in academics, sports, arts, and leadership activities every day.\n\n4. Strong Peer Relationships\nLiving together creates lifelong friendships and social confidence.\n\n5. Structured Daily Routine\nResidential schools promote healthy habits including study time, sports, and recreation.\n\n6. Access to Facilities\nStudents can use sports fields, libraries, and labs even after school hours.\n\nConclusion\nResidential education builds confident and responsible individuals who are prepared to face global challenges.`,
  },
  'what-is-experiential-learning': {
    title: 'What is Experiential Learning?',
    meta_title: 'Experiential Learning: The Future of Modern Education',
    meta_description: 'Experiential learning is an educational approach where students learn through hands-on experiences, projects, and real-world activities.',
    excerpt: 'Experiential learning is an educational approach where students learn through hands-on experiences, projects, and real-world activities.',
    image: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=1400&q=80&auto=format',
    author: 'Mirai Academic Team',
    published_date: '2025-05-05',
    views: 1542,
    category: { name: 'Experiential Learning', slug: 'experiential-learning' },
    content: `Experiential learning is an educational approach where students learn through hands-on experiences, projects, and real-world activities rather than passive memorization. At Mirai Experiential School, experiential learning is integrated into daily classroom practices.\n\nKey Principles\n\nLearning by Doing: Students engage in experiments, field activities, and projects.\n\nReflection and Analysis: Students analyse their experiences to understand concepts deeply.\n\nCollaboration: Group projects promote teamwork and communication.\n\nReal-World Relevance: Students connect academic knowledge with real-life situations.\n\nBenefits of Experiential Learning\n• improves critical thinking\n• encourages creativity\n• increases student engagement\n• strengthens problem-solving skills\n\nConclusion\nExperiential learning prepares students for a future where innovation and adaptability are essential.`,
  },
  'advantages-of-ib-curriculum': {
    title: 'Advantages of the IB Curriculum',
    meta_title: 'Top Advantages of the IB Curriculum for Modern Students',
    meta_description: 'The International Baccalaureate (IB) curriculum is globally respected for its emphasis on critical thinking, inquiry-based learning, and global awareness.',
    excerpt: 'The International Baccalaureate (IB) curriculum is globally respected for its emphasis on critical thinking, inquiry-based learning, and global awareness.',
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1400&q=80&auto=format',
    author: 'Mirai Academic Team',
    published_date: '2025-06-28',
    views: 986,
    category: { name: 'IB Curriculum', slug: 'experiential-learning' },
    content: `The International Baccalaureate (IB) curriculum is globally respected for its emphasis on critical thinking, inquiry-based learning, and global awareness. Schools like Mirai Experiential School implement IB programmes to develop well-rounded students ready for international opportunities.\n\nKey Advantages\n\nGlobal Recognition: IB qualifications are recognized by universities worldwide.\n\nInquiry-Based Learning: Students explore ideas through questioning and investigation.\n\nSkill Development: IB focuses on research, communication, and collaboration.\n\nInternational Mindedness: Students learn about cultures, global issues, and diversity.\n\nBalanced Education: IB programmes integrate academics, arts, and physical education.\n\nConclusion\nThe IB curriculum equips students with the skills required for higher education and global careers.`,
  },
  'why-sports-are-essential-in-schools': {
    title: 'Importance of Sports in Education',
    meta_title: 'Why Sports Are Essential for Student Development',
    meta_description: 'Sports play a vital role in shaping students’ physical health, confidence, and character.',
    excerpt: 'Sports play a vital role in shaping students’ physical health, confidence, and character.',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1400&q=80&auto=format',
    author: 'Mirai Sports Department',
    published_date: '2025-07-20',
    views: 1120,
    category: { name: 'Sports & Athletics', slug: 'sports-athletics' },
    content: `Sports play a vital role in shaping students’ physical health, confidence, and character. At Mirai Experiential School, sports are integrated into the school culture to ensure balanced development.\n\nKey Benefits\n\nPhysical Fitness: Sports improve strength, stamina, and overall health.\n\nTeamwork and Leadership: Students learn collaboration, discipline, leadership through team sports.\n\nMental Wellbeing: Physical activity reduces stress and improves concentration.\n\nConfidence Building: Participation in competitions enhances self-esteem.\n\nTime Management: Balancing academics and sports teaches responsibility.\n\nConclusion\nSports education is essential for developing resilient, confident, and healthy students.`,
  },
  'boarding-school-vs-day-school': {
    title: 'Boarding School vs Day School',
    meta_title: 'Boarding School vs Day School: Which is Better for Your Child?',
    meta_description: 'Parents often wonder whether a boarding school or a day school is the right choice for their child.',
    excerpt: 'Parents often wonder whether a boarding school or a day school is the right choice for their child.',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1400&q=80&auto=format',
    author: 'Mirai Admissions Team',
    published_date: '2025-03-15',
    views: 1340,
    category: { name: 'Boarding School vs Day School', slug: 'campus-life' },
    content: `Parents often wonder whether a boarding school or a day school is the right choice for their child. Both options have unique benefits. Schools like Mirai Experiential School offer both day schooling and residential learning opportunities.\n\nBoarding School Advantages\n• independence and discipline\n• structured study environment\n• stronger peer relationships\n• access to campus facilities\n\nDay School Advantages\n• close family interaction\n• flexible routines\n• lower residential costs\n\nChoosing the Right Option\nParents should consider child’s personality, academic goals, and family preferences.\n\nConclusion\nBoth options provide valuable learning experiences, but residential education often offers greater independence and holistic development.`,
  },
  '21st-century-skills': {
    title: 'Essential Skills Students Need for the 21st Century',
    meta_title: 'Essential Skills Students Need for the 21st Century',
    meta_description: 'The world is changing rapidly. To succeed, students must develop a wide range of skills beyond academic knowledge.',
    excerpt: 'The world is changing rapidly. To succeed, students must develop a wide range of skills beyond academic knowledge.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1400&q=80&auto=format',
    author: 'Mirai Academic Team',
    published_date: '2025-08-05',
    views: 890,
    category: { name: 'Essential Skills', slug: 'experiential-learning' },
    content: `The world is changing rapidly due to technological advancement and globalization. To succeed in this dynamic environment, students must develop a wide range of skills beyond academic knowledge.\n\nKey Skills for Modern Students\n\nCritical Thinking: Students must learn how to analyze information, evaluate arguments, and make informed decisions.\n\nCreativity: Creative thinking encourages innovation and problem solving.\n\nCommunication: Clear communication skills are essential in academic and professional environments.\n\nCollaboration: Teamwork helps students learn to work effectively with diverse groups.\n\nDigital Literacy: Technology is integrated into nearly every field, making digital skills essential.\n\nAt Mirai Experiential School, education focuses on developing these future-ready skills alongside strong academic foundations.`,
  },
  'residential-schools-independence': {
    title: 'How Residential Schools Help Students Become Independent',
    meta_title: 'How Residential Schools Help Students Become Independent',
    meta_description: 'Residential schools provide an environment where students develop independence and self-confidence.',
    excerpt: 'Residential schools provide an environment where students develop independence and self-confidence.',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1400&q=80&auto=format',
    author: 'Mirai Community Team',
    published_date: '2025-09-25',
    views: 745,
    category: { name: 'Residential Schools', slug: 'campus-life' },
    content: `Residential schools provide an environment where students develop independence and self-confidence. Living on campus encourages students to manage their time, responsibilities, and daily routines.\n\nLife Skills Learned in Residential Schools\n\nTime Management: Students learn to balance academics, sports, and personal responsibilities.\n\nResponsibility: Students manage their belongings, schedules, and commitments.\n\nSocial Development: Living with peers improves communication and collaboration skills.\n\nResidential programmes at Mirai Experiential School provide a structured environment that supports both academic growth and personal development.`,
  },
  'inquiry-based-learning-explained': {
    title: 'Inquiry Based Learning Explained',
    meta_title: 'Inquiry Based Learning Explained',
    meta_description: 'Inquiry-based learning is an educational approach where students learn by asking questions and discovering answers.',
    excerpt: 'Inquiry-based learning is an educational approach where students learn by asking questions and discovering answers.',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=1400&q=80&auto=format',
    author: 'Mirai Academic Team',
    published_date: '2025-10-18',
    views: 812,
    category: { name: 'Curiosity-Driven Education', slug: 'experiential-learning' },
    content: `Inquiry-based learning is an educational approach where students learn by asking questions, investigating problems, and discovering answers. Rather than simply receiving information, students actively participate in the learning process.\n\nKey Features\n• student curiosity drives learning\n• teachers act as facilitators\n• students research and explore ideas\n\nBenefits\n• deeper understanding of concepts\n• improved problem-solving skills\n• stronger academic engagement\n\nInquiry-based education helps students become independent thinkers.`,
  },
  'importance-of-holistic-education': {
    title: 'Importance of Holistic Education',
    meta_title: 'Importance of Holistic Education',
    meta_description: 'Holistic education focuses on the complete development of students, including intellectual, emotional, and social growth.',
    excerpt: 'Holistic education focuses on the complete development of students, including intellectual, emotional, and social growth.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1400&q=80&auto=format',
    author: 'Mirai Academic Team',
    published_date: '2025-11-10',
    views: 654,
    category: { name: 'Holistic Education', slug: 'experiential-learning' },
    content: `Holistic education focuses on the complete development of students, including intellectual, emotional, physical, and social growth.\n\nElements of Holistic Education\n• academic learning\n• sports and physical fitness\n• arts and creativity\n• emotional development\n\nSchools like Mirai Experiential School emphasize holistic development to prepare students for life beyond academics.`,
  },
  'boarding-schools-shape-leadership': {
    title: 'How Boarding Schools Shape Future Leaders',
    meta_title: 'How Boarding Schools Shape Future Leaders',
    meta_description: 'Boarding schools provide students with opportunities to develop leadership skills in multiple environments.',
    excerpt: 'Boarding schools provide students with opportunities to develop leadership skills in multiple environments.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1400&q=80&auto=format',
    author: 'Mirai Community Team',
    published_date: '2025-12-02',
    views: 789,
    category: { name: 'Future Leaders', slug: 'campus-life' },
    content: `Boarding schools provide students with opportunities to develop leadership skills in academic, sports, and social environments.\n\nLeadership Opportunities\n• student councils\n• team leadership in sports\n• community initiatives\n\nStudents learn to make decisions, take responsibility, and inspire others.`,
  },
  'role-of-arts-student-development': {
    title: 'The Role of Arts in Student Development',
    meta_title: 'The Role of Arts in Student Development',
    meta_description: 'Arts education helps students develop creativity, imagination, and emotional expression.',
    excerpt: 'Arts education helps students develop creativity, imagination, and emotional expression.',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1400&q=80&auto=format',
    author: 'Mirai Creative Team',
    published_date: '2026-01-25',
    views: 532,
    category: { name: 'Student Development', slug: 'campus-life' },
    content: `Arts education helps students develop creativity, imagination, and emotional expression.\n\nBenefits of Arts education\n• improves creativity\n• strengthens communication skills\n• builds confidence\n\nStudents participating in music, dance, theatre, and visual arts develop well-rounded personalities.`,
  },
  'how-schools-develop-critical-thinking': {
    title: 'How Schools Develop Critical Thinking Skills',
    meta_title: 'How Schools Develop Critical Thinking Skills',
    meta_description: 'Critical thinking helps students evaluate information, analyse situations, and solve problems.',
    excerpt: 'Critical thinking helps students evaluate information, analyse situations, and solve problems.',
    image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=1400&q=80&auto=format',
    author: 'Mirai Academic Team',
    published_date: '2026-02-18',
    views: 941,
    category: { name: 'Critical Thinking Skills', slug: 'experiential-learning' },
    content: `Critical thinking helps students evaluate information, analyse situations, and solve problems.\n\nTeaching Strategies\n• project-based learning\n• debates and discussions\n• research activities\n\nThese methods encourage students to think independently and creatively.`,
  },
  'how-technology-enhances-education': {
    title: 'How Technology Enhances Modern Education',
    meta_title: 'How Technology Enhances Modern Education',
    meta_description: 'Technology has transformed education by making learning more interactive and accessible.',
    excerpt: 'Technology has transformed education by making learning more interactive and accessible.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1400&q=80&auto=format',
    author: 'Mirai Tech Team',
    published_date: '2026-03-10',
    views: 823,
    category: { name: 'Modern Education', slug: 'experiential-learning' },
    content: `Technology has transformed education by making learning more interactive and accessible.\n\nExamples of Technology in Education\n• smart classrooms\n• digital learning platforms\n• online research resources\n\nTechnology enables personalized learning and improves student engagement.`,
  },
  'preparing-students-for-global-universities': {
    title: 'Preparing Students for Global Universities',
    meta_title: 'Preparing Students for Global Universities',
    meta_description: 'Students aspiring to study abroad must develop strong academic and personal skills.',
    excerpt: 'Students aspiring to study abroad must develop strong academic and personal skills.',
    image: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=1400&q=80&auto=format',
    author: 'Mirai Admissions Team',
    published_date: '2026-04-05',
    views: 1560,
    category: { name: 'Global Universities', slug: 'global-exposure', },
    content: `Students aspiring to study abroad must develop strong academic and personal skills.\n\nImportant Preparation Areas\n• research skills\n• independent learning\n• communication skills\n• international awareness\n\nSchools that emphasize inquiry and global perspectives help students succeed in international universities.`,
  },
  'best-curriculum-global-education': {
    title: 'Choosing the Best Curriculum for Global Education Success',
    meta_title: 'Choosing the Best Curriculum for Global Education Success',
    meta_description: 'Parents today look for education systems that prepare students for global opportunities.',
    excerpt: 'Parents today look for education systems that prepare students for global opportunities.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1400&q=80&auto=format',
    author: 'Mirai Academic Team',
    published_date: '2025-01-01',
    views: 670,
    category: { name: 'Best Curriculum', slug: 'global-exposure' },
    content: `Parents today look for education systems that prepare students for global opportunities.\n\nInternational curricula emphasize:\n• critical thinking\n• interdisciplinary learning\n• global awareness\n\nThese approaches ensure that students develop both academic knowledge and essential life skills.`,
  },
  'benefits-of-multidisciplinary-learning': {
    title: 'Benefits of Multidisciplinary Learning',
    meta_title: 'Benefits of Multidisciplinary Learning',
    meta_description: 'Multidisciplinary learning connects different subjects to create deeper understanding.',
    excerpt: 'Multidisciplinary learning connects different subjects to create deeper understanding.',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1400&q=80&auto=format',
    author: 'Mirai Academic Team',
    published_date: '2024-12-25',
    views: 540,
    category: { name: 'Multidisciplinary Learning', slug: 'experiential-learning' },
    content: `Multidisciplinary learning connects different subjects to create deeper understanding.\n\nFor example:\n• science combined with technology\n• mathematics applied to real-world problems\n• history connected with geography\n\nThis approach encourages creativity and practical problem solving.`,
  },
  'why-parents-prefer-international-schools': {
    title: 'Why Parents Prefer International Schools',
    meta_title: 'Why Parents Prefer International Schools',
    meta_description: 'International schools offer a learning environment that prepares students for global opportunities.',
    excerpt: 'International schools offer a learning environment that prepares students for global opportunities.',
    image: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1400&q=80&auto=format',
    author: 'Mirai Admissions Team',
    published_date: '2024-11-18',
    views: 1205,
    category: { name: 'Global Exposure', slug: 'global-exposure' },
    content: `International schools offer a learning environment that prepares students for global opportunities.\n\nKey Advantages\n• internationally recognized curriculum\n• focus on critical thinking\n• global exposure\n\nParents value these institutions for their balanced approach to education.`,
  },
  'building-confidence-through-education': {
    title: 'How Education Builds Confidence in Children',
    meta_title: 'How Education Builds Confidence in Children',
    meta_description: 'Confidence is an essential trait that helps children succeed academically and socially.',
    excerpt: 'Confidence is an essential trait that helps children succeed academically and socially.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&q=80&auto=format',
    author: 'Mirai Academic Team',
    published_date: '2024-10-10',
    views: 932,
    category: { name: 'Dynamic Education', slug: 'campus-life' },
    content: `Confidence is an essential trait that helps children succeed academically and socially.\n\nWays Schools Build Confidence\n• encouraging participation\n• providing leadership opportunities\n• celebrating student achievements\n\nSupportive learning environments help students believe in their abilities.`,
  },
}

/* ── Loading skeleton ── */
function BlogSkeleton() {
  return (
    <div style={{ paddingTop: 160, minHeight: '100vh', background: '#FAFAF8' }}>
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div style={{ height: 12, width: '30%', background: '#E7E4E0', borderRadius: 99, marginBottom: 20 }} />
        <div style={{ height: 36, width: '90%', background: '#E7E4E0', borderRadius: 8, marginBottom: 12 }} />
        <div style={{ height: 36, width: '70%', background: '#E7E4E0', borderRadius: 8, marginBottom: 32 }} />
        {[100, 90, 95, 85, 100].map((w, i) => (
          <div key={i} style={{ height: 14, width: `${w}%`, background: '#EDEBE8', borderRadius: 99, marginBottom: 12 }} />
        ))}
      </div>
    </div>
  )
}

export default function BlogDetail() {
  const { slug } = useParams()
  const { data, isLoading, isError } = useBlogPost(slug)

  const post = data?.post ?? (isError || (!isLoading && !data?.post) ? FALLBACK_DETAIL[slug] ?? null : null)
  const related = data?.related ?? []

  useSEO(
    post ? {
      title: `${post.meta_title || post.title} | Mirai School`,
      description: post.meta_description || post.excerpt,
    } : null,
    [articleSchema(post), organizationSchema()]
  )

  if (isLoading && !post) return <BlogSkeleton />
  if (!post) return (
    <div className="pt-40 text-center min-h-screen" style={{ background: '#FAFAF8' }}>
      <div className="text-5xl mb-4">📝</div>
      <h2 className="font-display text-2xl font-bold mb-3" style={{ color: '#1C1917' }}>Post not found</h2>
      <p className="text-sm mb-8" style={{ color: '#A8A29E' }}>This article may have moved or been unpublished.</p>
      <Link to="/blog" className="btn btn-primary" style={{ textDecoration: 'none' }}>← Back to Blog</Link>
    </div>
  )

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-44 pb-20 text-center"
               style={{ background: 'linear-gradient(145deg, #2D1210 0%, #7A2E2A 50%, #AA4A44 100%)' }}>
        {/* Dynamic Background Image */}
        {post.image && (
          <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay" />
        )}
        <div className="absolute inset-0 opacity-10"
             style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-3xl mx-auto px-6">
          <div className="flex items-center justify-center gap-2 mb-5 text-xs" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)' }}>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>›</span>
            <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span>›</span>
            <span style={{ color: 'rgba(255,255,255,0.85)' }}>{post.title.slice(0, 40)}…</span>
          </div>
          {post.category && (
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
                  style={{ background: 'rgba(255,255,255,0.15)', color: 'white', fontFamily: 'var(--font-display)' }}>
              {post.category.name}
            </span>
          )}
          <h1 className="font-display font-900 text-white leading-tight mb-4"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2rem,5vw,3.5rem)' }}>
            {post.title}
          </h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}>
            By {post.author} · {new Date(post.published_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} · {post.views ?? '--'} views
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-6">
          <div className="rounded-2xl p-6 mb-8" style={{ background: '#FAFAF8', borderLeft: `4px solid ${B}` }}>
            <p className="text-base italic leading-relaxed" style={{ color: '#44403C', fontFamily: 'var(--font-body)' }}>{post.excerpt}</p>
          </div>
          {post.content.split('\n\n').map((para, i) => (
            <p key={i} className="leading-[1.95] mb-5 text-base" style={{ color: '#44403C', fontFamily: 'var(--font-body)' }}>{para}</p>
          ))}
          <div className="mt-10 pt-8" style={{ borderTop: '1px solid #F0EDEA' }}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-bold"
                    style={{ color: B, fontFamily: 'var(--font-display)' }}>← Back to all posts</Link>
              <div className="flex gap-3 flex-wrap">
                <Link to="/programmes" className="btn btn-outline"
                      style={{ padding: '8px 18px', fontSize: '0.8rem', textDecoration: 'none' }}>
                  Explore IB Programmes
                </Link>
                <Link to="/student-inquiry#academic-session-header" className="btn btn-primary"
                      style={{ padding: '8px 18px', fontSize: '0.8rem', textDecoration: 'none' }}>
                  Enroll Now →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-16" style={{ background: '#FAFAF8' }}>
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="font-display font-800 text-2xl mb-8" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: '#1C1917' }}>Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map(r => (
                <div key={r.id} className="bg-white rounded-2xl overflow-hidden card-hover" style={{ border: '1.5px solid #F0EDEA' }}>
                  <div className="aspect-[16/9] overflow-hidden relative">
                    <img src={RELATED_IMG} alt={r.title}
                         className="w-full h-full object-cover"
                         loading="lazy" decoding="async" width="400" height="225" />
                    <div className="absolute inset-0" style={{ background: 'rgba(45,18,16,0.42)' }} />
                  </div>
                  <div className="p-5">
                    {r.category && <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: F, fontFamily: 'var(--font-display)' }}>{r.category.name}</div>}
                    <h4 className="font-display font-800 text-base mb-2 leading-snug" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: '#1C1917' }}>{r.title}</h4>
                    <Link to={`/blog/${r.slug}`} className="text-xs font-bold" style={{ color: B, fontFamily: 'var(--font-display)' }}>Read →</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
