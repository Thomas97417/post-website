import React from 'react'
import { auth } from '../(auth)/auth'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { CharactersCounter, CharactersTextArea, TextProvider } from '@/components/CharactersCounter'

import {db } from "@/db"
import { posts } from "@/db/schema"
import { redirect } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid';

const PostsPage = async () => {
  const session = await auth()

  async function handleSubmit(formData: FormData) {
    "use server"
    if(!session?.user) return
    const content = formData.get('content') as string
    const id = uuidv4()
    console.log("create a new posts : ", content)
    const result = await db.insert(posts).values({
      id: id,
      content: content,
      userId: session?.user.id || 'null',
    }).returning()

    redirect('/me')
  }

  return (
    <form action={handleSubmit} className='min-h-screen flex flex-col gap-y-4 mt-4'>
      <TextProvider>
        <div className='w-full border rounded-lg flex flex-col gap-y-2 p-4 mt-4'>
          <div className='flex flex-row h-[120px] gap-x-2 w-full'>
            <Image
              src={session?.user?.image || '/nextjs.svg'}
              alt="Profile Picture"
              width={50}
              height={50}
              className='rounded-full h-12 w-12'
            />
            <div className='flex flex-col gap-y-1 w-full'>
              <p className='text-sm font-bold'>{session?.user.name}</p>
                <CharactersTextArea />
            </div>
          </div>
          <div className='flex flex-row justify-between items-center'>
            <CharactersCounter />
            <Button type='submit' variant='ghost' className='border'>Post</Button>
          </div>
        </div>
      </TextProvider>
    </form>
  )
}

export default PostsPage