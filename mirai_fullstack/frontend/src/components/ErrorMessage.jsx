export default function ErrorMessage({ message = 'Failed to load content.' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
      <div className="text-4xl">⚠️</div>
      <p className="text-sm" style={{ color:'#78716C', fontFamily:'var(--font-body)' }}>{message}</p>
      <button onClick={() => window.location.reload()}
        className="btn btn-outline" style={{ padding:'8px 20px', fontSize:'0.8rem' }}>
        Try again
      </button>
    </div>
  )
}
