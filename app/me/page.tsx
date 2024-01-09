import React from 'react'
import { auth } from '../(auth)/auth'
import { redirect } from 'next/navigation'
import SignOutButton from '@/components/SignOutButton'
import Image from 'next/image'

const Profil = async () => {
  const session = await auth()
  if(!session?.user) return redirect('/')
  return (
    <main className="flex min-h-screen flex-col items-center gap-6 p-24">
      <p className='text-2xl font-bold'>My Profile</p>

      <pre>
        {JSON.stringify(session.user, null, 8)}
      </pre>
      { session?.user ? <p>Connected</p> : <p>Not Connected</p>}
      <Image
        src={session?.user?.image || '/nextjs.svg'}
        alt="Next.js Logo"
        width={50}
        height={50}
      />
      <div className='mt-4'>
        <SignOutButton />
      </div>
    </main>
  )
}

export default Profil