import React, { useState } from 'react'
import { useRequestProspectus } from '../api/queries'

/**
 * ProspectusMagnet
 * 
 * Audit fix §4.2: Lead Magnet for Conversion.
 * A high-conversion component that captures parent details in exchange 
 * for the school prospectus.
 */
export default function ProspectusMagnet() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({ full_name: '', email: '', mobile: '', current_city: '' })
  const [isSuccess, setIsSuccess] = useState(false)
  const mutation = useRequestProspectus()

  const handleSubmit = async (e) => {
    e.preventDefault()
    mutation.mutate(formData, {
      onSuccess: (data) => {
        setIsSuccess(true)
        // Automatically start download
        window.open(data.download_url, '_blank')
      },
    })
  }

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="btn btn-primary shadow-xl hover:scale-105 transition-transform"
        style={{ padding: '12px 28px', fontSize: '1rem' }}
      >
        📖 Download 2026 Prospectus
      </button>
    )
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 transition-all">
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      
      <div className="relative bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in duration-300">
        <div className="h-2 w-full" style={{ background: 'linear-gradient(90deg, #AA4A44, #77966D)' }} />
        
        <div className="p-8">
          {!isSuccess ? (
            <>
              <h3 className="font-display text-2xl font-800 mb-2" style={{ color: '#1C1917' }}>Get the 2026 Prospectus</h3>
              <p className="text-sm text-stone-500 mb-6">Enter your details to receive our comprehensive guide to IB learning and residential life at Mirai.</p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                  required
                  type="text" 
                  placeholder="Parent Full Name"
                  className="w-full px-4 py-3 rounded-xl border bg-stone-50 border-stone-200 outline-none focus:ring-2 focus:ring-red-100"
                  value={formData.full_name}
                  onChange={e => setFormData({...formData, full_name: e.target.value})}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input 
                    required
                    type="email" 
                    placeholder="Email Address"
                    className="w-full px-4 py-3 rounded-xl border bg-stone-50 border-stone-200 outline-none focus:ring-2 focus:ring-red-100"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                  <input 
                    required
                    type="tel" 
                    placeholder="Mobile No."
                    className="w-full px-4 py-3 rounded-xl border bg-stone-50 border-stone-200 outline-none focus:ring-2 focus:ring-red-100"
                    value={formData.mobile}
                    onChange={e => setFormData({...formData, mobile: e.target.value})}
                  />
                </div>
                <input 
                  type="text" 
                  placeholder="Current City"
                  className="w-full px-4 py-3 rounded-xl border bg-stone-50 border-stone-200 outline-none focus:ring-2 focus:ring-red-100"
                  value={formData.current_city}
                  onChange={e => setFormData({...formData, current_city: e.target.value})}
                />
                
                <button 
                  disabled={mutation.isPending}
                  className="w-full btn btn-primary py-4 font-bold rounded-xl mt-4"
                >
                  {mutation.isPending ? 'Processing...' : 'Get Instant Access →'}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-10">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="font-display text-2xl font-800 mb-2">Success!</h3>
              <p className="text-sm text-stone-500 mb-8">Your prospectus has been sent. The download should start automatically.</p>
              <button onClick={() => setIsOpen(false)} className="btn btn-outline px-8">Close</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
