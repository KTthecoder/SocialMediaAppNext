'use client'
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from "react";
import PostImage from '@/static/images/postImage.png'
import GroupImage from '@/static/images/shortImg.jpeg'

type Props = {
    username: string,
    group: {
        id: string,
        image: string,
        name: string | undefined,
    },
}

const CreateGroupPostForm = (props: Props) => {
  const router = useRouter()

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const res = await fetch('http://localhost:3000/api/post-group', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        description: formData.get('description'), 
        username: props.username,
        images: '',
        groupId: props.group.id
      })
    })
  
    if(res.status === 201){
      router.push(`/group/${props.group.id}`)
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
        <div className='flex flex-col items-start justify-center px-4 w-full py-1 mt-5 rounded-md bg-[#060606]'>
            <label className='mt-2 pb-3 tracking-wide border-b border-b-[#111] w-full font-medium'>Group</label>
            <div className='flex flex-row items-center justify-start py-3'>
                <img src={GroupImage.src} className='rounded-md aspect-square h-[40px] w-[40px] mr-3' alt='Group'/>
                <p>{props.group.name}</p>
            </div>
        </div>
        <div className='flex flex-col md:flex-row'>
            <button type='submit' className='w-full bg-blue-500 text-white border-none py-2 tracking-wide rounded-md mt-5'>Create Post</button>
        </div>
    </form>
  )
}

export default CreateGroupPostForm