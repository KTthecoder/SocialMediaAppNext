-- DropForeignKey
ALTER TABLE "UserInGroup" DROP CONSTRAINT "UserInGroup_groupsId_fkey";

-- AddForeignKey
ALTER TABLE "UserInGroup" ADD CONSTRAINT "UserInGroup_groupsId_fkey" FOREIGN KEY ("groupsId") REFERENCES "Groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
