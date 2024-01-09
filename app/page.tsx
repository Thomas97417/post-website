import SignInButton from '@/components/SignInButton'

import { auth } from './(auth)/auth'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export default async function Home() {
  const session = await auth()
  return (
    <main className="flex min-h-screen flex-col items-center gap-6 p-24">
      <p className='text-2xl font-bold'>Main Page</p>
      <Link className={buttonVariants({variant: "default"})} href='/me'>Profile</Link>
      <SignInButton />
    </main>
  )
}
