'use client'
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from "react";
import { FaLock, FaUnlock  } from "react-icons/fa";

const LoginForm = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const signInData = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false
    })
  
    if(!signInData?.ok){
      alert('error occured')
    } else {
      router.push('/')
      router.refresh()
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col justify-center w-full'>
      <input className='w-full px-3 py-3 bg-transparent border-b border-b-[#151515] outline-none my-3' type='email' placeholder='Email' name='email'/>
      <div className='flex flex-row items-center justify-center w-full border-b border-b-[#151515] pr-3'>
        <input className='w-full pl-3 pr-5 py-3 bg-transparent outline-none' type='password' placeholder='Password' name='password'/>
        {showPassword === false ?
        <button onClick={() => setShowPassword(true)}>
          <FaLock />      
        </button> : <button onClick={() => setShowPassword(false)}>
          <FaUnlock />
        </button>}
      </div>
      <div className='mt-4 mb-5'>
        <Link href='/forgot-password' className='text-blue-500'>Forgot password?</Link>
      </div>
      <button type='submit' className='w-full bg-blue-500 text-white border-none py-2 tracking-wide rounded-md'>Login</button>
    </form>
  )
}

export default LoginForm