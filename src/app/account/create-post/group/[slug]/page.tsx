import DrawerNavLeft from '@/components/DrawerNavLeft'
import type { Metadata } from 'next'

import { RiPlayListAddFill } from "react-icons/ri";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';
import { notFound } from 'next/navigation';
import CreatePostForm from '@/components/forms/CreatePostForm';
import CreateGroupForm from '@/components/forms/CreateGroupForm';
import CreateGroupPostForm from '@/components/forms/CreateGroupPostForm';

type Props = {
    params: {
        slug: string
    }
}

export const metadata: Metadata = {
  title: 'Create post | SocialMediaApp',
  description: 'Create post page of SocialMediaApp',
}

const page = async (props: Props) => {
  const session = await getServerSession(authOptions)
  const user = await prisma.users.findFirst({where: {username: session?.user.username}, select: {
    username: true,
    profileImg: true,
    profileImgAlt: true,
    id: true,
  }})
  const group = await prisma.groups.findFirst({where: {id: props.params.slug}, select: {
    name: true,
    id: true
  }})

  const groups = await prisma.groups.findMany({where: {UserInGroup: {some: {usersId: user?.id}}}, include: {
    _count: {select: {UserInGroup: true}}
  }})

  if(!session?.user || !user){
    return notFound()
  }

  return (
    <main className='w-full flex flex-row items-center justify-center'>
      <div className='w-10/12 flex flex-row justify-center mt-24 max-w-[1700px] lg:justify-between lg:mt-28'>
        <DrawerNavLeft groups={groups} user={{username: user?.username, profileImg: user?.profileImg?.toString(), profileImgAlt: user?.profileImgAlt?.toString()}}/>
        <div className='flex flex-col w-full md:w-[600px] lg:w-7/12 xl:w-5/12'>
          <div className='flex flex-col mb-6 border-b border-b-[#111] pb-5'>
            <h1 className='text-2xl tracking-wider pt-3 flex items-center'><RiPlayListAddFill size={25} className='mr-3'/>Create Post In Group</h1>
          </div>
          <CreateGroupPostForm username={user.username} group={{id: props.params.slug, image: '', name: group?.name}}/>
        </div>
        <div className="hidden xl:flex flex-col lg:w-3/12 lg:max-w-[270px]"></div>
      </div>
    </main>
  )
}

export default page