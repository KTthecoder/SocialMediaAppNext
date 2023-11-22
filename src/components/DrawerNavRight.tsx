'use client'
import { LuUsers } from "react-icons/lu";
import { FaChevronDown } from "react-icons/fa";
import DrawerFriend from "./DrawerFriend";
import { useState } from "react";
import Link from "next/link";

type Props = {
    isAuthenticated: boolean,
    friends?: {user1: {
        username: string;
        profileImg: string | null;
        profileImgAlt: string | null;
    };
    user2: {
        username: string;
        profileImg: string | null;
        profileImgAlt: string | null;
    }}[],
    userId: string | null | undefined
}

const DrawerNavRight = (props: Props) => {
    const [showFriends, setShowFriends] = useState(true)

    // const getFriends = () => {
    //     var friends1 = []
    //     var friends2 = []
    //     if(props.friends && props.friends?.length > 0){
    //         props.friends.map((item) => {
    //             if(item.user1.username != props.userId){
    //                 friends1.push(item)
    //             }

    //             if(item.user2.username != props.userId){
    //                 friends1.push(item)
    //             }
    //         })
    //     }
    // }

    return (
        <>
            {props.isAuthenticated === false ?
            <div className="hidden xl:flex flex-col lg:w-3/12 lg:max-w-[270px]">
                <div className="flex items-center justify-between w-full border-b-[#222] border-b pb-5">
                    <Link href='/account/friends' className="flex">
                        <LuUsers size={25}/>
                        <p className="pl-3">Your Friends</p>
                    </Link>
                </div>
                <Link href='/login' className="w-full bg-blue-500 text-center py-1 rounded-md mt-5">Find Friends</Link>
            </div>
            : 
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
            </div>}
        </>
    )
}

export default DrawerNavRight