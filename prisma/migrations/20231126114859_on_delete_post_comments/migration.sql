-- DropForeignKey
ALTER TABLE "PostComments" DROP CONSTRAINT "PostComments_postsId_fkey";

-- AddForeignKey
ALTER TABLE "PostComments" ADD CONSTRAINT "PostComments_postsId_fkey" FOREIGN KEY ("postsId") REFERENCES "Posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
