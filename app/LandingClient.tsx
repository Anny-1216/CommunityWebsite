'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

const DOMAINS = [
  { icon: '⚔️', name: 'DSA & Competitive Coding', lead: 'Prasen Bhandari · Prince Thakur' },
  { icon: '🔐', name: 'Cybersecurity', lead: 'Dnyaneshwar Shelke' },
  { icon: '🤖', name: 'Machine Learning & AI', lead: 'Sameer Sayyad' },
  { icon: '🌐', name: 'Web Development', lead: 'Shubhangi Raut + 3' },
  { icon: '🎨', name: 'UI/UX Design', lead: 'Uma Salunke' },
  { icon: '☁️', name: 'Cloud & DevOps', lead: 'Vishesh Ghule' },
  { icon: '🎮', name: 'Game Development', lead: 'Harshit Sewalikar · Prasen' },
  { icon: '📊', name: 'GATE Preparation', lead: 'Chaitanya · Mayur · Prince' },
  { icon: '💼', name: 'LinkedIn & Resume', lead: 'Chaitanya Paigude' },
  { icon: '📣', name: 'Digital Marketing', lead: 'Diksha Shinde' },
  { icon: '🏆', name: 'Toppers Talk & Academics', lead: 'Sanket Warole' },
  { icon: '🗓️', name: 'Calendar & GitHub', lead: 'Mayur Hebade' },
  { icon: '🎓', name: 'Free Certifications', lead: 'Community Curated' },
  { icon: '🛢️', name: 'SQL & Databases', lead: 'Community Curated' },
]

const FOUNDERS = [
  { initial: 'C', name: 'Chaitanya Paigude', role: 'Vision & Lead · LinkedIn · Resume · GATE', lead: true },
  { initial: 'M', name: 'Mayur Hebade', role: 'Calendar & GitHub · GATE Prep', lead: false },
  { initial: 'S', name: 'Shubhangi Raut', role: 'Web Development · Content Coordination', lead: false },
  { initial: 'U', name: 'Uma Salunke', role: 'UI/UX & Design · Documentation & Reports', lead: false },
]

const TIMELINE = [
  { date: '13 OCT 2025', title: 'Community Founded', desc: 'CDSC@SCOE officially conceptualized. Official email and social handles created.' },
  { date: '14 OCT 2025', title: 'Guidelines Finalized & Registration Launched', desc: 'Community rules decided. Google registration form circulated across all department groups.' },
  { date: '19 OCT 2025', title: 'Official Opening + Website Live', desc: 'Invites sent personally via email. Official community website launched.' },
  { date: '21 OCT 2025', title: 'Daily DSA Challenge Begins', desc: 'Daily problem-solving sessions started — the first academic engagement.' },
  { date: '27 OCT 2025', title: 'First 1:1 DSA Doubt Session', desc: 'Personalized peer mentoring on Google Meet. Students helping students.' },
  { date: '01 NOV 2025', title: 'LinkedIn Launch', desc: 'CDSC becomes publicly visible — a structured student community, not just a chat group.' },
  { date: '15 NOV 2025', title: 'First YouTube Tutorial', desc: 'LaTeX Resume tutorial published. CDSC expands into multimedia content.' },
  { date: '20 NOV 2025', title: 'Multi-Platform Presence', desc: 'CDSC now active on YouTube, LinkedIn, GitHub, Twitter (X), and Instagram.' },
  { date: '29 NOV 2025', title: '119 Verified Members', desc: 'End of Month 2. Proof of sustained engagement and growth.' },
]

const RESOURCES = [
  { tag: 'Machine Learning', title: 'The F=ma of AI: Backpropagation & Deep Learning Foundations', meta: 'Domain resource · Nov 2025', access: '🔒 Members Only' },
  { tag: 'YouTube · Tutorial', title: 'Make a Professional Resume in Under 9 Minutes — LaTeX + Overleaf', meta: '8:56 min · 108 views', access: '🌐 Public' },
  { tag: 'UI/UX Design', title: 'Basics of UI/UX 101 — Breakdown ft. Spotify', meta: '9:25 min · 55 views', access: '🌐 Public' },
  { tag: 'GitHub · Tutorial', title: 'Create Your First GitHub Account — Step by Step', meta: '4:15 min · YouTube', access: '🌐 Public' },
  { tag: 'Machine Learning', title: 'PyTorch 101 — Getting Started Guide', meta: 'Blog resource · Nov 2025', access: '🔒 Members Only' },
  { tag: 'Web Development', title: 'Structured Beginner Roadmap for Web Development', meta: 'Community curated · Nov 2025', access: '🔒 Members Only' },
]

export default function LandingClient() {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })

    document.querySelectorAll('.fade-up, .timeline-item').forEach(el => {
      observerRef.current?.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [])

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style suppressHydrationWarning>{`
        @media (max-width: 1024px) {
          .grid-about { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .grid-domains, .grid-team, .grid-resources { grid-template-columns: repeat(2, 1fr) !important; }
          .hero-stats { position: relative !important; right: auto !important; bottom: auto !important; flex-direction: row !important; margin-top: 3rem; flex-wrap: wrap; justify-content: flex-start; }
          .hero-stats > div { text-align: left !important; }
        }
        @media (max-width: 768px) {
          section { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
          .hero-section { padding-top: 6rem !important; padding-bottom: 3rem !important; }
          .grid-features, .grid-domains, .grid-team, .grid-resources { grid-template-columns: 1fr !important; }
          .footer-content { flex-direction: column !important; align-items: flex-start !important; gap: 1rem !important; }
        }
        .fade-up { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .fade-up.visible { opacity: 1; transform: translateY(0); }
        .timeline-item { opacity: 0; transform: translateX(-20px); transition: opacity 0.5s ease, transform 0.5s ease; }
        .timeline-item.visible { opacity: 1; transform: translateX(0); }
        .domain-card::after { content: ""; position:absolute; bottom:0; left:0; right:0; height:2px; background:#c9a84c; transform:scaleX(0); transition:transform 0.3s; }
        .domain-card:hover::after { transform:scaleX(1); }
        .domain-card:hover { background: #112240; }
        .nav-link:hover { color: #c9a84c !important; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.7)} }
      `}</style>

      {/* ── HERO ── */}
       <section className="hero-section" style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        padding: '8rem 4rem 4rem', position: 'relative', overflow: 'hidden',
      }}>
        {/* Grid bg */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent)',
        }} />
        <div style={{ position: 'absolute', width: 700, height: 700, background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)', top: -200, right: -200, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: 400, height: 400, background: 'radial-gradient(circle, rgba(26,58,107,0.6) 0%, transparent 70%)', bottom: 0, left: 0, pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 780 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            fontFamily: "'DM Mono', monospace", fontSize: '0.75rem',
            color: '#c9a84c', letterSpacing: '2px', textTransform: 'uppercase',
            marginBottom: '1.5rem', padding: '0.4rem 1rem',
            border: '1px solid rgba(201,168,76,0.2)', borderRadius: 2,
            background: 'rgba(201,168,76,0.05)',
          }}>
            <span style={{ width: 6, height: 6, background: '#c9a84c', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
            Est. October 2025 · SCOE, Pune
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(3rem, 6vw, 5.5rem)',
            fontWeight: 700, lineHeight: 1.08,
            color: '#f8f6f0', letterSpacing: '-1px', marginBottom: '1rem',
          }}>
            Where Knowledge<br />
            Meets <em style={{ color: '#c9a84c' }}>Collaboration</em>
          </h1>

          <div style={{ width: 80, height: 2, background: 'linear-gradient(90deg, #c9a84c, transparent)', margin: '1.5rem 0' }} />

          <p style={{ fontSize: '1.1rem', color: '#8a9bb5', lineHeight: 1.75, maxWidth: 560, fontWeight: 300, marginBottom: '2.5rem' }}>
            CDSC@SCOE is the first and only student-led technical community of the Computer Engineering Department — built by students, for students, to bridge the gap between classroom and industry.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/auth/signup" className="btn-primary">Join the Community →</Link>
            <a href="#about" className="btn-secondary">Learn More</a>
          </div>
        </div>

        {/* Stats */}
        <div className="hero-stats" style={{ position: 'absolute', right: '4rem', bottom: '4rem', display: 'flex', flexDirection: 'column', gap: '1rem', zIndex: 2 }}>
          {[
            { num: '119+', label: 'Verified Members' },
            { num: '14', label: 'Active Domains' },
            { num: '47', label: 'Days Active' },
          ].map(s => (
            <div key={s.label} style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.2)',
              borderRadius: 6, padding: '1.2rem 1.6rem',
              backdropFilter: 'blur(10px)', textAlign: 'right',
            }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 700, color: '#c9a84c', lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: '0.72rem', color: '#8a9bb5', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '0.3rem' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ background: '#112240', borderTop: '1px solid rgba(201,168,76,0.15)', borderBottom: '1px solid rgba(201,168,76,0.15)', padding: '6rem 4rem' }}>
        <div className="grid-about" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center', maxWidth: 1200, margin: '0 auto' }}>
          <div className="fade-up">
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.72rem', color: '#c9a84c', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '0.75rem' }}>// About CDSC</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '1rem' }}>
              The First Student<br />Community at SCOE
            </h2>
            <div style={{ width: 50, height: 2, background: '#c9a84c', marginBottom: '2rem' }} />
            {[
              `On <strong>13th October 2025</strong>, a gap was noticed — the Computer Department had no structured student network. No platform for peer mentorship, no central hub for resources, no unified community identity.`,
              `<strong>CDSC@SCOE</strong> was founded to change that. A verified, multi-domain, student-driven community designed to outlast batches and establish a lasting legacy at Siddhant College of Engineering.`,
              `Our mission: <strong>Build. Share. Grow.</strong> — together, across every year and specialization in the department.`,
            ].map((p, i) => (
              <p key={i} style={{ color: '#8a9bb5', lineHeight: 1.9, fontSize: '1rem', fontWeight: 300, marginBottom: '1.2rem' }} dangerouslySetInnerHTML={{ __html: p.replace(/<strong>/g, '<strong style="color:#f8f6f0;font-weight:500">') }} />
            ))}
          </div>
          <div className="fade-up grid-features" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              { icon: '🧠', title: 'Peer Learning', desc: '1:1 doubt sessions, daily DSA challenges, and domain-specific mentorship.' },
              { icon: '🤝', title: 'Collaboration', desc: 'Cross-year, cross-domain projects and team-building opportunities.' },
              { icon: '📚', title: 'Resources', desc: 'Verified notes, roadmaps, free certifications, and curated study material.' },
              { icon: '🚀', title: 'Career Growth', desc: 'LinkedIn mentorship, resume building, GATE prep, and placement guidance.' },
            ].map(p => (
              <div key={p.title} style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.2)',
                borderRadius: 6, padding: '1.4rem', transition: 'border-color 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#c9a84c')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)')}>
                <div style={{ fontSize: '1.4rem', marginBottom: '0.6rem' }}>{p.icon}</div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.4rem' }}>{p.title}</div>
                <div style={{ fontSize: '0.8rem', color: '#8a9bb5', lineHeight: 1.6 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOMAINS ── */}
      <section id="domains" style={{ padding: '6rem 4rem' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <div className="fade-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
            <div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.72rem', color: '#c9a84c', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '0.75rem' }}>// Active Domains</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, lineHeight: 1.2 }}>14 Specialized<br />Technical Tracks</h2>
              <div style={{ width: 50, height: 2, background: '#c9a84c', marginTop: '1rem' }} />
            </div>
            <p style={{ color: '#8a9bb5', fontSize: '0.85rem', maxWidth: 280, textAlign: 'right', lineHeight: 1.7 }}>
              Each domain is student-led with a dedicated team, resources, and regular sessions.
            </p>
          </div>
          <div className="fade-up grid-domains" style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1px', background: 'rgba(201,168,76,0.12)',
            border: '1px solid rgba(201,168,76,0.12)', borderRadius: 8, overflow: 'hidden',
          }}>
            {DOMAINS.map(d => (
              <div key={d.name} className="domain-card" style={{
                background: '#0a1628', padding: '2rem 1.5rem',
                position: 'relative', overflow: 'hidden', transition: 'background 0.25s',
              }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>{d.icon}</div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem' }}>{d.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#8a9bb5', fontFamily: "'DM Mono', monospace" }}>{d.lead}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section id="team" style={{ background: '#112240', borderTop: '1px solid rgba(201,168,76,0.15)', borderBottom: '1px solid rgba(201,168,76,0.15)', padding: '6rem 4rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="fade-up" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.72rem', color: '#c9a84c', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '0.75rem' }}>// The People</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700 }}>Core Founding Team</h2>
            <div style={{ width: 50, height: 2, background: '#c9a84c', margin: '1rem auto 0' }} />
          </div>
          <div className="fade-up grid-team" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            {FOUNDERS.map(f => (
              <div key={f.name} style={{
                background: '#0a1628',
                border: `1px solid ${f.lead ? '#c9a84c' : 'rgba(201,168,76,0.2)'}`,
                borderRadius: 8, padding: '2rem 1.5rem', textAlign: 'center',
                position: 'relative', overflow: 'hidden', transition: 'transform 0.25s, box-shadow 0.25s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.3)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}>
                {f.lead && (
                  <div style={{
                    position: 'absolute', top: '0.8rem', right: '0.8rem',
                    fontFamily: "'DM Mono', monospace", fontSize: '0.6rem',
                    color: '#c9a84c', letterSpacing: '1.5px',
                    border: '1px solid #c9a84c', padding: '0.15rem 0.5rem', borderRadius: 2,
                  }}>FOUNDER</div>
                )}
                <div style={{
                  width: 72, height: 72, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1a3a6b, #112240)',
                  border: '2px solid rgba(201,168,76,0.25)',
                  margin: '0 auto 1rem', display: 'grid', placeItems: 'center',
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.5rem', fontWeight: 700, color: '#c9a84c',
                }}>{f.initial}</div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.3rem' }}>{f.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#8a9bb5', lineHeight: 1.5 }}>{f.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section id="timeline" style={{ padding: '6rem 4rem' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div className="fade-up" style={{ marginBottom: '3rem' }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.72rem', color: '#c9a84c', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '0.75rem' }}>// Journey</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700 }}>Milestones & Timeline</h2>
            <div style={{ width: 50, height: 2, background: '#c9a84c', marginTop: '1rem' }} />
          </div>
          <div style={{ position: 'relative', paddingLeft: '3rem' }}>
            <div style={{ position: 'absolute', left: '0.5rem', top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom, #c9a84c, transparent)' }} />
            {TIMELINE.map((item, i) => (
              <div key={i} className="timeline-item" style={{ position: 'relative', marginBottom: '2.5rem' }}>
                <div style={{
                  position: 'absolute', left: '-2.65rem', top: '0.3rem',
                  width: 10, height: 10, background: '#c9a84c', borderRadius: '50%',
                  border: '2px solid #0a1628', boxShadow: '0 0 0 3px rgba(201,168,76,0.2)',
                }} />
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.72rem', color: '#c9a84c', letterSpacing: '1px', marginBottom: '0.4rem' }}>{item.date}</div>
                <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '0.3rem' }}>{item.title}</div>
                <div style={{ fontSize: '0.85rem', color: '#8a9bb5', lineHeight: 1.7 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESOURCES ── */}
      <section id="resources" style={{ background: '#112240', borderTop: '1px solid rgba(201,168,76,0.15)', borderBottom: '1px solid rgba(201,168,76,0.15)', padding: '6rem 4rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="fade-up" style={{ marginBottom: '3rem' }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.72rem', color: '#c9a84c', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '0.75rem' }}>// Knowledge Hub</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700 }}>Resources & Study Material</h2>
            <div style={{ width: 50, height: 2, background: '#c9a84c', margin: '1rem 0' }} />
            <p style={{ color: '#8a9bb5', fontSize: '0.9rem' }}>Verified content created and curated by community members. Full access for verified members.</p>
          </div>
          <div className="fade-up grid-resources" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {RESOURCES.map((r, i) => (
              <div key={i} style={{
                background: '#0a1628', border: '1px solid rgba(201,168,76,0.15)',
                borderRadius: 8, padding: '1.8rem', transition: 'all 0.25s', cursor: 'pointer',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#c9a84c'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.15)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', color: '#c9a84c', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ width: 4, height: 4, background: '#c9a84c', borderRadius: '50%' }} />{r.tag}
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.5rem', lineHeight: 1.4 }}>{r.title}</div>
                <div style={{ fontSize: '0.8rem', color: '#8a9bb5' }}>{r.meta}</div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                  fontSize: '0.72rem', color: '#8a9bb5', marginTop: '1rem',
                  padding: '0.3rem 0.7rem', border: '1px solid rgba(138,155,181,0.2)', borderRadius: 3,
                }}>{r.access}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── JOIN CTA ── */}
      <section id="join" style={{ padding: '8rem 4rem', textAlign: 'center' }}>
        <div className="fade-up" style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{
            display: 'inline-block', fontFamily: "'DM Mono', monospace", fontSize: '0.7rem',
            color: '#c9a84c', letterSpacing: '2px', border: '1px solid rgba(201,168,76,0.2)',
            padding: '0.4rem 1rem', borderRadius: 2, marginBottom: '1.5rem',
          }}>Open for All Years · Computer Dept · SCOE</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700, marginBottom: '1rem' }}>
            Ready to Be Part of<br />Something Bigger?
          </h2>
          <p style={{ color: '#8a9bb5', lineHeight: 1.8, marginBottom: '2.5rem', fontSize: '1rem' }}>
            Join 119+ verified students already learning, building, and growing together. Verification is required to maintain a credible, disciplined community environment.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/auth/signup" className="btn-primary">Apply for Membership →</Link>
            <a href="mailto:cdscscoe@gmail.com" className="btn-secondary">📧 Contact Us</a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#060e1a', borderTop: '1px solid rgba(201,168,76,0.15)', padding: '3rem 4rem' }}>
        <div className="footer-content" style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 700, color: '#c9a84c', marginBottom: '0.4rem' }}>CDSC@SCOE</div>
            <p style={{ fontSize: '0.78rem', color: '#8a9bb5' }}>Computer Department Student Community<br />Siddhant College of Engineering, Pune</p>
          </div>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {[
              { label: 'LinkedIn', href: 'https://linkedin.com/in/cdsc-2025-scoe' },
              { label: 'GitHub', href: 'https://github.com/cdscscoe' },
              { label: 'YouTube', href: 'https://youtube.com/@CDSCSCOE' },
              { label: 'Instagram', href: 'https://instagram.com/cdscscoe' },
              { label: 'Twitter', href: 'https://x.com/cdscscoe' },
            ].map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" style={{ fontSize: '0.8rem', color: '#8a9bb5', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#c9a84c')}
                onMouseLeave={e => (e.currentTarget.style.color = '#8a9bb5')}>{l.label}</a>
            ))}
          </div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.72rem', color: 'rgba(138,155,181,0.5)' }}>© 2025 CDSC@SCOE · EST. OCT 13</div>
        </div>
      </footer>
    </div>
  )
}
