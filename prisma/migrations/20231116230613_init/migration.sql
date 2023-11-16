-- CreateEnum
CREATE TYPE "GroupStatus" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "profileImg" TEXT NOT NULL,
    "profileImgAlt" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Friends" (
    "id" SERIAL NOT NULL,
    "user1Id" TEXT NOT NULL,
    "user2Id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Friends_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Groups" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "GroupStatus" NOT NULL DEFAULT 'PUBLIC',

    CONSTRAINT "Groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserInGroup" (
    "id" SERIAL NOT NULL,
    "usersId" TEXT NOT NULL,
    "groupsId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserInGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Posts" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "disLikes" INTEGER NOT NULL DEFAULT 0,
    "groupsId" TEXT,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedPosts" (
    "id" SERIAL NOT NULL,
    "postsId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedPosts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LikedPosts" (
    "id" SERIAL NOT NULL,
    "usersId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "LikedPosts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisLikedPosts" (
    "id" SERIAL NOT NULL,
    "usersId" TEXT NOT NULL,
    "postsId" TEXT NOT NULL,

    CONSTRAINT "DisLikedPosts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostComments" (
    "id" SERIAL NOT NULL,
    "usersId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PostComments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LikedComments" (
    "id" SERIAL NOT NULL,
    "usersId" TEXT NOT NULL,
    "postCommentsId" INTEGER NOT NULL,

    CONSTRAINT "LikedComments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostImages" (
    "id" SERIAL NOT NULL,
    "src" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "PostImages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Groups_name_key" ON "Groups"("name");

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_user1Id_fkey" FOREIGN KEY ("user1Id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_user2Id_fkey" FOREIGN KEY ("user2Id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInGroup" ADD CONSTRAINT "UserInGroup_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInGroup" ADD CONSTRAINT "UserInGroup_groupsId_fkey" FOREIGN KEY ("groupsId") REFERENCES "Groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_groupsId_fkey" FOREIGN KEY ("groupsId") REFERENCES "Groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedPosts" ADD CONSTRAINT "SavedPosts_postsId_fkey" FOREIGN KEY ("postsId") REFERENCES "Posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikedPosts" ADD CONSTRAINT "LikedPosts_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikedPosts" ADD CONSTRAINT "LikedPosts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisLikedPosts" ADD CONSTRAINT "DisLikedPosts_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisLikedPosts" ADD CONSTRAINT "DisLikedPosts_postsId_fkey" FOREIGN KEY ("postsId") REFERENCES "Posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostComments" ADD CONSTRAINT "PostComments_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikedComments" ADD CONSTRAINT "LikedComments_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikedComments" ADD CONSTRAINT "LikedComments_postCommentsId_fkey" FOREIGN KEY ("postCommentsId") REFERENCES "PostComments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostImages" ADD CONSTRAINT "PostImages_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
