'use client'
import React from 'react'
import { signOut } from 'next-auth/react'
import { useRouter } from "next/navigation";

type Props = {}

const LogoutBtn = (props: Props) => {
    const router = useRouter();

    return (
        <button className='bg-red-500 rounded-md px-4 py-1 mt-4' onClick={() => {
            signOut({ redirect: false }).then(() => {
                router.push("/")
                router.refresh()
            })
        }}>Logout</button>
    )
}

export default LogoutBtn