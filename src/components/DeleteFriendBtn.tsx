'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
    user1Id: string | undefined,
    user2Id: string,
}

const DeleteFriendBtn = (props: Props) => {
    const route = useRouter()

    const declineInvite = async () => {
        const res = await fetch(`https://social-media-app-next-8yy8s23ac-ksawerys-projects-dafd64ce.vercel.app/api/friends`, {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'DELETE',
          body: JSON.stringify({
            user1Id: props.user1Id,
            user2Id: props.user2Id
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
        <button className='bg-red-500 rounded-md py-1 px-4 mr-4' onClick={() => declineInvite()}>Remove from friends</button>
    )
}

export default DeleteFriendBtn