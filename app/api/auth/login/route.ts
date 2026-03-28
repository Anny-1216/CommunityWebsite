import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  console.log('🔐 [API] Login attempt:', email)

  const response = NextResponse.json({ success: true }, { status: 200 })
  const cookieStore = cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            console.log(`[API] Setting cookie on Response: ${name}`)
            response.cookies.set({
              name,
              value,
              ...options,
              path: '/',
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
            })
          })
        },
      },
    }
  )

  const { error, data } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    console.error('❌ [API] Auth error:', error.message)
    return NextResponse.json({ error: error.message }, { status: 401 })
  }

  if (!data.user || !data.session) {
    console.error('❌ [API] No session')
    return NextResponse.json({ error: 'Auth failed' }, { status: 401 })
  }

  console.log('✅ [API] Login succeeded for:', data.user.id)
  
  if (data.session) {
    const projectId = process.env.NEXT_PUBLIC_SUPABASE_URL!.match(/:\/\/(.*?)\.supabase\.co/)?.[1]
    if (projectId) {
      const authCookieName = `sb-${projectId}-auth-token`
      console.log(`[API] Manually fixing missing cookie inside Next.js response: ${authCookieName}`)
      
      response.cookies.set({
        name: authCookieName,
        value: JSON.stringify([data.session.access_token, data.session.refresh_token]),
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      })
    }
  }

  return response
}