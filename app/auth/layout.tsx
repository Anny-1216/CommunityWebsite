export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a1628',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      position: 'relative',
    }}>
      {/* Grid background */}
      <div style={{
        position: 'fixed', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)',
        pointerEvents: 'none',
      }} />
      {/* Glow */}
      <div style={{
        position: 'fixed',
        width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }} />
      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 460 }}>
        {children}
      </div>
    </div>
  )
}
