import React from 'react'
import UserImage from '@/static/images/shortImg.jpeg'
import Link from 'next/link'

type Props = {
  username: string,
  description: string | null,
  profileImg: string | null,
  profileImgAlt: string | null,
}

const FriendHorizontal = (props: Props) => {
  return (
    <div className='flex flex-row items-start justify-start mb-7'>
      {props.profileImg != null ? <img className='w-3/12 aspect-square rounded-md sm:w-[70px]' src={props.profileImg?.toString()} alt={props.profileImgAlt?.toString()}/>
      : <div className='w-3/12 aspect-square rounded-md sm:w-[70px] bg-[#222]'></div>}
      <div className='flex flex-col w-full pl-3 sm:pl-5 sm:flex-row sm:w-full sm:items-center justify-between'>
        <div className='flex flex-col items-start justify-center sm:pr-5'>
          <h2 className='font-medium tracking-wide text-lg -mt-2 mb-3 sm:mb-1'>{props.username}</h2>
          <p className='hidden sm:flex text-sm text-gray-300 tracking-wide'>{props.description}</p>
        </div>
        <Link className='bg-blue-500 py-1 tracking-wide rounded-md items-center flex justify-center sm:w-[50px] sm:flex-none sm:h-[40px] sm:px-10' href={`/account/${props.username}`}>Show</Link>
      </div>
    </div>
  )
}

export default FriendHorizontal