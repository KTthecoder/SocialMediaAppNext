-- DropForeignKey
ALTER TABLE "PostImages" DROP CONSTRAINT "PostImages_postId_fkey";

-- AddForeignKey
ALTER TABLE "PostImages" ADD CONSTRAINT "PostImages_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
