import Article from '@/components/Article'
import DrawerNavLeft from '@/components/DrawerNavLeft'
import type { Metadata } from 'next'
import ProfileImg from '@/static/images/shortImg.jpeg'
import { MdOutlineArticle } from "react-icons/md";
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Account | SocialMediaApp',
  description: 'Account page of SocialMediaApp',
}

type Props = {}

const page = (props: Props) => {
  return (
    <main className='w-full flex flex-row items-center justify-center'>
      <div className='w-10/12 flex flex-row justify-center mt-24 max-w-[1700px] lg:justify-between lg:mt-28'>
        <DrawerNavLeft/>
        <div className='flex flex-col w-full md:w-[600px] lg:w-7/12 xl:w-5/12'>
          <div className='flex flex-row items-start justify-between'>
            <div className='flex flex-col'>
              <img className='w-[70px] aspect-square rounded-full' src={ProfileImg.src} alt='Profile'/>
              <p className='mt-3 tracking-wider font-medium sm:mt-4'>Username</p>
            </div>
            <div className='flex flex-row justify-end items-center'>
              <div className='flex flex-col items-center justify-center'>
                <p>2</p>
                <p className='text-gray-300'>Posts</p>
              </div>
              <div className='flex flex-col items-center justify-center mx-4'>
                <p>423</p>
                <p className='text-gray-300'>Friends</p>
              </div>
              <div className='flex flex-col items-center justify-center'>
                <p>25</p>
                <p className='text-gray-300'>Groups</p>
              </div>
            </div>
          </div>
          <p className='text-sm mt-2 sm:text-base text-gray-200'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Commodo viverra maecenas accumsan lacus.</p>
          <div className='mt-4'>
            <Link href='/account/edit-account' className='bg-[#111] rounded-md py-1 px-4 mr-4'>Edit profile</Link>
            <button className='bg-[#111] rounded-md py-1 px-4'>Share profile</button>
            {/* <button className='bg-blue-500 rounded-md py-1 px-4 mr-4'>Add to friends</button>
            <button className='bg-red-500 rounded-md py-1 px-4 mr-4'>Remove from friends</button> */}
          </div>
          <div className='flex flex-col mb-10 border-b border-b-[#111] pb-5 mt-8'>
            <h1 className='text-2xl tracking-wider pt-3 flex items-center'><MdOutlineArticle size={25} className='mr-3'/> Your Posts</h1>
          </div>
          <Article/>
          <Article/>
        </div>
        <div className="hidden xl:flex flex-col lg:w-3/12 lg:max-w-[270px]"></div>
      </div>
    </main>
  )
}

export default page