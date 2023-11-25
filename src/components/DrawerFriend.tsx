import React from 'react'
import UserImage from '@/static/images/shortImg.jpeg'
import Link from 'next/link'

type Props = {
  username: string,
  profileImg: string | null,
  profileImgAlt: string | null,
}

const DrawerFriend = (props: Props) => {
  return (
    <Link href={`/account/${props.username}`} className="flex items-center justify-start w-full border-b-[#222] border-b py-4">
      <img className="w-[37px] h-[37px] rounded-full" src={UserImage.src} alt='User'/>
      <p className="pl-3">{props.username}</p>
    </Link>
  )
}

export default DrawerFriend