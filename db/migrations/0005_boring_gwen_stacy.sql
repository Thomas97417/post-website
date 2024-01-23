ALTER TABLE "like" DROP CONSTRAINT "like_userId_postId_pk";--> statement-breakpoint
ALTER TABLE "like" ADD COLUMN "id" text NOT NULL;