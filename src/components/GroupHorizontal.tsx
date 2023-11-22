import React from 'react'
import UserImage from '@/static/images/shortImg.jpeg'
import Link from 'next/link'

type Props = {
  image: string,
  name: string,
  visible: string,
  description: string,
  usersCount: {
    UserInGroup: number
  },
  id: string,
}

const GroupHorizontal = (props: Props) => {
  return (
    <div className='flex flex-row items-start justify-start mb-7'>
      <img className='w-3/12 aspect-square rounded-md sm:w-[70px]' src={UserImage.src} alt='Group'/>
      <div className='flex flex-col w-full pl-3 sm:pl-5 sm:flex-row sm:w-full sm:items-center justify-between'>
        <div className='flex flex-col items-start justify-center sm:pr-5'>
          <h2 className='font-medium tracking-wide text-lg -mt-2'>{props.name}</h2>
          <p className='text-gray-200 tracking-wide mb-3 text-sm'>{props.visible.toLocaleLowerCase()} · {props.usersCount.UserInGroup} users</p>
          <p className='hidden sm:flex -mt-2 text-sm text-gray-300 tracking-wide'>{props.description}</p>
        </div>
        <Link className='bg-blue-500 py-1 tracking-wide rounded-md items-center flex justify-center sm:w-[50px] sm:flex-none sm:h-[40px] sm:px-10' href={`/group/${props.id}`}>Show</Link>
      </div>
    </div>
  )
}

export default GroupHorizontal