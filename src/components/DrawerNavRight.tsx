'use client'
import { LuUsers } from "react-icons/lu";
import UserImage from '@/static/images/shortImg.jpeg'
import { FaChevronDown } from "react-icons/fa";
import DrawerFriend from "./DrawerFriend";
import { useState } from "react";
import Link from "next/link";

type Props = {
    isAuthenticated: boolean,
    friends?: [{
        username: string,
        profileImg: string,
        profileImgAlt: string,
    }]
}

const DrawerNavRight = (props: Props) => {
    const [showFriends, setShowFriends] = useState(true)

    return (
        <div className="hidden xl:flex flex-col lg:w-3/12 lg:max-w-[270px]">
            <div className="flex items-center justify-between w-full border-b-[#222] border-b pb-5">
                <Link href='/account/friends' className="flex">
                    <LuUsers size={25}/>
                    <p className="pl-3">Your Friends</p>
                </Link>
                <button className="px-2" onClick={() => setShowFriends(!showFriends)}>
                    <FaChevronDown/>
                </button>
            </div>
            <div className={`${showFriends === false ? 'hidden' : 'flex'} flex-col`}>
                <DrawerFriend/>
                <DrawerFriend/>
                <DrawerFriend/>
                <DrawerFriend/>
            </div>
            {showFriends === false 
            ? null
            : <button className="w-full bg-blue-500 text-center py-1 rounded-md mt-5">Show More</button>}
        </div>
    )
}

export default DrawerNavRight