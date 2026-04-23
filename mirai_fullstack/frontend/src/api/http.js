/**
 * http.js — Fetch-based HTTP client
 *
 * Replaces Axios. Provides:
 *  - Base URL resolution
 *  - Automatic JSON serialisation / deserialisation
 *  - Structured ApiError with status + body
 *  - Optional JWT auth header injection
 *  - Request timeout via AbortController
 */

const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:8000/api').replace(/\/$/, '')
const DEFAULT_TIMEOUT_MS = 12_000

/* ─── Error class ─────────────────────────────────────────────────── */

export class ApiError extends Error {
  /**
   * @param {number}  status   HTTP status code
   * @param {string}  message  Human-readable description
   * @param {unknown} body     Parsed response body (may contain DRF field errors)
   */
  constructor(status, message, body = null) {
    super(message)
    this.name    = 'ApiError'
    this.status  = status
    this.body    = body
  }

  /** True when the server returned field-level validation errors (DRF 400) */
  get isValidationError() {
    return this.status === 400 && this.body && typeof this.body === 'object'
  }

  /** Extracts DRF field errors as a flat { field: firstMessage } map */
  get fieldErrors() {
    if (!this.isValidationError) return {}
    return Object.fromEntries(
      Object.entries(this.body).map(([field, msgs]) => [
        field,
        Array.isArray(msgs) ? msgs[0] : String(msgs),
      ])
    )
  }
}

/* ─── Token storage helper ────────────────────────────────────────── */

export const auth = {
  getAccessToken:  ()      => localStorage.getItem('mirai_access'),
  getRefreshToken: ()      => localStorage.getItem('mirai_refresh'),
  setTokens:       (a, r) => {
    localStorage.setItem('mirai_access',  a)
    localStorage.setItem('mirai_refresh', r)
  },
  clearTokens: () => {
    localStorage.removeItem('mirai_access')
    localStorage.removeItem('mirai_refresh')
  },
}

/* ─── Core fetch wrapper ──────────────────────────────────────────── */

/**
 * @param {string}  path      e.g. '/overview/'
 * @param {object}  [options]
 * @param {string}  [options.method='GET']
 * @param {object}  [options.body]         — will be JSON-serialised
 * @param {object}  [options.params]       — appended as query string
 * @param {boolean} [options.auth=false]   — include Bearer token
 * @param {number}  [options.timeout]      — ms override
 * @returns {Promise<unknown>}  parsed JSON body
 */
export async function request(path, options = {}) {
  const {
    method  = 'GET',
    body,
    params,
    auth: requireAuth = false,
    timeout = DEFAULT_TIMEOUT_MS,
  } = options

  /* Build URL */
  let url = `${API_BASE}${path}`
  if (params) {
    const qs = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '')
    ).toString()
    if (qs) url += `?${qs}`
  }

  /* Build headers */
  const headers = new Headers({ 'Content-Type': 'application/json' })
  if (requireAuth) {
    const token = auth.getAccessToken()
    if (token) headers.set('Authorization', `Bearer ${token}`)
  }

  /* Timeout via AbortController */
  const controller = new AbortController()
  const timerId    = setTimeout(() => controller.abort(), timeout)

  let response
  try {
    response = await fetch(url, {
      method,
      headers,
      signal:      controller.signal,
      body:        body !== undefined ? JSON.stringify(body) : undefined,
    })
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new ApiError(0, `Request timed out after ${timeout}ms`)
    }
    throw new ApiError(0, 'Network error — check your connection', err.message)
  } finally {
    clearTimeout(timerId)
  }

  /* Parse body (always attempt JSON) */
  let data = null
  const contentType = response.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    try { data = await response.json() } catch { data = null }
  }

  /* Throw for non-2xx */
  if (!response.ok) {
    const message =
      (data && (data.detail || data.message || data.error)) ||
      `HTTP ${response.status} ${response.statusText}`
    throw new ApiError(response.status, message, data)
  }

  return data
}

/* ─── Convenience methods ─────────────────────────────────────────── */

export const http = {
  get:    (path, params,  opts = {}) => request(path, { ...opts, method: 'GET',    params }),
  post:   (path, body,    opts = {}) => request(path, { ...opts, method: 'POST',   body }),
  put:    (path, body,    opts = {}) => request(path, { ...opts, method: 'PUT',    body }),
  patch:  (path, body,    opts = {}) => request(path, { ...opts, method: 'PATCH',  body }),
  delete: (path,          opts = {}) => request(path, { ...opts, method: 'DELETE' }),
}
