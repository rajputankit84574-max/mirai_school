/**
 * queryClient.js — Shared QueryClient instance
 *
 * Centralising config here means main.jsx stays clean,
 * and the same client can be imported in tests or server-side code.
 */

import { QueryClient } from '@tanstack/react-query'
import { ApiError } from './http'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      /* Don't retry on 404/400 — those won't resolve on their own */
      retry: (failureCount, error) => {
        if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
          return false
        }
        return failureCount < 2
      },

      /* Treat window focus refetch as opt-in — avoids unnecessary API
         hammering for a content site where data is relatively stable  */
      refetchOnWindowFocus: false,

      /* Surface errors to the nearest error boundary  */
      throwOnError: false,
    },
    mutations: {
      /* Mutations never auto-retry (form submissions, etc.) */
      retry: false,
    },
  },
})
