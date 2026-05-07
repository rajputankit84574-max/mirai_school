/**
 * FAQSection.jsx
 * Audit fixes:
 *   §2.5 — "No FAQ Section: Missing FAQ = missed chance for rankings + AI visibility"
 *   §5   — "Add structured, answer-based content. Optimize pages for AI visibility"
 *   §1.2 — FAQ schema injected via parent useSEO hook
 */
import { useState } from 'react'
import { useFAQs } from '../api'
import SectionHeader from './SectionHeader'

const B  = '#AA4A44'
const BP = '#F5ECEA'

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-200"
      style={{
        border:     `1.5px solid ${isOpen ? B : '#F0EDEA'}`,
        background: isOpen ? '#FFFAF9' : 'white',
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span
          className="font-display font-700 text-base leading-snug"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            color:      isOpen ? B : '#1C1917',
          }}
        >
          {faq.question}
        </span>
        <span
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
          style={{ background: isOpen ? B : '#F7F5F2' }}
        >
          <svg
            className="transition-transform duration-200"
            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke={isOpen ? 'white' : '#78716C'}
            strokeWidth="2.5" strokeLinecap="round"
          >
            <path d="M19 9l-7 7-7-7"/>
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className="px-6 pb-6">
          <div
            className="pt-1 text-sm leading-relaxed"
            style={{ borderTop: `1px solid ${BP}`, paddingTop: 16, color: '#44403C', fontFamily: 'var(--font-body)' }}
          >
            {faq.answer}
          </div>
        </div>
      )}
    </div>
  )
}

export default function FAQSection({ category = '', maxItems = 8, showHeader = true }) {
  const [openId, setOpenId] = useState(null)
  const { data: faqs, isLoading } = useFAQs(category)

  const items = Array.isArray(faqs)
    ? faqs.slice(0, maxItems)
    : faqs?.results?.slice(0, maxItems) ?? []

  if (isLoading) return null
  if (!items.length) return null

  return (
    <section
      className="py-20"
      style={{ background: '#FAFAF8' }}
      aria-label="Frequently Asked Questions"
    >
      <div className="max-w-3xl mx-auto px-6">
        {showHeader && (
          <SectionHeader
            center
            label="Frequently Asked Questions"
            title="Everything You Need to Know"
            subtitle="Answers to the most common questions about Mirai Experiential School — admissions, programmes, boarding, fees, and more."
          />
        )}

        <div className="space-y-3">
          {items.map(faq => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
            />
          ))}
        </div>

        {/* Audit §4.4: Internal linking — link to admissions from FAQ */}
        <div className="text-center mt-10">
          <p className="text-sm mb-4" style={{ color: '#78716C', fontFamily: 'var(--font-body)' }}>
            Have more questions? We're happy to help.
          </p>
          <Link href="/contact" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            Book a Free Consultation →
          </Link>
        </div>
      </div>
    </section>
  )
}
