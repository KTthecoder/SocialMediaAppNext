import type { Metadata } from 'next'
import { IoCalendarClearOutline } from "react-icons/io5";
import { FaRegComment } from "react-icons/fa";
import Link from 'next/link'
import prisma from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import SavePostBtn from '@/components/SavePostBtn'
import { notFound } from 'next/navigation'
import AddCommentForm from '@/components/forms/AddCommentForm';
import LikePostBtn from '@/components/LikePostBtn';
import DislikePostBtn from '@/components/DislikePostBtn';
import Image from 'next/image';

type Props = {
    params: {
        slug: string
    }
}

export const metadata: Metadata = {
  title: 'SocialMediaApp',
  description: 'Home page of SocialMediaApp',
}

const page = async (props: Props) => {
    const session = await getServerSession(authOptions)
    const post = await prisma.posts.findFirst({where: {id: props.params.slug}, select: {
        description: true,
        createdAt: true,
        likes: true,
        disLikes: true,
        id: true,
        PostImages: {select: {
            src: true, 
            alt: true,
        }},
        user: {
        select: {
            username: true,
            profileImgAlt: true,
            profileImg: true,
            id: true,
        }
        },
        SavedPosts: {where: {usersId: session?.user.id, postsId: props.params.slug}, select: {postsId: true, usersId: true}},
        PostComments: {
            select: {
                text: true,
                user: {
                select: {
                    username: true,
                }
                },
                _count: true
            },
            orderBy: {createdAt: 'desc'}
        },
        LikedPosts: {
            where: {usersId: session?.user.id, postId: props.params.slug},
            select: {usersId: true, postId: true}
        },
        DisLikedPosts: {
            where: {usersId: session?.user.id, postsId: props.params.slug},
            select: {usersId: true, postsId: true}
        }
    }})

    if(!post){
        return notFound()
    }

    return (
        <main className='w-full flex flex-row items-center justify-center'>
            <div className='w-full flex flex-col justify-center mt-20 md:w-9/12 md:mt-24 lg:w-full lg:justify-between lg:mt-28 max-w-[1700px]'>
                <div className='flex flex-col justify-center items-center lg:flex-row lg:justify-between lg:items-start lg:px-10'>
                    <div className='flex justify-center items-center w-full lg:w-7/12 lg:mr-12 xl:pr-12 2xl:pr-24'>
                        {post.PostImages.map((item, key) => (
                            <Image key={key} width={0} height={0} sizes={'100%'} style={{ width: '100%', height: 'auto' }} src={item.src} alt={item.alt}/>
                        ))}
                    </div>
                    <div className='flex flex-col w-10/12 items-center mt-1 md:w-full lg:w-5/12 lg:mt-0'>
                        <div className='w-full flex flex-row items-center justify-between border-b-[#222] border-b mb-2 pb-3 mt-5 lg:mt-0'>
                            <Link href={`/account/${post.user.username}`} className='flex flex-row items-center justify-start'>
                                {post.user.profileImg != null ? <Image width={0} height={0} sizes={'100%'} className='w-[40px] h-[40px] rounded-full bg-center bg-cover' src={post.user.profileImg} alt='User'/>
                                : <div className='w-[40px] h-[40px] rounded-full bg-center bg-cover bg-[#222]'></div>}
                                <p className='pl-3'>{post?.user.username}</p>
                            </Link>
                            <div className='items-center justify-end w-5/12 hidden sm:flex'>
                                <IoCalendarClearOutline/>
                                <p className='pl-2'>{post?.createdAt.toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className='flex items-start justify-start w-full'>
                            <p>{post?.description}</p>
                        </div>
                        <div className='flex items-start justify-between w-full mt-4 border-b border-b-[#222] pb-4 mb-4'>
                            <div className='flex'>
                                {post.LikedPosts.length === 0 ? 
                                <LikePostBtn likes={post.likes} postId={post.id} userId={session?.user.id} liked={false}/>
                                : post.LikedPosts.length === 1 ? 
                                <LikePostBtn likes={post.likes} postId={post.id} userId={session?.user.id} liked={true}/> : null}
        
                                {post.DisLikedPosts.length === 0 ? 
                                <DislikePostBtn disLikes={post.disLikes} postId={post.id} userId={session?.user.id} liked={false}/>
                                : post.DisLikedPosts.length === 1 ? 
                                <DislikePostBtn disLikes={post.disLikes} postId={post.id} userId={session?.user.id} liked={true}/> : null}

                                <div className='flex flex-col items-center sm:flex-row'>
                                    <FaRegComment className='text-[21px] sm:text-[23px]'/>
                                    <p className='sm:pl-2 text-sm sm:text-base'>{post.PostComments.length}</p>
                                </div>
                            </div>
                            {session && post.SavedPosts.map((item, key) => {
                                if(item.postsId === post.id && item.usersId === session.user.id){
                                    return <SavePostBtn saved={true} id={post.id} username={session.user.username} key={key}/>
                                }
                                else{
                                    return <SavePostBtn saved={false} id={post.id} username={session.user.username} key={key}/>
                                }
                            })}
                        </div>
                        <div className='flex flex-col w-full'>
                            {session && <AddCommentForm userId={session?.user.id} postId={post.id}/>}
                            {post.PostComments.length === 0 ? null
                            : post.PostComments.map((item, key) => (
                                <div className='flex mb-3 justify-between' key={key}>
                                    <p className='w-10/12 text-sm sm:text-base text-gray-300'><span className='font-medium tracking-wide text-white'>{item.user.username}</span> {item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default page