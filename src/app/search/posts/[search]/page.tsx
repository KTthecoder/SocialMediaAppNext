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

    const groups = await prisma.groups.findMany({where: {UserInGroup: {some: {usersId: user?.id}}}, include: {
        _count: {select: {UserInGroup: true}}
    }})

    const posts = await prisma.posts.findMany({where: {description: {contains: props.params.search}}, take: 15, select: {
        user: {
            select: {
                username: true,
                profileImg: true,
                profileImgAlt: true,
                id: true,
            }
        },
        id: true,
        createdAt: true,
        description: true,
        likes: true,
        disLikes: true,
        SavedPosts: {where: {usersId: session?.user.id}, select: {postsId: true, usersId: true}},
        PostComments: {
            select: {
                text: true,
                user: {
                    select: {
                        username: true,
                    }
                }
            },
            take: 3
        },
        PostImages: {select: {
            src: true, 
            alt: true,
        }},
        LikedPosts: {
          where: {usersId: session?.user.id},
          select: {usersId: true, postId: true}
        },
        DisLikedPosts: {
          where: {usersId: session?.user.id},
          select: {usersId: true, postsId: true}
        }
    }, orderBy: {createdAt: 'desc'}})

    return (
        <main className='w-full flex flex-row items-center justify-center'>
            <div className='w-10/12 flex flex-row justify-center mt-24 max-w-[1700px] lg:justify-between lg:mt-28'>
            <DrawerNavLeft groups={groups} user={{username: user?.username, profileImg: user?.profileImg?.toString(), profileImgAlt: user?.profileImgAlt?.toString()}}/>
            <div className='flex flex-col w-full md:w-[600px] lg:w-7/12 xl:w-5/12'>
                <div className='flex flex-col mb-10'>
                    <h1 className='text-2xl tracking-wider pt-3 mb-3 flex items-center'><IoMdSearch size={25} className='mr-3'/> Search results</h1>
                    <p className='text-gray-300 tracking-wide border-t border-t-[#111] pt-3'><span className='font-medium text-gray-200'>Found for: </span>{props.params.search}</p>
                </div>
                <div className='flex flex-col mb-10 border-b border-b-[#111] pb-5 mt-2'>
                    <h1 className='text-2xl tracking-wider pt-3 flex items-center'><MdOutlineArticle size={25} className='mr-3'/> Posts</h1>
                </div>
                {posts.map((item, key) => (
                    <Article currentUserId={session?.user.id} userId={item.user.id} comments={item.PostComments} key={key} saved={session && item.SavedPosts.map((item1) => {
                        if(item1.postsId === item.id && item1.usersId === session.user.id){
                          return true
                        }
                        else{
                          return false
                        }
                      })} id={item.id} createdAt={item.createdAt.toLocaleDateString().toString()} username={item.user.username} description={item.description?.toString()} 
                    likes={item.likes} disLikes={item.disLikes} number={key} liked={session && item.LikedPosts.map((item1) => {
                        if(item1.postId === item.id && item1.usersId === session.user.id){
                          return true
                        }
                        else{
                          return false
                        }
                    })} disLiked={session && item.DisLikedPosts.map((item1) => {
                        if(item1.postsId === item.id && item1.usersId === session.user.id){
                          return true
                        }
                        else{
                          return false
                        }
                    })} postImages={item.PostImages} profileImg={item.user.profileImg ? item.user.profileImg : null} 
                    profileImgAlt={item.user.profileImgAlt ? item.user.profileImgAlt : null}/>
                ))}
                <Link className='bg-[#0a0a0a] rounded-md py-2 text-center mb-5 mt-2' href='/'>Load more</Link>
            </div>
            <div className="hidden xl:flex flex-col lg:w-3/12 lg:max-w-[270px]"></div>
            </div>
        </main>
    )
}

export default page