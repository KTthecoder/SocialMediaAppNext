import DrawerNavLeft from '@/components/DrawerNavLeft'
import FriendBlock from '@/components/FriendBlock'
import type { Metadata } from 'next'
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import { getServerSession } from 'next-auth';
import prisma from '@/lib/db';
import { authOptions } from '@/lib/auth';

type Props = {}

export const metadata: Metadata = {
  title: 'Friends | SocialMediaApp',
  description: 'Friends page of SocialMediaApp',
}

const page = async (props: Props) => {
  const session = await getServerSession(authOptions)
  const user = await prisma.users.findFirst({where: {username: session?.user?.username}})
  const friends = await prisma.friends.findMany({ where: {
    OR: [{
      user1Id: user?.id,
    }, {
      user2Id: user?.id
    }]
  }})

  const groups = await prisma.groups.findMany({where: {UserInGroup: {some: {usersId: user?.id}}}, include: {
    _count: {select: {UserInGroup: true}}
  }})

  if(!friends){
    console.log(friends)
  }
  
  return (
    <main className='w-full flex flex-row items-center justify-center'>
      <div className='w-10/12 flex flex-row justify-center mt-24 max-w-[1700px] lg:justify-between lg:mt-28'>
        <DrawerNavLeft groups={groups} user={{username: user?.username, profileImg: user?.profileImg?.toString(), profileImgAlt: user?.profileImgAlt?.toString()}}/>
        <div className='flex flex-col w-full lg:w-8/12 2xl:w-9/12'>
          <h1 className='text-2xl tracking-wider pt-3 pb-5 mb-10 border-b border-b-[#111] flex items-center'><MdOutlineMarkEmailUnread  size={25} className='mr-3'/> Friend Invitations</h1>
          <div className='w-full grid grid-cols-2 gap-5 sm:grid-cols-3 lg-ml-10 xl:grid-cols-4 xl:gap-7 2xl:grid-cols-5'>
            <FriendBlock/>
            <FriendBlock/>
            <FriendBlock/>
            <FriendBlock/>
            <FriendBlock/>
          </div>
          <h1 className='text-2xl tracking-wider pt-10 pb-5 mb-10 border-b border-b-[#111] flex items-center'><LuUsers size={25} className='mr-3'/> Your Friends</h1>
          <div className='w-full grid grid-cols-2 gap-5 sm:grid-cols-3 lg-ml-10 xl:grid-cols-4 xl:gap-7 2xl:grid-cols-5'>
            {!friends ? <FriendBlock/> : <h1>You have 0 friends</h1>}
          </div>
        </div>
      </div>
    </main>
  )
}

export default page