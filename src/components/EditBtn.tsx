'use client'
import { useRouter } from 'next/navigation';
import React from 'react'
import { MdDeleteOutline } from "react-icons/md";

type Props = {
    currentUser: string | undefined,
    postId: string,
}

const EditBtn = (props: Props) => {
    const route = useRouter()

    const handleClick = async () => {
        const res = await fetch(`https://social-media-app-next-8yy8s23ac-ksawerys-projects-dafd64ce.vercel.app/api/post`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'DELETE',
            body: JSON.stringify({
                username: props.currentUser,
                postId: props.postId,
            })
        })

        if(res.status === 200){
            route.refresh()
        }
        else{
            alert('Error occured')
        }
    }

    return (
        <button className='flex flex-col items-center sm:flex-row ml-4' onClick={handleClick}>
            <MdDeleteOutline className='text-[21px] sm:text-[23px] text-blue-500'/>
        </button>
    )
}

export default EditBtn