ALTER TABLE "like" ADD CONSTRAINT "like_userId_postId_pk" PRIMARY KEY("userId","postId");--> statement-breakpoint
ALTER TABLE "like" DROP COLUMN IF EXISTS "id";