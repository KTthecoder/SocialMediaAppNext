'use client'
import Link from "next/link";
import { LuUsers } from "react-icons/lu";
import { MdSaveAlt } from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import UserImage from '@/static/images/shortImg.jpeg'
import { FaChevronDown } from "react-icons/fa";
import { usePathname } from "next/navigation";
import DrawerGroup from "./DrawerGroup";
import { useState } from "react";
import { FiUser } from "react-icons/fi";

type Props = {
    user?: {
        username?: string,
        profileImg?: string,
        profileImgAlt?: string,
    } | null,
    groups?: {
        image?: string,
        imageAlt?: string,
        name?: string,
        status?: string,
        id?: string,
        _count: {
            UserInGroup: number;
        }
    }[] | null
}

const DrawerNavLeft = (props: Props) => {
    const pathname = usePathname()
    const [showGroups, setShowGroups] = useState(false)

    return (
        <div className='hidden lg:flex flex-col lg:w-4/12 lg:max-w-[270px] xl:w-3/12'>
            {props.user === null ?
            <>
                <Link className="flex items-center justify-start w-full border-b-[#222] border-b pb-5" href='/login'>
                    <FiUser size={25}/>
                    <p className="pl-3">Profile</p>
                </Link>
                <Link className="flex items-center justify-start w-full border-b-[#222] border-b py-5" 
                href='/login'>
                    <LuUsers size={25}/>
                    <p className="pl-3">Friends</p>
                </Link>
                <Link className="flex items-center justify-start w-full border-b-[#222] border-b py-5" 
                href='/login'>
                    <MdSaveAlt size={25}/>
                    <p className="pl-3">Saved</p>
                </Link>
                <div className={`${showGroups === false ? ' pb-5' : 'pb-0'} flex border-b-[#222] border-b flex-col items-center justify-between w-full mt-5`}>
                    <div className="flex flex-row justify-between w-full items-center">
                        <Link href='/login' className="flex">
                            <GrGroup size={25}/>
                            <p className="pl-3">Groups</p>
                        </Link>
                    </div>
                </div>
            </>
            : 
            <>
                <Link className={`${pathname.startsWith(`/account/${props.user?.username}`) ? 'border-b-blue-500 text-blue-500' : null} flex items-center justify-start w-full border-b-[#222] border-b pb-5`} href={`/account/${props.user?.username}`}>
                    {props.user?.profileImg != null ? <img className="w-[40px] h-[40px] rounded-full" src={props.user?.profileImg} alt={props.user?.profileImgAlt}/>
                    : <div className="w-[40px] h-[40px] rounded-full bg-[#222]"></div>}
                    <p className="pl-3">{props.user?.username}</p>
                </Link>
                <Link className={`${pathname === '/account/friends' ? 'border-b-blue-500 text-blue-500' : null} flex items-center justify-start w-full border-b-[#222] border-b py-5`} 
                href='/account/friends'>
                    <LuUsers size={25}/>
                    <p className="pl-3">Friends</p>
                </Link>
                <Link className={`${pathname === '/account/saved-posts' ? 'border-b-blue-500 text-blue-500' : null} flex items-center justify-start w-full border-b-[#222] border-b py-5`} 
                href='/account/saved-posts'>
                    <MdSaveAlt size={25}/>
                    <p className="pl-3">Saved</p>
                </Link>
                <div className={`${showGroups === false ? ' pb-5' : 'pb-0'} flex border-b-[#222] border-b flex-col items-center justify-between w-full mt-5`}>
                    <div className="flex flex-row justify-between w-full items-center">
                        <Link href='/groups' className="flex">
                            <GrGroup size={25}/>
                            <p className="pl-3">Groups</p>
                        </Link>
                        <button className="px-2" onClick={() => setShowGroups(!showGroups)}>
                            <FaChevronDown/>
                        </button>
                    </div>
                    <div className={`${showGroups === false ? 'hidden' : 'flex'} flex-col items-center w-full mt-5`}>
                        {props.groups?.map((item, key) => (
                            <DrawerGroup id={item.id} image={item.image} name={item.name} status={item.status} usersCount={item._count.UserInGroup} imageAlt={item.imageAlt} key={key}/>
                        ))}
                    </div>
                </div>
            </>
            }
        </div>
    )
}

export default DrawerNavLeft