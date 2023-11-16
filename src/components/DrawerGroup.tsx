import Link from 'next/link'
import React from 'react'
import UserImage from '@/static/images/shortImg.jpeg'

type Props = {}

const DrawerGroup = (props: Props) => {
  return (
    <Link href='/groups/group-slug' className='flex flex-row items-center justify-start mb-5 w-full border-t border-t-[#222] pt-5'>
        <img className='w-3/12 aspect-square rounded-md sm:w-[45px]' src={UserImage.src} alt='Group'/>
        <div className='flex flex-col w-full pl-3 sm:pl-4 sm:items-center'>
            <div className='flex flex-col items-start justify-center w-full sm:pr-5 h-full'>
                <h2 className='font-medium tracking-wide -mt-1 text-base w-full'>Group name</h2>
                <p className='text-gray-200 tracking-wide text-sm'>Public · 768 users</p>
            </div>
        </div>
    </Link>
  )
}

export default DrawerGroup