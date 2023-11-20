/*
  Warnings:

  - Added the required column `postsId` to the `PostComments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PostComments" ADD COLUMN     "postsId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "PostComments" ADD CONSTRAINT "PostComments_postsId_fkey" FOREIGN KEY ("postsId") REFERENCES "Posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
