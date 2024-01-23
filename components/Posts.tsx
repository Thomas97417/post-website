import React from 'react'

import {db } from "@/db"
import { likes, posts, users } from "@/db/schema"
import { auth } from '@/app/(auth)/auth'
import { eq, desc } from 'drizzle-orm';
import Image from 'next/image';
import { Repeat2 } from 'lucide-react';
import LikeButton from './LikeButton';

type allPosts = {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  likeCounter: number | null;
  rePostCounter: number | null;
}

const Posts = async ({location}: {location: string}) => {

  const session = await auth()
  let allPosts: allPosts[] = []
  let likedPosts
  if(location === "me") {
    allPosts = await db.select().from(posts).where(eq(posts.userId, session?.user.id || ''))
  }
  if(location === "home") {
    allPosts = await db.select().from(posts).limit(10).orderBy(posts.createdAt)
  }
  if(location === "like") {
    likedPosts = await db.select().from(likes).where(eq(likes.userId, session?.user.id || ''))
    console.log("liked posts : ", likedPosts)
  }
  
  const infoCreatorPromises = allPosts.map((post) => {
    return db.select().from(users).where(eq(users.id, post.userId))
  })
  const infoCreator = await Promise.all(infoCreatorPromises)
  return (
    <div className='flex flex-col gap-y-4'>
      {allPosts.map((post, index) => {
        return (
          <div key={index} className='border rounded p-4 flex flex-col'>
            <div className='flex flex-row h-[120px] gap-x-2 w-full'>
              <Image
                src={infoCreator[index][0].image || '/nextjs.svg'}
                alt="Next.js Logo"
                width={50}
                height={50}
                className='rounded-full h-12 w-12'
              />
              <div className='flex flex-col gap-y-1 w-full'>
                <p className='text-sm font-bold'>{infoCreator[index][0].name}</p>
                <p className='text-sm text-gray-400'>{post.content}</p>
              </div>
            </div>
            <div className='flex flex-row gap-x-2'>
              <div className='flex flex-row gap-x-2'>
                <LikeButton user={session?.user.id as string} post={post.id}/>
                <h1 className='text-gray-400'>{post.likeCounter}</h1>
              </div>
              <div className='flex gap-x-2 ml-4'>
                <Repeat2 className='text-gray-400' />
                <h1 className='text-gray-400'>{post.rePostCounter}</h1>
              </div>
            </div>
          </div>
        )
    })}
    </div>
  )
}

export default Posts