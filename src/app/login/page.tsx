
import React from 'react'
import type { Metadata } from 'next'
import { FaLock, FaUnlock  } from "react-icons/fa";
import Link from 'next/link';
import LoginSvg from '@/static/svgs/Login';
import { IoMdArrowRoundBack } from "react-icons/io";

type Props = {}

export const metadata: Metadata = {
    title: 'Login | SocialMediaApp',
    description: 'Login form for SocialMediaApp',
}

const page = (props: Props) => {
  return (
    <div className='w-full flex flex-col items-center justify-center'>
        <div className='flex flex-col items-start w-10/12 lg:absolute bg-red-200'>
            <div className='rounded-full bg-blue-600 px-3 py-3 fixed top-5'>
                <IoMdArrowRoundBack size={20}/>
            </div>
        </div>
        <div className='flex flex-col items-center justify-center w-10/12 pt-28 sm:min-h-screen sm:pt-0 lg:flex-row lg:justify-between lg:w-[900px] xl:w-[1000px] 2xl:w-[1100px]'>
            <div className='hidden lg:flex w-6/12'>
                <LoginSvg/>
            </div>
            <div className='flex flex-col justify-center w-full lg:w-5/12'>
                <h1 className='font-medium text-3xl tracking-wide leading-9'>Hello,</h1>
                <h2 className='font-medium text-3xl tracking-wide leading-9'>Welcome back!</h2>
                <form className='flex flex-col justify-center w-full'>
                    <input className='w-full px-3 py-3 bg-transparent border-b border-b-[#151515] outline-none my-3' type='email' placeholder='Email' name='email'/>
                    <div className='flex flex-row items-center justify-center w-full border-b border-b-[#151515] pr-3'>
                        <input className='w-full pl-3 pr-5 py-3 bg-transparent outline-none' type='password' placeholder='Password' name='password'/>
                        <FaLock />
                        {/* <FaUnlock /> */}
                    </div>
                    <div className='mt-4 mb-5'>
                        <Link href='/forgot-password' className='text-blue-600'>Forgot password?</Link>
                    </div>
                    <button type='submit' className='w-full bg-blue-500 text-white border-none py-2 tracking-wide rounded-md'>Login</button>
                </form>
                <p className='mt-4'>Don't have an account?<Link href='/create-account' className='text-blue-600 pl-1'>Click Here</Link></p>
            </div>
        </div>
    </div>
  )
}

export default page