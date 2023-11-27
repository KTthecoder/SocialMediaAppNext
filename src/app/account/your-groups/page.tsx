import DrawerNavLeft from '@/components/DrawerNavLeft'
import type { Metadata } from 'next'
import { GrGroup } from "react-icons/gr";
import GroupHorizontal from '@/components/GroupHorizontal';
import Link from 'next/link';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Search | SocialMediaApp',
  description: 'Search page of SocialMediaApp',
}

const page = async () => {
  const session = await getServerSession(authOptions)
  const user = await prisma.users.findFirst({where: {username: session?.user.username}, select: {
    username: true,
    profileImg: true,
    profileImgAlt: true,
    id: true,
  }})
  const groups = await prisma.groups.findMany({where: {UserInGroup: {some: {usersId: user?.id}}}, orderBy: {createdAt: 'desc'}, include: {
    _count: {select: {
      UserInGroup: true
    }}
  }})
  const groupsCounter = await prisma.groups.findMany({where: {UserInGroup: {some: {usersId: user?.id}}}, include: {
    _count: {select: {UserInGroup: true}}
  }})

  return (
    <main className='w-full flex flex-row items-center justify-center'>
      <div className='w-10/12 flex flex-row justify-center mt-24 max-w-[1700px] lg:justify-between lg:mt-28'>
        <DrawerNavLeft groups={groupsCounter} user={{username: user?.username, profileImg: user?.profileImg?.toString(), profileImgAlt: user?.profileImgAlt?.toString()}}/>
        <div className='flex flex-col w-full md:w-[600px] lg:w-7/12 xl:w-5/12'>
          <div className='flex flex-col mb-7 border-b border-b-[#111] pb-5 sm:justify-between sm:flex-row sm:w-full'>
            <h1 className='text-2xl tracking-wider pt-3 flex items-center'><GrGroup size={25} className='mr-3'/>Your Groups</h1>
            <Link href='/create-group' className='bg-blue-500 rounded-md py-1 text-center w-36 mt-4 sm:py-2'>Create group</Link>
          </div>
          {groups.length === 0 ? <h1 className='-mt-2'>You are in 0 groups</h1> : 
          groups.map((item, key) => (
            <GroupHorizontal isAdmin={true} username={user?.username} image={item.image != null ? item.image : ''} id={item.id} description={item.description} name={item.name} usersCount={item._count} visible={item.status} key={key}/>
          ))}
          {groups.length < 3 ? null : <Link className='bg-[#0a0a0a] rounded-md py-2 text-center mb-5 mt-2' href='/search/groups/search-text'>Load more</Link>}
        </div>
        <div className="hidden xl:flex flex-col lg:w-3/12 lg:max-w-[270px]"></div>
      </div>
    </main>
  )
}

export default page