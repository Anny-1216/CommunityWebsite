import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email, password, fullName, year, rollNo, selectedDomains } = await request.json()

  if (!email || !password || !fullName || !year || !rollNo) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    )
  }

  // FIX 1: Create response FIRST
  const response = NextResponse.json({ user: null }, { status: 201 })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookies().getAll()
        },
        setAll(cookiesToSet: Array<{ name: string; value: string; options?: Record<string, unknown> }>) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set({
              name,
              value,
              ...options,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              path: '/',
            })
          })
        },
      },
    }
  )
  
  // Create the user account
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        year,
        roll_no: rollNo,
        domains: selectedDomains || [],
      },
      emailRedirectTo: `${new URL(request.url).origin}/auth/callback`,
    },
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  // After signup, try to auto-login if email confirmation is not required
  if (data.user) {
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (loginError) {
      // If auto-login fails, return success anyway (user will need to verify email first)
      return NextResponse.json({ 
        user: data.user,
        message: 'Signup successful. Please check your email to verify your account.' 
      }, { status: 201 })
    }
    
    // FIX 3: Force session sync
    await supabase.auth.getSession()
  }

  return response
}
