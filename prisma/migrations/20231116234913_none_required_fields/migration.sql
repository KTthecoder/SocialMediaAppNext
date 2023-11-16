-- AlterTable
ALTER TABLE "Posts" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "profileImg" DROP NOT NULL,
ALTER COLUMN "profileImgAlt" DROP NOT NULL;
