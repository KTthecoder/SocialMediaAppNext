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

type Props = {}

export const metadata: Metadata = {
  title: 'Search | SocialMediaApp',
  description: 'Search page of SocialMediaApp',
}

const page = (props: Props) => {
    return (
        <main className='w-full flex flex-row items-center justify-center'>
            <div className='w-10/12 flex flex-row justify-center mt-24 max-w-[1700px] lg:justify-between lg:mt-28'>
            <DrawerNavLeft/>
            <div className='flex flex-col w-full md:w-[600px] lg:w-7/12 xl:w-5/12'>
                <div className='flex flex-col mb-10'>
                    <h1 className='text-2xl tracking-wider pt-3 mb-3 flex items-center'><IoMdSearch size={25} className='mr-3'/> Search results</h1>
                    <p className='text-gray-300 tracking-wide border-t border-t-[#111] pt-3'><span className='font-medium text-gray-200'>Found for: </span>text to search</p>
                </div>
                <div className='flex flex-col mb-10 border-b border-b-[#111] pb-5 mt-2'>
                    <h1 className='text-2xl tracking-wider pt-3 flex items-center'><MdOutlineArticle size={25} className='mr-3'/> Posts</h1>
                </div>
                <Article/>
                <Article/>
                <Link className='bg-[#0a0a0a] rounded-md py-2 text-center mb-5 mt-2' href='/'>Load more</Link>
            </div>
            <div className="hidden xl:flex flex-col lg:w-3/12 lg:max-w-[270px]"></div>
            </div>
        </main>
    )
}

export default page