import React from 'react'
import Link from 'next/link'
import DeleteGroupBtn from './DeleteGroupBtn'
import Image from 'next/image'

type Props = {
  image: string,
  name: string,
  visible: string,
  description: string,
  usersCount: {
    UserInGroup: number
  },
  id: string,
  username: string | undefined,
  isAdmin: boolean,
}

const GroupHorizontal = (props: Props) => {
  return (
    <div className='flex flex-row items-start justify-start mb-7'>
      {props.image != '' ? <Image sizes={'100%'} className='w-3/12 aspect-square rounded-md sm:w-[70px]' src={props.image} alt='Group'/>
      : <div className='w-3/12 aspect-square rounded-md sm:w-[70px] bg-[#222]'></div>}
      <div className='flex flex-col w-full pl-3 sm:pl-5 sm:flex-row sm:w-full sm:items-center justify-between'>
        <div className='flex flex-col items-start justify-center sm:pr-5'>
          <h2 className='font-medium tracking-wide text-lg -mt-2'>{props.name}</h2>
          <p className='text-gray-200 tracking-wide mb-3 text-sm'>{props.visible.toLocaleLowerCase()} · {props.usersCount.UserInGroup} users</p>
          <p className='hidden sm:flex -mt-2 text-sm text-gray-300 tracking-wide'>{props.description}</p>
        </div>
        <div className='flex'>
          {props.isAdmin === true ? <DeleteGroupBtn username={props.username != null ? props.username : ''} groupId={props.id}/> : null}
          <Link className='bg-blue-500 py-1 px-5 tracking-wide rounded-md items-center flex justify-center sm:w-[50px] sm:flex-none sm:h-[40px] sm:px-10' href={`/group/${props.id}`}>Show</Link>
        </div>
      </div>
    </div>
  )
}

export default GroupHorizontal