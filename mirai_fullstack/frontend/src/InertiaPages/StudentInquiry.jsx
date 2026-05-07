import { Head, Link } from '@inertiajs/react'
import PageHero from '../components/PageHero'
import InquiryForm from '../components/InquiryForm'

export default function StudentInquiry() {
  return (
    <>
      <Head>
        <title>Student Inquiry Form | Mirai Experiential School</title>
        <meta name="description" content="Enrol your child at Mirai Experiential School. Fill out our comprehensive student inquiry form to start the admission process for the 2026–27 academic year." />
      </Head>

      <PageHero
        title="Student Inquiry Form"
        subtitle="Start your child's journey with India's leading IB experiential school. Please provide the details below and our admissions team will get in touch with you."
        breadcrumb={[{ label: 'Admissions', href: '/admissions' }, { label: 'Inquiry' }]}
      />

      <section className="py-24" style={{ background: '#FAFAF8' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 id="academic-session-2026-27" className="font-display font-800 text-3xl mb-4" style={{ color: '#1C1917' }}>
              Academic Session 2026–27
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              We appreciate your interest in Mirai Experiential School. This form helps us understand your child better and ensures a smooth admission process.
            </p>
          </div>

          <InquiryForm />

          <div className="mt-12 p-8 rounded-3xl text-center border bg-white" style={{ borderColor: '#F0EDEA' }}>
            <h3 className="font-display font-bold text-lg mb-3" style={{ color: '#1C1917' }}>Need Help with the Form?</h3>
            <p className="text-sm text-slate-500 mb-6">
              If you have any questions or encounter any issues while filling out the form, our admissions team is here to assist you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+919599931471" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-stone-100 text-stone-900 text-sm font-bold transition-all hover:bg-stone-200">
                📞 +91 95999 31471
              </a>
              <a href="mailto:admissions@miraischool.com" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-stone-100 text-stone-900 text-sm font-bold transition-all hover:bg-stone-200">
                📧 admissions@miraischool.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
