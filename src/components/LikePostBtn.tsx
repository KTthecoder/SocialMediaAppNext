'use client'
import { useRouter } from 'next/navigation';
import React from 'react'
import { FaRegHeart } from "react-icons/fa";

type Props = {
    likes: number | undefined,
    postId: string,
    userId: string,
}

const LikePostBtn = (props: Props) => {
    const route = useRouter()

    const handleClick = async () => {
        const res = await fetch('http://localhost:3000/api/like-post', {
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
            <FaRegHeart className='text-[21px] sm:text-[23px]'/>
            <p className='sm:pl-2 text-sm sm:text-base'>{props.likes}</p>
        </button>
    )
}

export default LikePostBtn