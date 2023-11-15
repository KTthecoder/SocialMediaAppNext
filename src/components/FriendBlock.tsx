import React from 'react'
import UserImg from '@/static/images/shortImg.jpeg'

type Props = {}

const FriendBlock = (props: Props) => {
  return (
    <div className='flex flex-col'>
        <img className='rounded-md aspect-square bg-contain bg-center' src={UserImg.src} alt='User'/>
        <p className='mt-2 text-sm'>Ksawery Tkaczyk</p>
        <p className='text-gray-300 text-sm mt-1'>234 friends</p>
        <div className='flex flex-col'>
            <button className='bg-blue-500 rounded-md py-1 my-3'>Show</button>
            <button className='bg-red-500 rounded-md py-1'>Delete</button>
        </div>
    </div>
  )
}

export default FriendBlock