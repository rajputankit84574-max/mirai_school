/**
 * useSEO.js
 * Audit fix §1.2, §2.2: Custom hook to inject schema + set meta on each page.
 * Usage: useSEO(META.home, [orgSchema, faqSchema])
 */
import { useEffect } from 'react'
import { setPageMeta, injectSchema } from '../utils/seo'

export function useSEO(meta, schemas = []) {
  useEffect(() => {
    if (meta) setPageMeta(meta)
    schemas.filter(Boolean).forEach(s => injectSchema(s))
    // Cleanup on unmount: remove injected schemas to prevent accumulation
    return () => {
      schemas.filter(Boolean).forEach(s => {
        const type = Array.isArray(s) ? s[0]?.['@type'] : s['@type']
        if (type) {
          document.querySelectorAll(`script[data-schema="${type}"]`).forEach(el => el.remove())
        }
      })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}
