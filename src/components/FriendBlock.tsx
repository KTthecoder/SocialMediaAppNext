'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
  inviteId: number,
  profileImg: string | null,
  profileImgAlt: string | null,
  username: string,
  type: 'Pending' | 'Friend'
}

const FriendBlock = (props: Props) => {
  const route = useRouter()

  const acceptInvite = async () => {
    const res = await fetch('http://localhost:3000/api/friend-invitation', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        inviteId: props.inviteId
      })
    })

    if(res.status === 201){
      route.refresh()
    }
    else{
      alert('Error occured while saving post')
    }
  }

  const declineInvite = async () => {
    const res = await fetch('http://localhost:3000/api/friend-invitation', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
      body: JSON.stringify({
        inviteId: props.inviteId
      })
    })

    if(res.status === 201){
      route.refresh()
    }
    else{
      alert('Error occured while saving post')
    }
  }

  return (
    <div className='flex flex-col'>
      {props.profileImg != null ? <img className='rounded-md aspect-square bg-contain bg-center' src={props.profileImg?.toString()} alt={props.profileImgAlt != null ? props.profileImgAlt?.toString() : ''}/>
      : <div className='rounded-md aspect-square bg-contain bg-center bg-[#222]'></div>}
      <p className='mt-2 text-base text-center border-t border-b border-t-[#111] border-b-[#111] py-2'>{props.username}</p>
      <div className='flex flex-col'>
        {props.type === 'Pending' ?
          <>
            <button className='bg-blue-500 rounded-md py-1 my-3' onClick={() => acceptInvite()}>Accept</button>
            <button className='bg-red-500 rounded-md py-1' onClick={() => declineInvite()}>Decline</button>
          </>
          : props.type === 'Friend' ? 
          <>
            <Link href={`/account/${props.username}`} className='bg-blue-500 rounded-md py-1 my-3 text-center'>Show</Link>
            <button className='bg-red-500 rounded-md py-1' onClick={() => declineInvite()}>Delete</button>
          </> : null}
      </div>
    </div>
  )
}

export default FriendBlock