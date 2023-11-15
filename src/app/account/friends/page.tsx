import Article from '@/components/Article'
import DrawerNavLeft from '@/components/DrawerNavLeft'
import DrawerNavRight from '@/components/DrawerNavRight'
import FriendBlock from '@/components/FriendBlock'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Friends | SocialMediaApp',
  description: 'Friends page of SocialMediaApp',
}
type Props = {}

const page = (props: Props) => {
  return (
    <main className='w-full flex flex-row items-center justify-center'>
      <div className='w-10/12 flex flex-row justify-center mt-24 max-w-[1700px] lg:justify-between lg:mt-28'>
        <DrawerNavLeft/>
        <div className='flex flex-col w-full lg:w-8/12 2xl:w-9/12'>
            <h1 className='text-2xl tracking-wider pt-3 pb-4 px-4 mb-6 rounded-md bg-[#080808]'>Friend Invitations</h1>
            <div className='w-full grid grid-cols-2 gap-5 sm:grid-cols-3 lg-ml-10 xl:grid-cols-4 xl:gap-7 2xl:grid-cols-5'>
                <FriendBlock/>
                <FriendBlock/>
                <FriendBlock/>
                <FriendBlock/>
                <FriendBlock/>
            </div>
            <h1 className='text-2xl tracking-wider pt-3 pb-4 px-4 mb-6 rounded-md bg-[#080808] mt-10'>Your Friends</h1>
            <div className='w-full grid grid-cols-2 gap-5 sm:grid-cols-3 lg-ml-10 xl:grid-cols-4 xl:gap-7 2xl:grid-cols-5'>
                <FriendBlock/>
                <FriendBlock/>
                <FriendBlock/>
                <FriendBlock/>
                <FriendBlock/>
                <FriendBlock/>
                <FriendBlock/>
                <FriendBlock/>
                <FriendBlock/>
                <FriendBlock/>
                <FriendBlock/>
                <FriendBlock/>
                <FriendBlock/>
                <FriendBlock/>
                <FriendBlock/>
            </div>
        </div>
        
      </div>
    </main>
  )
}

export default page