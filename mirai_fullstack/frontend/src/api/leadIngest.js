/**
 * leadIngest.js
 * Service for sending leads to the external Supabase Edge Function.
 */

const API_URL = import.meta.env.VITE_LEAD_INGEST_API_URL
const API_KEY = import.meta.env.VITE_LEAD_INGEST_API_KEY

/**
 * Ingests a new lead into the centralized CRM.
 * @param {Object} leadData 
 * @param {string} leadData.child_name
 * @param {string} leadData.parent_name
 * @param {string} leadData.mobile_number
 * @param {string} leadData.email
 * @param {string} leadData.child_dob
 * @param {string} leadData.looking_for
 * @param {boolean} leadData.whatsapp_consent
 */
export async function ingestLead(leadData) {
  if (!API_URL || !API_KEY) {
    console.warn('[LeadIngest] API URL or Key is missing. Skipping external ingestion.')
    return { success: false, error: 'Config missing' }
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify(leadData)
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `HTTP ${response.status}`)
    }

    return { success: true, data: await response.json() }
  } catch (error) {
    console.error('[LeadIngest] Failed to ingest lead:', error.message)
    return { success: false, error: error.message }
  }
}
