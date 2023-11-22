'use client'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useEffect, useState } from 'react'

type Props = {
    userId: string,
    postId: string,
}

const AddCommentForm = (props: Props) => {
    const [comment, setComment] = useState('')
    const router = useRouter()

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await fetch('http://localhost:3000/api/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: comment,
                userId: props.userId,
                postId: props.postId
            })
        })

        if(res.status === 201){
            router.refresh()
        } else {
            alert('error occured')
        }
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col justify-start mb-5'>
            <textarea rows={3} className='w-full bg-[#111] rounded-t-md py-3 px-3 mb-0 outline-none' onChange={(e) => setComment(e.target.value)} placeholder='Write comment'/>
            <button className='w-full bg-blue-500 rounded-b-md py-1'>Add comment</button>
        </form>
    )
}

export default AddCommentForm