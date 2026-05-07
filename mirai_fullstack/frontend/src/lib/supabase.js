import { createClient } from '@supabase/supabase-js'

/**
 * Supabase Client Configuration
 * Uses Vite's environment variables (VITE_ prefix required).
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    '[Supabase] CRITICAL: Supabase URL or Anon Key is missing! ' +
    'Please check your .env file and ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.'
  )
}

// Create and export the single Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Reusable Auth Helpers
 */
export const supabaseAuth = {
  /** Sign up a new student/user */
  signUp: (email, password, metadata = {}) => 
    supabase.auth.signUp({ email, password, options: { data: metadata } }),

  /** Sign in with email/password */
  signIn: (email, password) => 
    supabase.auth.signInWithPassword({ email, password }),

  /** Sign out */
  signOut: () => supabase.auth.signOut(),

  /** Get current user session */
  getSession: () => supabase.auth.getSession(),

  /** Reset password */
  resetPassword: (email) => 
    supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    }),
}
