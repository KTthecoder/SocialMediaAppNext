'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
  user1Id: string | undefined,
  user2Id: string,
}

const AddToFriendBtn = (props: Props) => {
  const route = useRouter()

  const addToFriend = async () => {
    if(props.user1Id && props.user2Id){
      const res = await fetch('http://localhost:3000/api/friends', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          user1Id: props.user1Id,
          user2Id: props.user2Id,
        })
      })

      if(res.status === 201){
        route.refresh()
      }
      else{
        alert('Error occured while saving post')
      }
    }
  }

  return (
    <button onClick={() => addToFriend()} className='bg-blue-500 rounded-md py-1 px-4 mr-4'>Add to friends</button>
  )
}

export default AddToFriendBtn