import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

type Props = {
  image?: string,
  imageAlt?: string,
  name?: string,
  status?: string,
  usersCount?: number,
  id?: string
}

const DrawerGroup = (props: Props) => {
  return (
    <Link href={`/group/${props.id}`} className='flex flex-row items-center justify-start mb-5 w-full border-t border-t-[#222] pt-5'>
      {props.image != '' ? <Image width={0} height={0} sizes={'100%'} className='w-3/12 aspect-square rounded-md sm:w-[45px] bg-[#222]' src={props.image != null ? props.image : ''} alt={props.imageAlt != null ? props.imageAlt : ''}/>
      : <div className='w-3/12 aspect-square rounded-md sm:w-[45px] bg-[#222]'></div>}
      <div className='flex flex-col w-full pl-3 sm:pl-4 sm:items-center'>
        <div className='flex flex-col items-start justify-center w-full sm:pr-5 h-full'>
          <h2 className='font-medium tracking-wide -mt-1 text-base w-full'>{props.name}</h2>
          <p className='text-gray-200 tracking-wide text-sm'>{props.status?.toLowerCase()} · {props.usersCount} users</p>
        </div>
      </div>
    </Link>
  )
}

export default DrawerGroup