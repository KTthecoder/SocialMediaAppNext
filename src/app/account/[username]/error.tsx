'use client'

import Link from "next/link"

type Props = {}

const error = (props: Props) => {
  return (
    <div className="flex flex-col items-center h-screen justify-center">
        <h1 className="text-white font-medium text-lg sm:text-2xl">This user does not exist!</h1>
        <Link href='/' className="bg-blue-500 rounded-md py-2 px-4 mt-5">Go back to home page</Link>
    </div>
  )
}

export default error