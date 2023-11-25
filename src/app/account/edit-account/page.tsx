import DrawerNavLeft from '@/components/DrawerNavLeft'
import type { Metadata } from 'next'
import ProfileImg from '@/static/images/shortImg.jpeg'
import { RiUserSettingsLine } from "react-icons/ri";
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { notFound } from 'next/navigation';
import EditAccountForm from '@/components/forms/EditAccountForm';

export const metadata: Metadata = {
  title: 'Edit Account | SocialMediaApp',
  description: 'Edit Account page of SocialMediaApp',
}

type Props = {}

const page = async (props: Props) => {
  const session = await getServerSession(authOptions)
  const user = await prisma.users.findFirst({where: {username: session?.user?.username}})
  const groups = await prisma.groups.findMany({where: {UserInGroup: {some: {usersId: user?.id}}}, include: {
    _count: {select: {UserInGroup: true}}
  }})

  if(session?.user){
    return (
      <main className='w-full flex flex-row items-center justify-center'>
        <div className='w-10/12 flex flex-row justify-center mt-24 max-w-[1700px] lg:justify-between lg:mt-28'>
          <DrawerNavLeft groups={groups} user={{username: user?.username, profileImg: user?.profileImg?.toString(), profileImgAlt: user?.profileImgAlt?.toString()}}/>
          <div className='flex flex-col w-full md:w-[600px] lg:w-7/12 xl:w-5/12'>
            <div className='flex flex-col mb-8 border-b border-b-[#111] pb-5'>
              <h1 className='text-2xl tracking-wider pt-3 flex items-center'><RiUserSettingsLine size={25} className='mr-3'/>Edit Profile</h1>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <img className='w-[70px] aspect-square rounded-full' src={ProfileImg.src} alt='Profile'/>
              <button className='text-blue-500 mt-4'>Change image</button>
            </div>
            {user != null ? <EditAccountForm username={user.username} description={user.description} id={session.user.id}/> : null}
          </div>
          <div className="hidden xl:flex flex-col lg:w-3/12 lg:max-w-[270px]"></div>
        </div>
      </main>
    )
  }

  return notFound()
}

export default page