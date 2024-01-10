import React from 'react'
import { auth } from '../(auth)/auth'
import { redirect } from 'next/navigation'
import SignOutButton from '@/components/SignOutButton'
import Image from 'next/image'
import Posts from '@/components/Posts'

const Profil = async () => {
  const session = await auth()
  if(!session?.user) return redirect('/')
  return (
    <main className="min-h-screen mt-12">
      <div className='flex flex-row'>
        <div className='flex flex-col w-full justify-start'>
          <p className='text-xl font-bold'>{session.user.name}</p>
          <p className='text-sm'>{session.user.email}</p>
        </div>
        <Image
          src={session?.user?.image || '/nextjs.svg'}
          alt="Next.js Logo"
          width={60}
          height={60}
          className='rounded-full'
        />
      </div>

      <div className='mt-8'>
        <Posts />
      </div>
    </main>
  )
}

export default Profil