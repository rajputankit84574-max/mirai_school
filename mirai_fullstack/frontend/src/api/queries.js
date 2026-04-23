/**
 * queries.js — All React Query hook definitions
 *
 * Every GET endpoint  → useQuery hook
 * Every POST endpoint → useMutation hook
 *
 * Stale times and retry logic are configured per-query to match
 * how frequently the underlying data actually changes.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { http, auth } from './http'
import { KEYS } from './queryKeys'

/* ─── Stale time constants ────────────────────────────────────────── */
const STALE = {
  static:   1000 * 60 * 30,   // 30 min — programmes, stats, fees
  standard: 1000 * 60 * 5,    // 5  min — testimonials, facilities
  dynamic:  1000 * 60 * 2,    // 2  min — blog posts
  realtime: 1000 * 30,         // 30 sec — overview / hero aggregate
}

/* ─── Overview (homepage aggregate) ──────────────────────────────── */
export function useOverview() {
  return useQuery({
    queryKey:  KEYS.overview(),
    queryFn:   () => http.get('/overview/'),
    staleTime: STALE.realtime,
  })
}

/* ─── Programs ────────────────────────────────────────────────────── */
export function usePrograms() {
  return useQuery({
    queryKey:  KEYS.programs.all(),
    queryFn:   () => http.get('/programs/'),
    staleTime: STALE.static,
  })
}

export function useProgram(type) {
  return useQuery({
    queryKey:  KEYS.programs.detail(type),
    queryFn:   () => http.get(`/programs/${type}/`),
    staleTime: STALE.static,
    enabled:   Boolean(type),
  })
}

/* ─── Testimonials ────────────────────────────────────────────────── */
export function useTestimonials() {
  return useQuery({
    queryKey:  KEYS.testimonials(),
    queryFn:   () => http.get('/testimonials/'),
    staleTime: STALE.standard,
  })
}

/* ─── Facilities ──────────────────────────────────────────────────── */
export function useFacilities() {
  return useQuery({
    queryKey:  KEYS.facilities(),
    queryFn:   () => http.get('/facilities/'),
    staleTime: STALE.standard,
  })
}

/* ─── Blog ────────────────────────────────────────────────────────── */
export function useBlogPosts(params = {}) {
  return useQuery({
    queryKey:      KEYS.blog.posts(params),
    queryFn:       () => http.get('/blog/posts/', params),
    staleTime:     STALE.dynamic,
    placeholderData: (prev) => prev,   // keeps old data visible during category switch
  })
}

export function useBlogPost(slug) {
  return useQuery({
    queryKey:  KEYS.blog.post(slug),
    queryFn:   () => http.get(`/blog/posts/${slug}/`),
    staleTime: STALE.dynamic,
    enabled:   Boolean(slug),
  })
}

export function useBlogCategories() {
  return useQuery({
    queryKey:  KEYS.blog.categories(),
    queryFn:   () => http.get('/blog/categories/'),
    staleTime: STALE.static,
  })
}

/* ─── Admissions ──────────────────────────────────────────────────── */
export function useAdmissionSteps() {
  return useQuery({
    queryKey:  KEYS.admissions.steps(),
    queryFn:   () => http.get('/admissions/steps/'),
    staleTime: STALE.static,
  })
}

export function useFees() {
  return useQuery({
    queryKey:  KEYS.admissions.fees(),
    queryFn:   () => http.get('/admissions/fees/'),
    staleTime: STALE.static,
  })
}

/* ─── Stats ───────────────────────────────────────────────────────── */
export function useStats() {
  return useQuery({
    queryKey:  KEYS.stats(),
    queryFn:   () => http.get('/stats/'),
    staleTime: STALE.static,
  })
}

/* ─── Mutations ───────────────────────────────────────────────────── */

/**
 * useSubmitEnquiry
 *
 * Returned mutation object:
 *   mutation.mutate(formData)           — fire and forget
 *   mutation.mutate(formData, { onSuccess, onError }) — with callbacks
 *   mutation.isPending                  — replaces manual loading state
 *   mutation.isError                    — true on failure
 *   mutation.error.fieldErrors          — DRF 400 field map
 *   mutation.error.isValidationError    — true when DRF returned field errors
 *   mutation.reset()                    — clear isPending/isError/data
 */
export function useSubmitEnquiry() {
  return useMutation({
    mutationFn: (data) => http.post('/admissions/enquiry/', data),
  })
}

/**
 * useJwtLogin
 *
 * On success, stores tokens in localStorage and clears all cached queries
 * so protected data is re-fetched with the new credentials.
 */
export function useJwtLogin() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (credentials) => http.post('/auth/token/', credentials),
    onSuccess: (data) => {
      auth.setTokens(data.access, data.refresh)
      queryClient.invalidateQueries()
    },
  })
}

/**
 * useJwtLogout
 *
 * Clears tokens and purges the entire query cache.
 */
export function useJwtLogout() {
  const queryClient = useQueryClient()
  return () => {
    auth.clearTokens()
    queryClient.clear()
  }
}
/* ─── FAQs ── Audit fix: FAQ section for SEO + AI visibility ─────── */
export function useFAQs(category = '') {
  return useQuery({
    queryKey:  category ? KEYS.faqs.byCategory(category) : KEYS.faqs.all(),
    queryFn:   () => http.get('/faqs/', category ? { category } : undefined),
    staleTime: STALE.static,
  })
}

/**
 * useRequestProspectus
 * 
 * Audit fix §4.2: Lead Magnet capture (Middle-of-funnel tracking)
 */
export function useRequestProspectus() {
  return useMutation({
    mutationFn: (data) => http.post('/admissions/prospectus-request/', data),
  })
}

