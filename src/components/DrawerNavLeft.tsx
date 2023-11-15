'use client'
import Link from "next/link";
import { LuUsers } from "react-icons/lu";
import { MdSaveAlt } from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import UserImage from '@/static/images/shortImg.jpeg'
import { FaChevronDown } from "react-icons/fa";
import { usePathname } from "next/navigation";

type Props = {}

const DrawerNavLeft = (props: Props) => {
    const pathname = usePathname()

    return (
        <div className='hidden lg:flex flex-col lg:w-4/12 lg:max-w-[270px] xl:w-3/12'>
            <Link className="flex items-center justify-start w-full border-b-[#222] border-b pb-5" href='/account/username'>
                <img className="w-[40px] h-[40px] rounded-full" src={UserImage.src} alt='User'/>
                <p className="pl-3">Username</p>
            </Link>
            <Link className={`${pathname === '/account/friends' ? 'border-b-blue-500 text-blue-500' : null} flex items-center justify-start w-full border-b-[#222] border-b py-5`} href='/account/friends'>
                <LuUsers size={25}/>
                <p className="pl-3">Friends</p>
            </Link>
            <Link className={`${pathname === '/account/saved-posts' ? 'border-b-blue-500 text-blue-500' : null} flex items-center justify-start w-full border-b-[#222] border-b py-5`} href='/account/saved-posts'>
                <MdSaveAlt size={25}/>
                <p className="pl-3">Saved</p>
            </Link>
            <div className="flex items-center justify-between w-full border-b-[#222] border-b py-5">
                <div className="flex">
                    <GrGroup size={25}/>
                    <p className="pl-3">Groups</p>
                </div>
                <div className="px-2">
                    <FaChevronDown/>
                </div>
            </div>
        </div>
    )
}

export default DrawerNavLeft