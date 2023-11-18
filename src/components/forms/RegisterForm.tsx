'use client'
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from "react";
import { FaLock, FaUnlock  } from "react-icons/fa";

const RegisterForm = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showRPassword, setShowRPassword] = useState(false)

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const res = await fetch('http://localhost:3000/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.get('email'), 
          username: formData.get('username'),
          password: formData.get('password')
        })
    })
  
    if(res.ok){
      router.refresh()
      router.push('/login')
    } else {
      alert('error occured')
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col justify-center w-full'>
        <input className='w-full px-2 py-3 bg-transparent border-b border-b-[#151515] outline-none my-3' type='email' placeholder='Email' name='email'/>
        <input className='w-full px-2 py-3 bg-transparent border-b border-b-[#151515] outline-none mb-3' type='text' placeholder='Username' name='username'/>
        <div className='flex flex-row items-center justify-center w-full border-b border-b-[#151515] pr-2'>
            <input className='w-full pl-2 pr-5 py-3 bg-transparent outline-none' type={showPassword === false ? 'password' : 'text'} placeholder='Password' name='password'/>
            {showPassword === false ? 
            <button type="button" onClick={() => setShowPassword(true)}>
                <FaLock />
            </button> : 
            <button type="button" onClick={() => setShowPassword(false)}>
                <FaUnlock />
            </button>}
        </div>
        <div className='flex flex-row items-center justify-center w-full border-b border-b-[#151515] pr-2 mt-3'>
            <input className='w-full pl-2 pr-5 py-3 bg-transparent outline-none' type={showRPassword === false ? 'password' : 'text'} placeholder='Repeat password' name='RepeatPassword'/>
            {showRPassword === false ? 
            <button type="button" onClick={() => setShowRPassword(true)}>
                <FaLock />
            </button> : 
            <button type="button" onClick={() => setShowRPassword(false)}>
                <FaUnlock />
            </button>}
        </div>
        <button type='submit' className='w-full bg-blue-500 text-white border-none py-2 mt-8 tracking-wide rounded-md'>Create account</button>
    </form>
  )
}

export default RegisterForm