import DrawerNavLeft from '@/components/DrawerNavLeft'
import type { Metadata } from 'next'
import { RiUserSettingsLine } from "react-icons/ri";
import { FaLock  } from "react-icons/fa";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';

export const metadata: Metadata = {
  title: 'Change password | SocialMediaApp',
  description: 'Change password page of SocialMediaApp',
}

const page = async () => {
  const session = await getServerSession(authOptions)
  const user = await prisma.users.findFirst({where: {username: session?.user?.username}})
  const groups = await prisma.groups.findMany({where: {UserInGroup: {some: {usersId: user?.id}}}, include: {
    _count: {select: {UserInGroup: true}}
  }})

  return (
    <main className='w-full flex flex-row items-center justify-center'>
      <div className='w-10/12 flex flex-row justify-center mt-24 max-w-[1700px] lg:justify-between lg:mt-28'>
        <DrawerNavLeft groups={groups} user={{username: user?.username, profileImg: user?.profileImg?.toString(), profileImgAlt: user?.profileImgAlt?.toString()}}/>
        <div className='flex flex-col w-full md:w-[600px] lg:w-7/12 xl:w-5/12'>
          <div className='flex flex-col mb-8 border-b border-b-[#222] pb-5'>
            <h1 className='text-2xl tracking-wider pt-3 flex items-center'><RiUserSettingsLine size={25} className='mr-3'/>Change Password</h1>
          </div>
          <form className='flex flex-col justify-center w-full'>
            <div className='flex flex-col items-start justify-center px-4 w-full py-1 rounded-md bg-[#060606]'>
              <label className='mt-2 pb-3 tracking-wide border-b border-b-[#222] w-full font-medium'>Old Password</label>
              <div className='flex flex-row w-full items-center'>
                <input className='w-full py-3 bg-transparent outline-none' type='password' placeholder='Old password' name='oldPassword'/>
                <FaLock className='ml-4'/>
              </div>
            </div>
            <div className='flex flex-col items-start justify-center px-4 w-full py-1 my-5 rounded-md bg-[#060606]'>
              <label className='mt-2 pb-3 tracking-wide border-b border-b-[#222] w-full font-medium'>New Password</label>
              <div className='flex flex-row w-full items-center'>
                <input className='w-full py-3 bg-transparent outline-none' type='password' placeholder='New password' name='newPassword'/>
                <FaLock className='ml-4'/>
              </div>
            </div>
            <div className='flex flex-col items-start justify-center px-4 w-full py-1 rounded-md bg-[#060606]'>
              <label className='mt-2 pb-3 tracking-wide border-b border-b-[#222] w-full font-medium'>Repeat new Password</label>
              <div className='flex flex-row w-full items-center'>
                <input className='w-full py-3 bg-transparent outline-none' type='password' placeholder='Repeat new password' name='repeatNewPassword'/>
                <FaLock className='ml-4'/>
              </div>
            </div>
            <div className='flex flex-col md:flex-row'>
              <button type='submit' className='w-full bg-blue-500 text-white border-none py-2 tracking-wide rounded-md mt-5'>Change password</button>           
            </div>
          </form>
        </div>
        <div className="hidden xl:flex flex-col lg:w-3/12 lg:max-w-[270px]"></div>
      </div>
    </main>
  )
}

export default page