import Article from '@/components/Article'
import DrawerNavLeft from '@/components/DrawerNavLeft'
import type { Metadata } from 'next'
import { IoMdSearch } from "react-icons/io";
import { LuUsers } from "react-icons/lu";
import { GrGroup } from "react-icons/gr";
import GroupHorizontal from '@/components/GroupHorizontal';
import { MdOutlineArticle } from "react-icons/md";
import FriendHorizontal from '@/components/FriendHorizontal';
import Link from 'next/link';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

type Props = {
    params: {
        search: string
    }
}

export const metadata: Metadata = {
  title: 'Search | SocialMediaApp',
  description: 'Search page of SocialMediaApp',
}

const page = async (props: Props) => {
    const session = await getServerSession(authOptions)
    const user = await prisma.users.findFirst({where: {username: session?.user.username}, select: {
        username: true,
        profileImg: true,
        profileImgAlt: true,
        id: true,
    }})

    const groupsCount = await prisma.groups.findMany({where: {UserInGroup: {some: {usersId: user?.id}}}, include: {
        _count: {select: {UserInGroup: true}}
    }})

    const groups = await prisma.groups.findMany({where: {OR: [{name: {contains: props.params.search}}, {description: {contains: props.params.search}}]}, orderBy: {createdAt: 'desc'}, include: {
        _count: {select: {
          UserInGroup: true
        }}
    }})
    
    return (
        <main className='w-full flex flex-row items-center justify-center'>
            <div className='w-10/12 flex flex-row justify-center mt-24 max-w-[1700px] lg:justify-between lg:mt-28'>
            <DrawerNavLeft groups={groupsCount} user={{username: user?.username, profileImg: user?.profileImg?.toString(), profileImgAlt: user?.profileImgAlt?.toString()}}/>
            <div className='flex flex-col w-full md:w-[600px] lg:w-7/12 xl:w-5/12'>
                <div className='flex flex-col mb-10'>
                    <h1 className='text-2xl tracking-wider pt-3 mb-3 flex items-center'><IoMdSearch size={25} className='mr-3'/> Search results</h1>
                    <p className='text-gray-300 tracking-wide border-t border-t-[#222] pt-3'><span className='font-medium text-gray-200'>Found for: </span>{props.params.search}</p>
                </div>
                <div className='flex flex-col mb-7 border-b border-b-[#222] pb-5'>
                    <h1 className='text-2xl tracking-wider pt-3 flex items-center'><GrGroup size={25} className='mr-3'/>Groups</h1>
                </div>
                {groups.length === 0 ? <h1 className='-mt-2 mb-5'>You are in 0 groups</h1> : 
                <>
                {groups.map((item, key) => (
                    <GroupHorizontal isAdmin={false} username={user?.username} image={item.image != null ? item.image : ''} id={item.id} description={item.description} name={item.name} usersCount={item._count} visible={item.status} key={key}/>
                ))}
                </>}
            </div>
            <div className="hidden xl:flex flex-col lg:w-3/12 lg:max-w-[270px]"></div>
            </div>
        </main>
    )
}

export default page