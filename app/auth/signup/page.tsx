'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const DOMAINS = [
  'DSA & Competitive Coding', 'Web Development', 'Machine Learning & AI',
  'Cybersecurity', 'UI/UX Design', 'Cloud & DevOps',
  'Game Development', 'GATE Preparation', 'SQL & Databases',
  'Free Certifications', 'Digital Marketing', 'LinkedIn & Resume',
]

const YEARS = ['First Year (FE)', 'Second Year (SE)', 'Third Year (TE)', 'Final Year (BE)']

export default function SignupPage() {
  const [step, setStep] = useState(1) // 1 = account, 2 = profile
  const [formData, setFormData] = useState({
    email: '', password: '', confirmPassword: '',
    fullName: '', year: '', rollNo: '',
    selectedDomains: [] as string[],
  })
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const toggleDomain = (domain: string) => {
    setFormData(prev => ({
      ...prev,
      selectedDomains: prev.selectedDomains.includes(domain)
        ? prev.selectedDomains.filter(d => d !== domain)
        : [...prev.selectedDomains, domain],
    }))
  }

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match'); return
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters'); return
    }
    setError('')
    setStep(2)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.selectedDomains.length === 0) {
      setError('Please select at least one domain of interest'); return
    }
    setLoading(true)
    setError('')

    const { data, error: signupError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.fullName,
          year: formData.year,
          roll_no: formData.rollNo,
          domains: formData.selectedDomains,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (signupError) {
      setError(signupError.message)
      setLoading(false)
    } else {
      setSuccess(true)
    }
  }

  const handleGoogleSignup = async () => {
    setGoogleLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
    if (error) { setError(error.message); setGoogleLoading(false) }
  }

  if (success) {
    return (
      <div style={{
        background: 'rgba(17,34,64,0.8)',
        border: '1px solid rgba(201,168,76,0.3)',
        borderRadius: 12, padding: '3rem 2.5rem',
        textAlign: 'center', backdropFilter: 'blur(10px)',
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✉️</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', marginBottom: '0.75rem', color: '#f8f6f0' }}>
          Check Your Email
        </h2>
        <p style={{ color: '#8a9bb5', fontSize: '0.9rem', lineHeight: 1.7 }}>
          We sent a verification link to <strong style={{ color: '#c9a84c' }}>{formData.email}</strong>.<br />
          Click it to activate your CDSC account.
        </p>
        <Link href="/auth/login" style={{ display: 'inline-block', marginTop: '1.5rem', color: '#c9a84c', fontSize: '0.85rem', textDecoration: 'none' }}>
          ← Back to Login
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', marginBottom: '2rem', justifyContent: 'center' }}>
        <div style={{
          width: 38, height: 38,
          background: 'linear-gradient(135deg, #c9a84c, #e8c97a)',
          borderRadius: 8, display: 'grid', placeItems: 'center',
          fontFamily: "'Playfair Display', serif",
          fontWeight: 900, fontSize: '1rem', color: '#0a1628',
        }}>C</div>
        <span style={{ fontWeight: 600, fontSize: '0.95rem', color: '#f8f6f0' }}>
          CDSC<span style={{ color: '#c9a84c' }}>@SCOE</span>
        </span>
      </Link>

      <div style={{
        background: 'rgba(17,34,64,0.8)',
        border: '1px solid rgba(201,168,76,0.2)',
        borderRadius: 12, padding: '2.5rem',
        backdropFilter: 'blur(10px)',
      }}>
        {/* Steps indicator */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.75rem' }}>
          {[1, 2].map(s => (
            <div key={s} style={{
              flex: 1, height: 3, borderRadius: 2,
              background: s <= step ? 'linear-gradient(90deg, #c9a84c, #e8c97a)' : 'rgba(201,168,76,0.15)',
              transition: 'background 0.3s',
            }} />
          ))}
        </div>

        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', color: '#c9a84c', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            // Step {step} of 2
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 700, color: '#f8f6f0' }}>
            {step === 1 ? 'Create Account' : 'Your Profile'}
          </h1>
          <p style={{ color: '#8a9bb5', fontSize: '0.82rem', marginTop: '0.4rem' }}>
            {step === 1 ? 'Set up your login credentials.' : 'Tell us about yourself to personalize your experience.'}
          </p>
        </div>

        {step === 1 ? (
          <>
            {/* Google OAuth */}
            <button onClick={handleGoogleSignup} disabled={googleLoading} style={{
              width: '100%', padding: '0.8rem',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(248,246,240,0.15)',
              borderRadius: 6, color: '#f8f6f0',
              fontSize: '0.88rem', fontWeight: 500,
              cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
              marginBottom: '1.25rem', transition: 'all 0.2s',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {googleLoading ? 'Redirecting...' : 'Sign up with Google'}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ flex: 1, height: 1, background: 'rgba(201,168,76,0.15)' }} />
              <span style={{ color: '#8a9bb5', fontSize: '0.75rem', fontFamily: "'DM Mono', monospace" }}>or email</span>
              <div style={{ flex: 1, height: 1, background: 'rgba(201,168,76,0.15)' }} />
            </div>

            <form onSubmit={handleNext} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>EMAIL ADDRESS</label>
                <input type="email" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} placeholder="you@example.com" required className="input-field" />
              </div>
              <div>
                <label style={labelStyle}>PASSWORD</label>
                <input type="password" value={formData.password} onChange={e => setFormData(p => ({ ...p, password: e.target.value }))} placeholder="Min. 6 characters" required className="input-field" />
              </div>
              <div>
                <label style={labelStyle}>CONFIRM PASSWORD</label>
                <input type="password" value={formData.confirmPassword} onChange={e => setFormData(p => ({ ...p, confirmPassword: e.target.value }))} placeholder="••••••••" required className="input-field" />
              </div>
              {error && <div style={errorStyle}>{error}</div>}
              <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }}>
                Continue →
              </button>
            </form>
          </>
        ) : (
          <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>FULL NAME</label>
              <input type="text" value={formData.fullName} onChange={e => setFormData(p => ({ ...p, fullName: e.target.value }))} placeholder="Your full name" required className="input-field" />
            </div>
            <div>
              <label style={labelStyle}>YEAR OF STUDY</label>
              <select value={formData.year} onChange={e => setFormData(p => ({ ...p, year: e.target.value }))} required className="input-field" style={{ appearance: 'none' }}>
                <option value="" disabled>Select your year</option>
                {YEARS.map(y => <option key={y} value={y} style={{ background: '#112240' }}>{y}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>ROLL NUMBER <span style={{ color: '#8a9bb5', fontSize: '0.7rem' }}>(Optional)</span></label>
              <input type="text" value={formData.rollNo} onChange={e => setFormData(p => ({ ...p, rollNo: e.target.value }))} placeholder="e.g. 21CE001" className="input-field" />
            </div>
            <div>
              <label style={{ ...labelStyle, display: 'block', marginBottom: '0.75rem' }}>
                DOMAINS OF INTEREST <span style={{ color: '#c9a84c' }}>*</span>
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {DOMAINS.map(domain => (
                  <button
                    key={domain}
                    type="button"
                    onClick={() => toggleDomain(domain)}
                    style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: 4,
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      border: formData.selectedDomains.includes(domain)
                        ? '1px solid #c9a84c'
                        : '1px solid rgba(201,168,76,0.2)',
                      background: formData.selectedDomains.includes(domain)
                        ? 'rgba(201,168,76,0.15)'
                        : 'transparent',
                      color: formData.selectedDomains.includes(domain) ? '#c9a84c' : '#8a9bb5',
                    }}
                  >
                    {domain}
                  </button>
                ))}
              </div>
            </div>
            {error && <div style={errorStyle}>{error}</div>}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem' }}>
              <button type="button" onClick={() => { setStep(1); setError('') }} style={{
                flex: 1, padding: '0.8rem',
                background: 'transparent',
                border: '1px solid rgba(248,246,240,0.15)',
                borderRadius: 6, color: '#8a9bb5',
                fontSize: '0.88rem', cursor: 'pointer',
              }}>
                ← Back
              </button>
              <button type="submit" disabled={loading} className="btn-primary" style={{ flex: 2, justifyContent: 'center' }}>
                {loading ? 'Creating Account...' : 'Join CDSC →'}
              </button>
            </div>
          </form>
        )}

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#8a9bb5', fontSize: '0.82rem' }}>
          Already a member?{' '}
          <Link href="/auth/login" style={{ color: '#c9a84c', textDecoration: 'none', fontWeight: 500 }}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.75rem',
  color: '#8a9bb5', marginBottom: '0.4rem', letterSpacing: '0.5px',
}

const errorStyle: React.CSSProperties = {
  background: 'rgba(239,68,68,0.1)',
  border: '1px solid rgba(239,68,68,0.3)',
  borderRadius: 6, padding: '0.7rem 1rem',
  color: '#fca5a5', fontSize: '0.82rem',
}
