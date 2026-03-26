'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const isHome = pathname === '/'

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: scrolled ? '0.8rem 3rem' : '1.2rem 3rem',
        backdropFilter: 'blur(16px)',
        background: 'rgba(10,22,40,0.88)',
        borderBottom: '1px solid rgba(201,168,76,0.15)',
        transition: 'padding 0.3s',
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
        <div style={{
          width: 38, height: 38,
          background: 'linear-gradient(135deg, #c9a84c, #e8c97a)',
          borderRadius: 8,
          display: 'grid', placeItems: 'center',
          fontFamily: "'Playfair Display', serif",
          fontWeight: 900, fontSize: '1rem',
          color: '#0a1628',
        }}>C</div>
        <span style={{ fontWeight: 600, fontSize: '0.95rem', color: '#f8f6f0', letterSpacing: '0.5px' }}>
          CDSC<span style={{ color: '#c9a84c' }}>@SCOE</span>
        </span>
      </Link>

      {/* Desktop Links */}
      <ul style={{ display: 'flex', alignItems: 'center', gap: '2rem', listStyle: 'none' }}
        className="hidden md:flex">
        {isHome && <>
          <li><a href="#about" style={linkStyle}>About</a></li>
          <li><a href="#domains" style={linkStyle}>Domains</a></li>
          <li><a href="#team" style={linkStyle}>Team</a></li>
          <li><a href="#timeline" style={linkStyle}>Timeline</a></li>
          <li><a href="#resources" style={linkStyle}>Resources</a></li>
        </>}
        {!isHome && <>
          <li><Link href="/#about" style={linkStyle}>About</Link></li>
          <li><Link href="/#domains" style={linkStyle}>Domains</Link></li>
          <li><Link href="/#resources" style={linkStyle}>Resources</Link></li>
        </>}
      </ul>

      {/* Auth Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {user ? (
          <>
            <Link href="/dashboard" className="btn-outline-gold" style={{ textDecoration: 'none' }}>
              Dashboard
            </Link>
            <button onClick={handleSignOut} style={{
              background: 'transparent', border: 'none',
              color: '#8a9bb5', fontSize: '0.82rem',
              cursor: 'pointer', padding: '0.4rem 0.6rem',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = '#c9a84c')}
              onMouseLeave={e => (e.currentTarget.style.color = '#8a9bb5')}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link href="/auth/login" style={{
              color: '#8a9bb5', fontSize: '0.85rem', textDecoration: 'none',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = '#f8f6f0')}
              onMouseLeave={e => (e.currentTarget.style.color = '#8a9bb5')}>
              Sign In
            </Link>
            <Link href="/auth/signup" className="btn-primary" style={{ textDecoration: 'none', padding: '0.5rem 1.2rem' }}>
              Join Now →
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

const linkStyle: React.CSSProperties = {
  color: '#8a9bb5',
  textDecoration: 'none',
  fontSize: '0.82rem',
  fontWeight: 500,
  letterSpacing: '0.8px',
  textTransform: 'uppercase',
  transition: 'color 0.2s',
}
