'use client'
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { IoMdSearch, IoMdAdd } from "react-icons/io";
import { FiUser } from "react-icons/fi";

type Props = {}

const Navbar = (props: Props) => {
    const pathname = usePathname()
    const router = useRouter()
    // || pathname.startsWith('/post/')

    if(pathname === '/login' || pathname === '/create-account' || pathname === '/forgot-password' ){
        return null
    }

    return (
        <nav className="w-full flex items-center justify-center fixed bg-[#000] pt-1 pb-3">
            <div className="w-10/12 flex flex-row items-center justify-between mt-2 max-w-[1700px]">
                <Link className="tracking-wide text-2xl font-lg" href='/'>SocialMedia</Link>
                <div className="flex items-center justify-center">
                    <div className="hidden sm:flex rounded-full items-center bg-[#111] pr-3 pl-4 box-border lg:w-[330px]">
                        <input className="py-2 border-none bg-[#111] mr-4 outline-none lg:w-full" type="text" placeholder="Search"/>
                        <button onClick={() => router.push('/search/search-text')}><IoMdSearch size={25}/></button>
                    </div>
                    <Link className="py-2 sm:hidden" href='/search/search-text'>
                        <IoMdSearch size={25}/>
                    </Link>
                    <Link className="py-2 mx-3 sm:bg-blue-500 sm:py-2 sm:px-2 sm:rounded-full" href='/create-post'>
                        <IoMdAdd size={25}/>
                    </Link>
                    <Link className="py-2 sm:bg-blue-500 sm:py-2 sm:px-2 sm:rounded-full" href='/login'>
                        <FiUser size={25}/>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar