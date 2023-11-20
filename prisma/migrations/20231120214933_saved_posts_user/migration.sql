/*
  Warnings:

  - Added the required column `usersId` to the `SavedPosts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SavedPosts" ADD COLUMN     "usersId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "SavedPosts" ADD CONSTRAINT "SavedPosts_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
