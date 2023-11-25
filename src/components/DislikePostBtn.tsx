'use client'
import { useRouter } from 'next/navigation';
import React from 'react'
import { BiDislike } from "react-icons/bi";

type Props = {
    disLikes: number | undefined,
    userId: string,
    postId: string,
}

const DislikePostBtn = (props: Props) => {
    const route = useRouter()

    const handleClick = async () => {
        const res = await fetch('http://localhost:3000/api/dislike-post', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                postId: props.postId,
                userId: props.userId
            })
        })

        if(res.status === 201){
            route.refresh()
        }
        else{
            alert('Error occured')
        }
    }

    return (
        <button className='mr-4 flex flex-col items-center sm:flex-row' onClick={() => handleClick()}>
            <BiDislike className='text-[21px] sm:text-[23px]'/>
            <p className='sm:pl-2 text-sm sm:text-base'>{props.disLikes}</p>
        </button>
    )
}

export default DislikePostBtn