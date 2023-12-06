'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { MdSaveAlt } from "react-icons/md";

type Props = {
    saved: boolean,
    id: string,
    username: string | undefined,
}

const SavePostBtn = (props: Props) => {
    const [savedPost, setSavedPost] = useState(props.saved)
    const route = useRouter()

    const savePost = async () => {
        if(props.username === undefined){
            route.push('/login')
        }
        else{
            const res = await fetch('https://social-media-app-next.vercel.app/api/posts-save', {
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
                route.refresh()
            }
            else{
                alert('Error occured while saving post')
            }
        }
    }

    return (
        <>
            {savedPost === true ? 
            <button className='flex flex-col items-center sm:flex-row' disabled>
                <MdSaveAlt className='text-[21px] sm:text-[23px] text-gray-500'/>
            </button>
            : 
            <button className='flex flex-col items-center sm:flex-row' onClick={() => {
                savePost()
            }}>
                <MdSaveAlt className='text-[21px] sm:text-[23px]'/>
            </button>}
        </>
    )
}

export default SavePostBtn