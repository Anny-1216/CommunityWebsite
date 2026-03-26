'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

const DOMAIN_ICONS: Record<string, string> = {
  'DSA & Competitive Coding': '⚔️',
  'Web Development': '🌐',
  'Machine Learning & AI': '🤖',
  'Cybersecurity': '🔐',
  'UI/UX Design': '🎨',
  'Cloud & DevOps': '☁️',
  'Game Development': '🎮',
  'GATE Preparation': '📊',
  'SQL & Databases': '🛢️',
  'Free Certifications': '🎓',
  'Digital Marketing': '📣',
  'LinkedIn & Resume': '💼',
}

const RESOURCES = [
  { tag: 'Machine Learning', title: 'The F=ma of AI: Backpropagation & Deep Learning', type: 'Document', locked: false },
  { tag: 'YouTube', title: 'Make a Professional Resume in Under 9 Minutes — LaTeX + Overleaf', type: 'Video', locked: false },
  { tag: 'UI/UX Design', title: 'Basics of UI/UX 101 — Breakdown ft. Spotify', type: 'Video', locked: false },
  { tag: 'GitHub', title: 'Create Your First GitHub Account — Step by Step', type: 'Video', locked: false },
  { tag: 'Machine Learning', title: 'PyTorch 101 — Getting Started Guide', type: 'Blog', locked: false },
  { tag: 'Web Development', title: 'Structured Beginner Web Development Roadmap', type: 'Document', locked: false },
  { tag: 'DSA', title: 'DAA Decode — Design and Analysis of Algorithms', type: 'PDF', locked: false },
  { tag: 'Career', title: 'ATS Resume Tips & Templates', type: 'PDF', locked: false },
]

const ANNOUNCEMENTS = [
  { date: 'Nov 24', text: 'YouTube Video #3 published: Creating Your First GitHub Account.', tag: 'YouTube' },
  { date: 'Nov 22', text: 'UI/UX 101 ft. Spotify — second YouTube tutorial is live!', tag: 'UI/UX' },
  { date: 'Nov 20', text: 'CDSC is now on YouTube, LinkedIn, GitHub, Twitter & Instagram.', tag: 'Community' },
  { date: 'Nov 15', text: 'First ever YouTube video published: LaTeX Resume Tutorial.', tag: 'Career' },
  { date: 'Nov 14', text: 'Two new domains launched: Free Certifications & SQL.', tag: 'Domains' },
  { date: 'Nov 2', text: 'First team–community virtual meeting held successfully.', tag: 'Event' },
]

export default function DashboardClient({ user }: { user: User }) {
  const [activeTab, setActiveTab] = useState<'home' | 'resources' | 'domains' | 'profile'>('home')
  const router = useRouter()
  const supabase = createClient()

  const meta = user.user_metadata
  const name = meta?.full_name || user.email?.split('@')[0] || 'Member'
  const year = meta?.year || 'Not set'
  const rollNo = meta?.roll_no || '—'
  const domains: string[] = meta?.domains || []
  const avatar = user.user_metadata?.avatar_url || null
  const initials = name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a1628', display: 'flex' }}>

      {/* ── SIDEBAR ── */}
      <aside style={{
        width: 240, minHeight: '100vh',
        background: '#080f1e',
        borderRight: '1px solid rgba(201,168,76,0.12)',
        display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, left: 0, bottom: 0,
        zIndex: 50,
      }}>
        {/* Logo */}
        <div style={{ padding: '1.5rem 1.5rem 1rem', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
            <div style={{
              width: 32, height: 32,
              background: 'linear-gradient(135deg, #c9a84c, #e8c97a)',
              borderRadius: 6, display: 'grid', placeItems: 'center',
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900, fontSize: '0.85rem', color: '#0a1628',
            }}>C</div>
            <span style={{ fontWeight: 600, fontSize: '0.85rem', color: '#f8f6f0' }}>
              CDSC<span style={{ color: '#c9a84c' }}>@SCOE</span>
            </span>
          </Link>
        </div>

        {/* Nav */}
        <nav style={{ padding: '1rem 0.75rem', flex: 1 }}>
          {[
            { id: 'home', icon: '⊞', label: 'Overview' },
            { id: 'resources', icon: '📚', label: 'Resources' },
            { id: 'domains', icon: '🗂️', label: 'My Domains' },
            { id: 'profile', icon: '👤', label: 'Profile' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center',
                gap: '0.75rem', padding: '0.65rem 0.85rem',
                borderRadius: 6, border: 'none', cursor: 'pointer',
                marginBottom: '0.25rem', textAlign: 'left',
                fontSize: '0.85rem', fontWeight: 500,
                background: activeTab === item.id ? 'rgba(201,168,76,0.1)' : 'transparent',
                color: activeTab === item.id ? '#c9a84c' : '#8a9bb5',
                borderLeft: activeTab === item.id ? '2px solid #c9a84c' : '2px solid transparent',
                transition: 'all 0.15s',
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Social links */}
        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
          <div style={{ fontSize: '0.7rem', color: '#8a9bb5', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.75rem', fontFamily: "'DM Mono', monospace" }}>
            Community
          </div>
          {[
            { label: 'Telegram', href: 'https://t.me/+95_1-Gf6UiUwMGE9' },
            { label: 'WhatsApp', href: 'https://chat.whatsapp.com/CzniCBDSjHY2OVTRespdiO' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/cdsc-2025-scoe' },
            { label: 'YouTube', href: 'https://youtube.com/@CDSCSCOE' },
          ].map(link => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer" style={{
              display: 'block', fontSize: '0.78rem', color: '#8a9bb5',
              textDecoration: 'none', padding: '0.25rem 0',
              transition: 'color 0.15s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = '#c9a84c')}
              onMouseLeave={e => (e.currentTarget.style.color = '#8a9bb5')}>
              → {link.label}
            </a>
          ))}
        </div>

        {/* User + signout */}
        <div style={{
          padding: '1rem 1.25rem',
          borderTop: '1px solid rgba(201,168,76,0.1)',
          display: 'flex', alignItems: 'center', gap: '0.75rem',
        }}>
          <div style={{
            width: 34, height: 34, borderRadius: '50%',
            background: 'linear-gradient(135deg, #1a3a6b, #112240)',
            border: '1px solid rgba(201,168,76,0.3)',
            display: 'grid', placeItems: 'center',
            fontSize: '0.78rem', fontWeight: 700, color: '#c9a84c',
            overflow: 'hidden', flexShrink: 0,
          }}>
            {avatar
              ? <img src={avatar} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : initials}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f8f6f0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</div>
            <div style={{ fontSize: '0.7rem', color: '#8a9bb5' }}>Member</div>
          </div>
          <button onClick={handleSignOut} title="Sign out" style={{
            background: 'none', border: 'none', color: '#8a9bb5',
            cursor: 'pointer', fontSize: '1rem', padding: '0.25rem',
            transition: 'color 0.15s',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = '#c9a84c')}
            onMouseLeave={e => (e.currentTarget.style.color = '#8a9bb5')}>
            ⏻
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main style={{ marginLeft: 240, flex: 1, padding: '2.5rem 3rem', minHeight: '100vh' }}>

        {/* ── HOME TAB ── */}
        {activeTab === 'home' && (
          <div>
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', color: '#c9a84c', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                // Dashboard
              </div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 700, color: '#f8f6f0' }}>
                Welcome back, {name.split(' ')[0]} 👋
              </h1>
              <p style={{ color: '#8a9bb5', marginTop: '0.4rem', fontSize: '0.9rem' }}>
                {year} · {rollNo !== '—' ? `Roll No: ${rollNo}` : 'CDSC Member'}
              </p>
            </div>

            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
              {[
                { label: 'Total Members', value: '119+', icon: '👥' },
                { label: 'Active Domains', value: '14', icon: '🗂️' },
                { label: 'Your Domains', value: String(domains.length || 0), icon: '⭐' },
                { label: 'Resources', value: '8+', icon: '📚' },
              ].map(stat => (
                <div key={stat.label} style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(201,168,76,0.15)',
                  borderRadius: 8, padding: '1.25rem',
                }}>
                  <div style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 700, color: '#c9a84c', lineHeight: 1 }}>{stat.value}</div>
                  <div style={{ fontSize: '0.75rem', color: '#8a9bb5', marginTop: '0.3rem' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Announcements + Quick links */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '1.5rem' }}>

              {/* Announcements */}
              <div style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(201,168,76,0.15)',
                borderRadius: 8, padding: '1.5rem',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <h2 style={{ fontSize: '1rem', fontWeight: 600, color: '#f8f6f0' }}>📢 Announcements</h2>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', color: '#8a9bb5' }}>Latest first</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {ANNOUNCEMENTS.map((a, i) => (
                    <div key={i} style={{
                      paddingBottom: '0.85rem',
                      borderBottom: i < ANNOUNCEMENTS.length - 1 ? '1px solid rgba(201,168,76,0.08)' : 'none',
                      display: 'flex', gap: '0.75rem',
                    }}>
                      <span style={{
                        fontFamily: "'DM Mono', monospace", fontSize: '0.65rem',
                        color: '#c9a84c', minWidth: 48, paddingTop: '0.15rem',
                      }}>{a.date}</span>
                      <div>
                        <span style={{
                          display: 'inline-block', fontSize: '0.6rem',
                          color: '#c9a84c', border: '1px solid rgba(201,168,76,0.25)',
                          borderRadius: 3, padding: '0.1rem 0.4rem',
                          marginBottom: '0.3rem', fontFamily: "'DM Mono', monospace",
                          letterSpacing: '0.5px',
                        }}>{a.tag}</span>
                        <p style={{ fontSize: '0.82rem', color: '#8a9bb5', lineHeight: 1.6 }}>{a.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(201,168,76,0.15)',
                  borderRadius: 8, padding: '1.5rem',
                }}>
                  <h2 style={{ fontSize: '1rem', fontWeight: 600, color: '#f8f6f0', marginBottom: '1rem' }}>🚀 Quick Links</h2>
                  {[
                    { label: 'Join Telegram', href: 'https://t.me/+95_1-Gf6UiUwMGE9', icon: '✈️' },
                    { label: 'Join WhatsApp', href: 'https://chat.whatsapp.com/CzniCBDSjHY2OVTRespdiO', icon: '💬' },
                    { label: 'CDSC YouTube', href: 'https://youtube.com/@CDSCSCOE', icon: '▶️' },
                    { label: 'LinkedIn Page', href: 'https://linkedin.com/in/cdsc-2025-scoe', icon: '🔗' },
                    { label: 'GitHub Org', href: 'https://github.com/cdscscoe', icon: '💻' },
                  ].map(link => (
                    <a key={link.label} href={link.href} target="_blank" rel="noreferrer" style={{
                      display: 'flex', alignItems: 'center', gap: '0.6rem',
                      padding: '0.6rem 0.75rem', borderRadius: 6,
                      textDecoration: 'none', fontSize: '0.83rem', color: '#8a9bb5',
                      transition: 'all 0.15s', marginBottom: '0.25rem',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.08)'; e.currentTarget.style.color = '#c9a84c' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8a9bb5' }}>
                      <span>{link.icon}</span>{link.label}
                    </a>
                  ))}
                </div>

                {/* Your domains preview */}
                {domains.length > 0 && (
                  <div style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(201,168,76,0.15)',
                    borderRadius: 8, padding: '1.25rem',
                  }}>
                    <h2 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#f8f6f0', marginBottom: '0.75rem' }}>⭐ Your Domains</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {domains.slice(0, 4).map((d: string) => (
                        <span key={d} style={{
                          fontSize: '0.72rem', padding: '0.25rem 0.6rem',
                          border: '1px solid rgba(201,168,76,0.25)',
                          borderRadius: 3, color: '#c9a84c',
                          fontFamily: "'DM Mono', monospace",
                        }}>{d}</span>
                      ))}
                      {domains.length > 4 && (
                        <span style={{ fontSize: '0.72rem', color: '#8a9bb5' }}>+{domains.length - 4} more</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── RESOURCES TAB ── */}
        {activeTab === 'resources' && (
          <div>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', color: '#c9a84c', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.4rem' }}>// Knowledge Hub</div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, color: '#f8f6f0' }}>Resources & Study Material</h1>
              <p style={{ color: '#8a9bb5', marginTop: '0.4rem', fontSize: '0.85rem' }}>Verified content created and curated by CDSC members.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              {RESOURCES.map((r, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(201,168,76,0.15)',
                  borderRadius: 8, padding: '1.5rem',
                  transition: 'border-color 0.2s, transform 0.2s',
                  cursor: 'pointer',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.4)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.15)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}>
                  <div style={{
                    fontFamily: "'DM Mono', monospace", fontSize: '0.65rem',
                    color: '#c9a84c', letterSpacing: '1px', textTransform: 'uppercase',
                    marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem',
                  }}>
                    <span style={{ width: 5, height: 5, background: '#c9a84c', borderRadius: '50%', display: 'inline-block' }} />
                    {r.tag}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#f8f6f0', marginBottom: '0.5rem', lineHeight: 1.4 }}>{r.title}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.75rem' }}>
                    <span style={{ fontSize: '0.72rem', color: '#8a9bb5' }}>{r.type}</span>
                    <span style={{
                      fontSize: '0.7rem', padding: '0.2rem 0.6rem',
                      border: '1px solid rgba(201,168,76,0.2)',
                      borderRadius: 3, color: '#c9a84c',
                    }}>🌐 Access</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── DOMAINS TAB ── */}
        {activeTab === 'domains' && (
          <div>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', color: '#c9a84c', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.4rem' }}>// Domains</div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, color: '#f8f6f0' }}>My Domains of Interest</h1>
              <p style={{ color: '#8a9bb5', marginTop: '0.4rem', fontSize: '0.85rem' }}>You've joined {domains.length} domain{domains.length !== 1 ? 's' : ''}. Update from your profile anytime.</p>
            </div>
            {domains.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#8a9bb5' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🗂️</div>
                <p>No domains selected yet. Update your profile to add domains.</p>
                <button onClick={() => setActiveTab('profile')} className="btn-primary" style={{ marginTop: '1.25rem', display: 'inline-flex' }}>
                  Go to Profile →
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                {domains.map((d: string) => (
                  <div key={d} style={{
                    background: 'rgba(201,168,76,0.05)',
                    border: '1px solid rgba(201,168,76,0.25)',
                    borderRadius: 8, padding: '1.5rem',
                    display: 'flex', alignItems: 'center', gap: '1rem',
                  }}>
                    <span style={{ fontSize: '1.8rem' }}>{DOMAIN_ICONS[d] || '📌'}</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#f8f6f0' }}>{d}</div>
                      <div style={{ fontSize: '0.72rem', color: '#c9a84c', marginTop: '0.2rem', fontFamily: "'DM Mono', monospace" }}>Active</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── PROFILE TAB ── */}
        {activeTab === 'profile' && (
          <div>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', color: '#c9a84c', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.4rem' }}>// Profile</div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, color: '#f8f6f0' }}>Your Member Profile</h1>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '1.5rem' }}>
              {/* Profile card */}
              <div style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(201,168,76,0.15)',
                borderRadius: 8, padding: '2rem', textAlign: 'center',
              }}>
                <div style={{
                  width: 80, height: 80, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1a3a6b, #112240)',
                  border: '2px solid rgba(201,168,76,0.3)',
                  display: 'grid', placeItems: 'center',
                  margin: '0 auto 1.25rem',
                  fontSize: '1.6rem', fontWeight: 700, color: '#c9a84c',
                  overflow: 'hidden',
                  fontFamily: "'Playfair Display', serif",
                }}>
                  {avatar ? <img src={avatar} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initials}
                </div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 700, color: '#f8f6f0', marginBottom: '0.3rem' }}>{name}</div>
                <div style={{ fontSize: '0.8rem', color: '#8a9bb5', marginBottom: '0.5rem' }}>{user.email}</div>
                <div style={{
                  display: 'inline-block', fontFamily: "'DM Mono', monospace",
                  fontSize: '0.65rem', color: '#c9a84c',
                  border: '1px solid rgba(201,168,76,0.3)',
                  padding: '0.2rem 0.7rem', borderRadius: 3,
                }}>VERIFIED MEMBER</div>

                <div style={{ marginTop: '1.5rem', textAlign: 'left' }}>
                  {[
                    { label: 'Year', value: year },
                    { label: 'Roll No', value: rollNo },
                    { label: 'Domains', value: `${domains.length} selected` },
                    { label: 'Auth', value: user.app_metadata?.provider === 'google' ? 'Google' : 'Email' },
                  ].map(field => (
                    <div key={field.label} style={{
                      display: 'flex', justifyContent: 'space-between',
                      padding: '0.6rem 0',
                      borderBottom: '1px solid rgba(201,168,76,0.08)',
                      fontSize: '0.82rem',
                    }}>
                      <span style={{ color: '#8a9bb5' }}>{field.label}</span>
                      <span style={{ color: '#f8f6f0', fontWeight: 500 }}>{field.value}</span>
                    </div>
                  ))}
                </div>

                <button onClick={handleSignOut} style={{
                  width: '100%', marginTop: '1.5rem', padding: '0.7rem',
                  background: 'rgba(239,68,68,0.08)',
                  border: '1px solid rgba(239,68,68,0.2)',
                  borderRadius: 6, color: '#fca5a5',
                  fontSize: '0.82rem', cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.15)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)' }}>
                  Sign Out
                </button>
              </div>

              {/* Info panel */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(201,168,76,0.15)',
                  borderRadius: 8, padding: '1.5rem',
                }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f8f6f0', marginBottom: '1rem' }}>Account Details</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {[
                      { label: 'User ID', value: user.id.slice(0, 18) + '...' },
                      { label: 'Email', value: user.email || '—' },
                      { label: 'Email Verified', value: user.email_confirmed_at ? '✅ Yes' : '⏳ Pending' },
                      { label: 'Member Since', value: new Date(user.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) },
                    ].map(f => (
                      <div key={f.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.83rem' }}>
                        <span style={{ color: '#8a9bb5' }}>{f.label}</span>
                        <span style={{ color: '#f8f6f0', fontFamily: f.label === 'User ID' ? "'DM Mono', monospace" : 'inherit', fontSize: f.label === 'User ID' ? '0.75rem' : 'inherit' }}>{f.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{
                  background: 'rgba(201,168,76,0.04)',
                  border: '1px solid rgba(201,168,76,0.15)',
                  borderRadius: 8, padding: '1.5rem',
                }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f8f6f0', marginBottom: '0.75rem' }}>⭐ Your Domains ({domains.length})</h3>
                  {domains.length > 0 ? (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {domains.map((d: string) => (
                        <span key={d} style={{
                          padding: '0.3rem 0.75rem', fontSize: '0.75rem',
                          border: '1px solid rgba(201,168,76,0.3)',
                          borderRadius: 4, color: '#c9a84c',
                          background: 'rgba(201,168,76,0.08)',
                        }}>{DOMAIN_ICONS[d] || '📌'} {d}</span>
                      ))}
                    </div>
                  ) : (
                    <p style={{ color: '#8a9bb5', fontSize: '0.83rem' }}>No domains selected during signup.</p>
                  )}
                </div>

                <div style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(201,168,76,0.12)',
                  borderRadius: 8, padding: '1.25rem',
                  fontSize: '0.82rem', color: '#8a9bb5', lineHeight: 1.7,
                }}>
                  <strong style={{ color: '#c9a84c' }}>💡 Note:</strong> Profile editing (name, year, domains) will be available in the next update. For changes, contact{' '}
                  <a href="mailto:cdscscoe@gmail.com" style={{ color: '#c9a84c', textDecoration: 'none' }}>cdscscoe@gmail.com</a>.
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
