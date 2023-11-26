'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { MdSaveAlt } from "react-icons/md";

type Props = {
    saved: string,
    id: string,
    username: string | undefined,
}

const SavePostBtn = (props: Props) => {
    const [savedPost, setSavedPost] = useState(props.saved === props.id ? true : false)
    const route = useRouter()

    const savePost = async () => {
        const res = await fetch('http://localhost:3000/api/posts-save', {
            headers: {
                'Content-Type': 'appliaction/json',
            },
            method: 'POST',
            body: JSON.stringify({
                postId: props.id,
                username: props.username
            })
        })

        if(res.status === 201){
            setSavedPost(true)
        }
        else{
            alert('Error occured while saving post')
        }
    }

    return (
        <button className='flex flex-col items-center' onClick={() => {
            savedPost === false ? savePost() : route.push('/login')
        }} disabled={savedPost === false ? false : true}>
            <MdSaveAlt className={`${savedPost === false ? 'text-white' : 'text-gray-500'} text-[22px] sm:text-[24px]`}/>
        </button>
    )
}

export default SavePostBtn