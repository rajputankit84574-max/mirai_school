/**
 * api/index.js — Public barrel export
 *
 * Components import everything from '../api' — this file
 * is the single source of truth for what the API layer exposes.
 */

// React Query hooks (preferred — use these in components)
export * from './queries'

// Low-level fetch client (for custom one-off calls or tests)
export { http, ApiError, auth } from './http'

// Query key factory (for targeted cache invalidation)
export { KEYS } from './queryKeys'

// Shared QueryClient instance
export { queryClient } from './queryClient'
