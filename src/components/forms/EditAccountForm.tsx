'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useEffect, useState } from 'react'

type Props = {
    username: string,
    description: string | null,
    id: string,
    profileImg: string | null,
    profileImgAlt: string | null,
}

const EditAccountForm = (props: Props) => {
    const [username, setUsername] = useState(props.username)
    const [description, setDescription] = useState(props.description)
    const [file, setFile] = useState<File | null>(null);
    const [base64, setBase64] = useState<string | null>(null);
    const router = useRouter()

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const base64 = await toBase64(file as File);
        setBase64(base64 as string);
        const res = await fetch('https://social-media-app-next.vercel.app/api/user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                description: description,
                id: props.id,
                image: base64
            })
        })

        if(res.ok){
            alert('User edited succesfully')
            router.push(`/account/${username}`)
            router.refresh()
            setFile(null);
            setBase64(null);
        } else {
            alert('error occured')
        }
    }

    const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
          return;
        }
        
        const base64 = await toBase64(e.target.files[0] as File);
        setBase64(base64 as string);
        setFile(e.target.files[0]);
    };
    
    const toBase64 = (file: File) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
      
          fileReader.readAsDataURL(file);
      
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
      
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col justify-center w-full'>
            <div className='flex flex-col items-center justify-center'>
                {base64 != null ? 
                <img src={base64} className='w-[70px] aspect-square rounded-full' alt='Post'/>
                : <img className='w-[70px] aspect-square rounded-full bg-[#222]' src={props.profileImg != null ? props.profileImg?.toString() : ''} alt={props.profileImgAlt != null ? props.profileImgAlt?.toString() : ''}/>}
                <input type="file" name="avatar" accept="image/*" onChange={onFileChange} className='my-5' />
            </div>
            <div className='flex flex-col items-start justify-center px-4 w-full py-1 rounded-md bg-[#060606]'>
                <label className='mt-2 pb-3 tracking-wide border-b border-b-[#222] w-full font-medium'>Username</label>
                <input className='w-full py-3 bg-transparent outline-none' type='text' placeholder='Username' name='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className='flex flex-col items-start justify-center px-4 w-full py-1 mt-5 rounded-md bg-[#060606]'>
                <label className='mt-2 pb-3 tracking-wide border-b border-b-[#222] w-full font-medium'>Description</label>
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