'use client'
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from "react";
import PostImage from '@/static/images/postImage.png'

type Props = {
    username: string
}

const CreatePostForm = (props: Props) => {
  const router = useRouter()

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const res = await fetch('http://localhost:3000/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            description: formData.get('description'), 
            username: props.username,
            images: ''
        })
    })
  
    if(res.status === 201){
      router.push('/')
      router.refresh()
    } else {
      alert('error occured')
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col justify-center w-full'>
        <div className='flex flex-col items-start justify-center px-4 w-full py-1 rounded-md bg-[#060606] pb-4'>
            <label className='mt-2 pb-3 tracking-wide border-b border-b-[#111] w-full font-medium'>Images</label>
            <div className='grid grid-cols-1 gap-5 mt-5 sm:grid-cols-2'>
                <img src={PostImage.src} className='rounded-md aspect-square' alt='Post'/>
                <img src={PostImage.src} className='rounded-md aspect-square' alt='Post'/>
                <img src={PostImage.src} className='rounded-md aspect-square' alt='Post'/>
            </div>
            <button className='w-full py-2 mt-5 bg-[#222] rounded-md'>Add Images</button>
        </div>
        <div className='flex flex-col items-start justify-center px-4 w-full py-1 mt-5 rounded-md bg-[#060606]'>
            <label className='mt-2 pb-3 tracking-wide border-b border-b-[#111] w-full font-medium'>Description</label>
            <textarea className='w-full py-3 bg-transparent outline-none' placeholder='Description' name='description'/>
        </div>
        <div className='flex flex-col md:flex-row'>
            <button type='submit' className='w-full bg-blue-500 text-white border-none py-2 tracking-wide rounded-md mt-5'>Create Post</button>
        </div>
    </form>
  )
}

export default CreatePostForm