import Article from '@/components/Article'
import DrawerNavLeft from '@/components/DrawerNavLeft'
import DrawerNavRight from '@/components/DrawerNavRight'
import type { Metadata } from 'next'
import PostImg from '@/static/images/postImage.png'
import ProfileImg from '@/static/images/shortImg.jpeg'
import { IoCalendarClearOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { BiDislike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { MdSaveAlt } from "react-icons/md";
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'SocialMediaApp',
  description: 'Home page of SocialMediaApp',
}

export default function page() {
  return (
    <main className='w-full flex flex-row items-center justify-center'>
      <div className='w-full flex flex-col justify-center mt-20 md:w-9/12 md:mt-24 lg:w-full lg:justify-between lg:mt-28 max-w-[1700px]'>
        <div className='flex flex-col justify-center items-center lg:flex-row lg:justify-between lg:items-start lg:px-10'>
            <div className='flex justify-center items-center w-full lg:w-7/12 lg:mr-12 xl:pr-12 2xl:pr-24'>
                <img src={PostImg.src} alt='Post'/>
            </div>
            <div className='flex flex-col w-10/12 items-center mt-1 md:w-full lg:w-5/12 lg:mt-0'>
                <div className='w-full flex flex-row items-center justify-between border-b-[#222] border-b mb-2 pb-3 mt-5 lg:mt-0'>
                    <div className='flex flex-row items-center justify-start'>
                        <img className='w-[40px] h-[40px] rounded-full bg-center bg-cover' src={ProfileImg.src} alt='Profile'/>
                        <p className='pl-3'>Username</p>
                    </div>
                    <div className='items-center justify-end w-5/12 hidden sm:flex'>
                        <IoCalendarClearOutline/>
                        <p className='pl-2'>09-11-2023</p>
                    </div>
                </div>
                <div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
                </div>
                <div className='flex items-start justify-between w-full mt-4 border-b border-b-[#222] pb-4 mb-4'>
                    <div className='flex'>
                        <button className='mr-4 flex flex-col items-center sm:flex-row'>
                            <FaRegHeart className='text-[21px] sm:text-[23px]'/>
                            <p className='sm:pl-2 text-sm sm:text-base'>22</p>
                        </button>
                        <button className='mr-4 flex flex-col items-center sm:flex-row'>
                            <BiDislike className='text-[21px] sm:text-[23px]'/>
                            <p className='sm:pl-2 text-sm sm:text-base'>33</p>
                        </button>
                        <button className='flex flex-col items-center sm:flex-row'>
                            <FaRegComment className='text-[21px] sm:text-[23px]'/>
                            <p className='sm:pl-2 text-sm sm:text-base'>44</p>
                        </button>
                    </div>
                    <button className='flex flex-col items-center'>
                        <MdSaveAlt className='text-[22px] sm:text-[24px]'/>
                    </button>
                </div>
                <div>
                    <div className='flex flex-col justify-start mb-5'>
                        <textarea rows={3} className='w-full bg-[#111] rounded-t-md py-3 px-3 mb-0 outline-none' placeholder='Write comment'/>
                        <button className='w-full bg-blue-500 rounded-b-md py-1'>Add comment</button>
                    </div>
                    <div className='flex mb-3 justify-between'>
                        <p className='w-10/12 text-sm sm:text-base text-gray-300'><span className='font-medium tracking-wide text-white'>Username</span> Adipiscing enim eu turpis egestas pretium aenean. Integer eget aliquet nibh praesent tristique magna sit amet.</p>
                        <FaRegHeart className='text-[17px]'/>
                    </div>
                    <div className='flex mb-3 justify-between'>
                        <p className='w-10/12 text-sm sm:text-base text-gray-300'><span className='font-medium tracking-wide text-white'>Username</span> Adipiscing enim eu turpis egestas pretium aenean. Integer eget aliquet nibh praesent tristique magna sit amet.</p>
                        <FaRegHeart className='text-[17px]'/>
                    </div>
                    <Link href='/post/post-slug' className='text-blue-500'>Show more</Link>
                </div>
            </div>
        </div>
      </div>
    </main>
  )
}
