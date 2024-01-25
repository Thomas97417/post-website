"use server";
import { db } from "@/db";
import { likes, posts } from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";

export const handleLike = async ({
  user,
  post,
}: {
  user: string;
  post: string;
}) => {
  // Fetch the current post
  const currentPost = await db
    .select()
    .from(posts)
    .where(eq(posts.id, post))
    .execute();

  console.log("previous number of like : ", currentPost[0].likeCounter);

  const existingLike = await db
    .select()
    .from(likes)
    .where(and(eq(likes.userId, user), eq(likes.postId, post)));
  // console.log("number of likes : ", JSON.stringify(existingLike));

  if (existingLike.length > 0) {
    // DELETE AND DECREMENT LIKE COUNTER
    await db
      .delete(likes)
      .where(and(eq(likes.userId, user), eq(likes.postId, post)))
      .execute();

    await db
      .update(posts)
      .set({
        likeCounter: sql`${currentPost[0].likeCounter} - 1`,
      })
      .where(eq(posts.id, post))
      .execute();
  } else {
    // INSERT AND INCREMENT LIKE COUNTER
    await db
      .insert(likes)
      .values({
        userId: user,
        postId: post,
      })
      .returning();

    await db
      .update(posts)
      .set({
        likeCounter: sql`${currentPost[0].likeCounter} + 1`,
      })
      .where(eq(posts.id, post))
      .execute();
  }

  // revalidatePath("/like");
};
