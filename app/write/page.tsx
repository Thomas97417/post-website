import React from 'react'
import { auth } from '../(auth)/auth'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { CharactersCounter, CharactersTextArea, TextProvider } from '@/components/CharactersCounter'

const PostsPage = async () => {
  const session = await auth()
  
  return (
    <div className='min-h-screen flex flex-col gap-y-4'>
      <TextProvider>
        <div className='w-full border rounded-lg flex flex-col gap-y-2 p-2 mt-4'>
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
            <Button variant='ghost' className='border'>Post</Button>
          </div>
        </div>
      </TextProvider>
    </div>
  )
}

export default PostsPage