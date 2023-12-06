'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from "react";

type Props = {
  username: string
}

const CreateGroupForm = (props: Props) => {
  const router = useRouter()
  const [visibility, setVisibility] = useState(true)
  const [file, setFile] = useState<File | null>(null);
  const [base64, setBase64] = useState<string | null>(null);

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const res = await fetch(`https://social-media-app-next.vercel.app/api/group`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        images: base64, 
        name: formData.get('name'),
        visibility: visibility === false ? 'PRIVATE' : 'PUBLIC',
        description: formData.get('description'),
        username: props.username
      })
    })
  
    if(res.status === 201){
      router.push('/groups')
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
      <div className='flex flex-col items-start justify-center px-4 w-full py-1 rounded-md bg-[#060606] pb-4'>
        <label className='mt-2 pb-3 tracking-wide border-b border-b-[#222] w-full font-medium'>Images</label>
        <div className='flex items-center justify-center w-full'>
          {base64 && 
            <img src={base64} className='rounded-md aspect-square w-36 mt-5' alt='Post'/>
          }
        </div>
        <input type="file" name="avatar" accept="image/*" onChange={onFileChange} className='mt-5'/>
      </div>
      <div className='flex flex-col items-start justify-center px-4 w-full py-1 mt-5 rounded-md bg-[#060606]'>
        <label className='mt-2 pb-3 tracking-wide border-b border-b-[#222] w-full font-medium'>Name</label>
        <input className='w-full py-3 bg-transparent outline-none' placeholder='Name' name='name'/>
      </div>
      <div className='flex flex-col items-start justify-center px-4 w-full py-1 mt-5 rounded-md bg-[#060606]'>
        <label className='mt-2 pb-3 tracking-wide border-b border-b-[#222] w-full font-medium'>Visibility</label>
        <div className='flex flex-row my-3'>
          <button type='button' onClick={() => setVisibility(true)} className={`${visibility === true ? 'bg-[#222]' : 'bg-[#111]'} py-1 px-5 rounded-md mr-5`}>Public</button>
          <button type='button' onClick={() => setVisibility(false)} className={`${visibility === false ? 'bg-[#222]' : 'bg-[#111]'} py-1 px-5 rounded-md mr-5`}>Private</button>
        </div>
      </div>
      <div className='flex flex-col items-start justify-center px-4 w-full py-1 mt-5 rounded-md bg-[#060606]'>
        <label className='mt-2 pb-3 tracking-wide border-b border-b-[#222] w-full font-medium'>Description</label>
        <textarea className='w-full py-3 bg-transparent outline-none' placeholder='Description' name='description'/>
      </div>
      <div className='flex flex-col md:flex-row'>
        <button type='submit' className='w-full bg-blue-500 text-white border-none py-2 tracking-wide rounded-md mt-5'>Create Post</button>
      </div>
    </form>
  )
}

export default CreateGroupForm