export default function LoadingSpinner({ message = 'Loading…' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="w-10 h-10 rounded-full animate-spin"
           style={{ border:'3px solid #F5ECEA', borderTopColor:'#AA4A44' }}/>
      <p className="text-sm font-medium" style={{ color:'#A8A29E', fontFamily:'var(--font-body)' }}>
        {message}
      </p>
    </div>
  )
}
