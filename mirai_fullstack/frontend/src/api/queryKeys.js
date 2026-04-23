/**
 * queryKeys.js — Centralised React Query key factory
 */
export const KEYS = {
  overview: () => ['overview'],

  programs: {
    all:    ()     => ['programs'],
    detail: (type) => ['programs', type],
  },

  testimonials: () => ['testimonials'],
  facilities:   () => ['facilities'],

  blog: {
    posts:      (params = {}) => ['blog', 'posts', params],
    post:       (slug)        => ['blog', 'post', slug],
    categories: ()            => ['blog', 'categories'],
  },

  admissions: {
    steps: () => ['admissions', 'steps'],
    fees:  () => ['admissions', 'fees'],
  },

  stats: () => ['stats'],

  // Audit fix §2.5 + §5: FAQ queries for SEO + AI visibility
  faqs: {
    all:        ()    => ['faqs'],
    byCategory: (cat) => ['faqs', cat],
  },
}
