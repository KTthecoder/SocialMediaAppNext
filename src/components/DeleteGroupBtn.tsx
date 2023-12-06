'use client'
import { useRouter } from 'next/navigation';
import React from 'react'
import { IoTrashBinOutline } from "react-icons/io5";

type Props = {
    username: string,
    groupId: string,
}

const DeleteGroupBtn = (props: Props) => {
    const route = useRouter()

    const handleClick = async () => {
        const res = await fetch(`${process.env.MAIN_URL}/api/group`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
            body: JSON.stringify({
                username: props.username,
                groupId: props.groupId,
            })
        })

        if(res.status === 200){
            route.refresh()
        }
        else{
            alert('Error occured while deleting group')
        }
    }

  return (
    <button onClick={handleClick} type='button' className='bg-red-500 py-1 px-5 mr-3 tracking-wide rounded-md items-center flex justify-center '><IoTrashBinOutline className='text-xl'/></button>
  )
}

export default DeleteGroupBtn