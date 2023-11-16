import Article from '@/components/Article'
import DrawerNavLeft from '@/components/DrawerNavLeft'
import type { Metadata } from 'next'
import ProfileImg from '@/static/images/shortImg.jpeg'
import { RiUserSettingsLine } from "react-icons/ri";
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
            <div className='flex flex-col mb-8 border-b border-b-[#111] pb-5'>
                <h1 className='text-2xl tracking-wider pt-3 flex items-center'><RiUserSettingsLine size={25} className='mr-3'/>Edit Profile</h1>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <img className='w-[70px] aspect-square rounded-full' src={ProfileImg.src} alt='Profile'/>
                <button className='text-blue-500 mt-4'>Change image</button>
            </div>
            <form className='flex flex-col justify-center w-full mt-5'>
                <div className='flex flex-col items-start justify-center px-4 w-full py-1 rounded-md bg-[#060606]'>
                    <label className='mt-2 pb-3 tracking-wide border-b border-b-[#111] w-full font-medium'>Username</label>
                    <input className='w-full py-3 bg-transparent outline-none' type='text' placeholder='Username' name='username'/>
                </div>
                <div className='flex flex-col items-start justify-center px-4 w-full py-1 mt-5 rounded-md bg-[#060606]'>
                    <label className='mt-2 pb-3 tracking-wide border-b border-b-[#111] w-full font-medium'>Description</label>
                    <textarea className='w-full py-3 bg-transparent outline-none' placeholder='Description' name='description'/>
                </div>
                <button type='submit' className='w-full bg-blue-500 text-white border-none py-2 tracking-wide rounded-md mt-5'>Login</button>
            </form>
        </div>
        <div className="hidden xl:flex flex-col lg:w-3/12 lg:max-w-[270px]"></div>
      </div>
    </main>
  )
}

export default page