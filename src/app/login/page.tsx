
import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link';
import LoginSvg from '@/static/svgs/Login';
import { IoMdArrowRoundBack } from "react-icons/io";
import LoginForm from '@/components/forms/LoginForm';

export const metadata: Metadata = {
    title: 'Login | SocialMediaApp',
    description: 'Login form for SocialMediaApp',
}

const page = () => {
  return (
    <div className='w-full flex flex-col items-center justify-center'>
        <div className='flex flex-col items-start w-10/12 lg:absolute'>
            <Link href='/' className='rounded-full bg-blue-500 px-3 py-3 fixed top-5'>
                <IoMdArrowRoundBack size={20}/>
            </Link>
        </div>
        <div className='flex flex-col items-center justify-center w-10/12 pt-28 sm:min-h-screen sm:pt-0 lg:flex-row lg:justify-between lg:w-[860px] xl:w-[1000px] 2xl:w-[1100px]'>
            <div className='hidden lg:flex w-6/12'>
                <LoginSvg/>
            </div>
            <div className='flex flex-col justify-center w-full lg:w-5/12 md:w-[640px]'>
                <h1 className='font-medium text-3xl tracking-wide leading-9'>Hello,</h1>
                <h2 className='font-medium text-3xl tracking-wide leading-9'>Welcome back!</h2>
                <LoginForm/>
                <p className='mt-4'>Don&apos;t have an account?<Link href='/create-account' className='text-blue-500 pl-1'>Click Here</Link></p>
            </div>
        </div>
    </div>
  )
}

export default page