-- DropForeignKey
ALTER TABLE "DisLikedPosts" DROP CONSTRAINT "DisLikedPosts_postsId_fkey";

-- DropForeignKey
ALTER TABLE "LikedPosts" DROP CONSTRAINT "LikedPosts_postId_fkey";

-- DropForeignKey
ALTER TABLE "SavedPosts" DROP CONSTRAINT "SavedPosts_postsId_fkey";

-- AddForeignKey
ALTER TABLE "SavedPosts" ADD CONSTRAINT "SavedPosts_postsId_fkey" FOREIGN KEY ("postsId") REFERENCES "Posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikedPosts" ADD CONSTRAINT "LikedPosts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisLikedPosts" ADD CONSTRAINT "DisLikedPosts_postsId_fkey" FOREIGN KEY ("postsId") REFERENCES "Posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
