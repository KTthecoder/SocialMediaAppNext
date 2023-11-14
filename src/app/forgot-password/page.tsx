
import React from 'react'
import type { Metadata } from 'next'
import { FaLock, FaUnlock  } from "react-icons/fa";
import Link from 'next/link';
import RegisterSvg from '@/static/svgs/Register';
import { IoMdArrowRoundBack } from "react-icons/io";
import ForgotPasswordSvg from '@/static/svgs/ForgotPassword';

type Props = {}

export const metadata: Metadata = {
    title: 'Forgot password | SocialMediaApp',
    description: 'Forgot password form for SocialMediaApp',
}

const page = (props: Props) => {
  return (
    <div className='w-full flex flex-col items-center justify-center'>
        <div className='flex flex-col items-start w-10/12 lg:absolute'>
            <Link href='/' className='rounded-full bg-blue-500 px-3 py-3 fixed top-5'>
                <IoMdArrowRoundBack size={20}/>
            </Link>
        </div>
        <div className='flex flex-col items-center justify-center w-10/12 pt-28 sm:min-h-screen sm:pt-0 lg:flex-row lg:justify-between lg:w-[860px] xl:w-[1000px] 2xl:w-[1100px]'>
            <div className='hidden lg:flex w-6/12'>
                <ForgotPasswordSvg/>
            </div>
            <div className='flex flex-col justify-center w-full lg:w-5/12 md:w-[640px]'>
                <h2 className='font-medium text-3xl tracking-wide leading-3'>Forgot password?</h2>
                <p className='text-lg tracking-wide leading-7 mt-6'>Enter your email, then follow the instructions</p>
                <form className='flex flex-col justify-center w-full'>
                    <input className='w-full px-2 py-3 bg-transparent border-b border-b-[#151515] outline-none mt-5' type='email' placeholder='Email' name='email'/>
                    <button type='submit' className='w-full bg-blue-500 text-white border-none py-2 mt-8 tracking-wide rounded-md'>Send Link</button>
                </form>
                <p className='mt-4'>Remember your password?<Link href='/login' className='text-blue-500 pl-1'>Click Here</Link></p>
            </div>
        </div>
    </div>
  )
}

export default page