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
      className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between backdrop-blur-md bg-[#0a1628]/90 border-b border-[#c9a84c]/20 transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'} px-5 md:px-12`}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 no-underline z-50">
        <div className="w-9 h-9 rounded-lg grid place-items-center font-playfair font-black text-base text-[#0a1628]" style={{ background: 'linear-gradient(135deg, #c9a84c, #e8c97a)' }}>
          C
        </div>
        <span className="font-semibold text-[0.95rem] text-[#f8f6f0] tracking-wide">
          CDSC<span className="text-[#c9a84c]">@SCOE</span>
        </span>
      </Link>

      {/* Hamburger / Mobile menu toggle */}
      <div className="md:hidden flex items-center gap-4 z-50">
        <button 
          className="text-[#8a9bb5] focus:outline-none" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
          ) : (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
          )}
        </button>
      </div>

      {/* Navigation Links and Auth */}
      <div className={`absolute md:static top-full left-0 w-full md:w-auto bg-[#0a1628] md:bg-transparent border-b md:border-none border-[#c9a84c]/20 flex-col md:flex-row items-center gap-6 md:gap-8 px-5 py-8 md:p-0 transition-transform md:translate-y-0 ${menuOpen ? 'translate-y-0 flex shadow-2xl' : '-translate-y-[200%] hidden md:flex'}`}>
        
        {/* Links */}
        <ul className="flex flex-col md:flex-row items-center gap-6 md:gap-8 list-none w-full md:w-auto">
          {isHome ? (
            <>
              <li><a href="#about" onClick={() => setMenuOpen(false)} style={linkStyle}>About</a></li>
              <li><a href="#domains" onClick={() => setMenuOpen(false)} style={linkStyle}>Domains</a></li>
              <li><a href="#team" onClick={() => setMenuOpen(false)} style={linkStyle}>Team</a></li>
              <li><a href="#timeline" onClick={() => setMenuOpen(false)} style={linkStyle}>Timeline</a></li>
              <li><a href="#resources" onClick={() => setMenuOpen(false)} style={linkStyle}>Resources</a></li>
            </>
          ) : (
            <>
              <li><Link href="/#about" onClick={() => setMenuOpen(false)} style={linkStyle}>About</Link></li>
              <li><Link href="/#domains" onClick={() => setMenuOpen(false)} style={linkStyle}>Domains</Link></li>
              <li><Link href="/#resources" onClick={() => setMenuOpen(false)} style={linkStyle}>Resources</Link></li>
            </>
          )}
        </ul>

        {/* Auth Buttons */}
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto mt-4 md:mt-0 pt-6 md:pt-0 border-t md:border-none border-white/5">
          {user ? (
            <>
              <Link href="/dashboard" className="btn-outline-gold w-full md:w-auto text-center" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
              <button onClick={() => { handleSignOut(); setMenuOpen(false); }} className="text-[#8a9bb5] hover:text-[#c9a84c] text-[0.82rem] transition-colors py-2">
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="text-[#8a9bb5] hover:text-[#f8f6f0] text-[0.85rem] transition-colors py-2" onClick={() => setMenuOpen(false)}>
                Sign In
              </Link>
              <Link href="/auth/signup" className="btn-primary w-full md:w-auto text-center py-2 px-5" onClick={() => setMenuOpen(false)}>
                Join Now →
              </Link>
            </>
          )}
        </div>
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
