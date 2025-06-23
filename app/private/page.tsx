'use server'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export default async function PrivatePage() {
  const supabase = await createClient()
  {/* If user DNE, it redirects the user back to the login page*/ }
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }
  // If user exists, it returns the user's email
  return <p className="flex min-h-screen flex-col items-center justify-between p-24">Hello {data.user.email}</p>
}