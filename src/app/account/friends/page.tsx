import DrawerNavLeft from '@/components/DrawerNavLeft'
import FriendBlock from '@/components/FriendBlock'
import type { Metadata } from 'next'
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import { getServerSession } from 'next-auth';
import prisma from '@/lib/db';
import { authOptions } from '@/lib/auth';
import { notFound } from 'next/navigation';

type Props = {}

export const metadata: Metadata = {
  title: 'Friends | SocialMediaApp',
  description: 'Friends page of SocialMediaApp',
}

const page = async (props: Props) => {
  const session = await getServerSession(authOptions)
  const user = await prisma.users.findFirst({where: {username: session?.user?.username}})
  const friendsPending = await prisma.friends.findMany({ where: {
    OR: [{
      user1Id: user?.id,
    }, {
      user2Id: user?.id
    }],
    isPending: true,
    user2Id: session?.user.id
  }, select:{
    id: true,
    user1: {
      select: {
        username: true,
        profileImg: true,
        profileImgAlt: true,
      }
    },
    user2: {
      select: {
        username: true,
        profileImg: true,
        profileImgAlt: true,
      }
    }
  }})
  const friends = await prisma.friends.findMany({ where: {
    OR: [{
      user1Id: user?.id,
    }, {
      user2Id: user?.id
    }],
    isPending: false
  }, select:{
    id: true,
    user1: {
      select: {
        username: true,
        profileImg: true,
        profileImgAlt: true,
      }
    },
    user2: {
      select: {
        username: true,
        profileImg: true,
        profileImgAlt: true,
      }
    },
  }})

  const groups = await prisma.groups.findMany({where: {UserInGroup: {some: {usersId: user?.id}}}, include: {
    _count: {select: {UserInGroup: true}}
  }})
  
  if(!session?.user){
    return notFound()
  }

  return (
    <main className='w-full flex flex-row items-center justify-center'>
      <div className='w-10/12 flex flex-row justify-center mt-24 max-w-[1700px] lg:justify-between lg:mt-28'>
        <DrawerNavLeft groups={groups} user={{username: user?.username, profileImg: user?.profileImg?.toString(), profileImgAlt: user?.profileImgAlt?.toString()}}/>
        <div className='flex flex-col w-full lg:w-8/12 2xl:w-9/12'>
          <h1 className='text-2xl tracking-wider pt-3 pb-5 mb-10 border-b border-b-[#111] flex items-center'><MdOutlineMarkEmailUnread  size={25} className='mr-3'/> Friend Invitations</h1>
          <div className='w-full grid grid-cols-2 gap-5 sm:grid-cols-3 lg-ml-10 xl:grid-cols-4 xl:gap-7 2xl:grid-cols-5'>
            {friendsPending.length === 0 ? <h1>You have 0 friends</h1> : friendsPending.map((item, key) => (
              item.user1.username === session?.user.username ? 
                <FriendBlock inviteId={item.id} type='Pending' username={item.user2.username} profileImg={item.user2.profileImg} profileImgAlt={item.user2.profileImgAlt} key={key}/>
              : item.user2.username === session?.user.username ? 
                <FriendBlock inviteId={item.id} type='Pending' username={item.user1.username} profileImg={item.user1.profileImg} profileImgAlt={item.user1.profileImgAlt} key={key}/>
              : null
            ))}
          </div>
          <h1 className='text-2xl tracking-wider pt-10 pb-5 mb-10 border-b border-b-[#111] flex items-center'><LuUsers size={25} className='mr-3'/> Your Friends</h1>
          <div className='w-full grid grid-cols-2 gap-5 sm:grid-cols-3 lg-ml-10 xl:grid-cols-4 xl:gap-7 2xl:grid-cols-5'>
            {friends.length === 0 ? <h1>You have 0 friends</h1> : friends.map((item, key) => (
              item.user1.username === session?.user.username ? 
                <FriendBlock inviteId={item.id} type='Friend' username={item.user2.username} profileImg={item.user2.profileImg} profileImgAlt={item.user2.profileImgAlt} key={key}/>
              : item.user2.username === session?.user.username ? 
                <FriendBlock inviteId={item.id} type='Friend' username={item.user1.username} profileImg={item.user1.profileImg} profileImgAlt={item.user1.profileImgAlt} key={key}/>
              : null
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default page