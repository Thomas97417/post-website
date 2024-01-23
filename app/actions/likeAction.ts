import { db } from "@/db";
import { likes } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export const handleLike = async ({
  user,
  post,
}: {
  user: string;
  post: string;
}) => {
  const existingLike = await db
    .select()
    .from(likes)
    .where(and(eq(likes.userId, user), eq(likes.postId, post)));
  console.log("number of likes : ", JSON.stringify(existingLike));

  if (existingLike.length > 0) {
    await db
      .delete(likes)
      .where(and(eq(likes.userId, user), eq(likes.postId, post)))
      .execute();
  } else {
    await db
      .insert(likes)
      .values({
        userId: user,
        postId: post,
      })
      .returning();
  }

  // await db
  //   .insert(likes)
  //   .values({
  //     userId: user,
  //     postId: post,
  //   })
  //   .returning();
};
