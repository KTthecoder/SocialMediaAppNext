'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useEffect, useState } from 'react'

type Props = {
    username: string,
    description: string | null,
    id: string
}

const EditAccountForm = (props: Props) => {
    const [username, setUsername] = useState(props.username)
    const [description, setDescription] = useState(props.description)
    const router = useRouter()

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await fetch('http://localhost:3000/api/user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                description: description,
                id: props.id
            })
        })

        if(res.ok){
            alert('User edited succesfully')
            router.push(`/account/${username}`)
            router.refresh()
        } else {
            alert('error occured')
        }
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col justify-center w-full mt-5'>
            <div className='flex flex-col items-start justify-center px-4 w-full py-1 rounded-md bg-[#060606]'>
                <label className='mt-2 pb-3 tracking-wide border-b border-b-[#111] w-full font-medium'>Username</label>
                <input className='w-full py-3 bg-transparent outline-none' type='text' placeholder='Username' name='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className='flex flex-col items-start justify-center px-4 w-full py-1 mt-5 rounded-md bg-[#060606]'>
                <label className='mt-2 pb-3 tracking-wide border-b border-b-[#111] w-full font-medium'>Description</label>
                <textarea className='w-full py-3 bg-transparent outline-none' placeholder='Description' name='description' value={description?.toString()} onChange={(e) => setDescription(e.target.value)}/>
            </div>
            <div className='flex flex-col md:flex-row'>
                <button type='submit' className='w-full bg-blue-500 text-white border-none py-2 tracking-wide rounded-md mt-5'>Edit profile</button>
                <Link className='w-full bg-[#111] text-white border-none py-2 tracking-wide rounded-md mt-5 text-center md:ml-5' href='/account/change-password'>Change password</Link>
            </div>
        </form>
    )
}

export default EditAccountForm