import { useEffect } from 'react'

/**
 * useSchemaMarkup
 * 
 * Audit fix §2.4: Structured Data (JSON-LD) for SEO.
 * Injects institutional, program, and blog structured data into the <head>
 * to help search engines understand the nature of the page and enable rich snippets.
 * 
 * @param {object} schema - The JSON-LD schema object
 */
export default function useSchemaMarkup(schema) {
  useEffect(() => {
    if (!schema) return

    // Clean up any existing schema with this ID
    const existingScript = document.getElementById('json-ld-schema')
    if (existingScript) {
      existingScript.remove()
    }

    const script = document.createElement('script')
    script.id = 'json-ld-schema'
    script.type = 'application/ld+json'
    script.innerHTML = JSON.stringify(schema)
    document.head.appendChild(script)

    return () => {
      const scriptToRemove = document.getElementById('json-ld-schema')
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, [schema])
}
