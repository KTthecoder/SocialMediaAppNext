import type { Metadata } from 'next'
import PostImg from '@/static/images/postImage.png'
import ProfileImg from '@/static/images/shortImg.jpeg'
import { IoCalendarClearOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { BiDislike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import Link from 'next/link'
import prisma from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import SavePostBtn from '@/components/SavePostBtn'
import { notFound } from 'next/navigation'
import AddCommentForm from '@/components/forms/AddCommentForm';

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
        SavedPosts: {select: {postsId: true}},
        PostComments: {
            select: {
                text: true,
                user: {
                    select: {
                        username: true,
                    }
                }
            }
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
                        <img src={PostImg.src} alt='Post'/>
                    </div>
                    <div className='flex flex-col w-10/12 items-center mt-1 md:w-full lg:w-5/12 lg:mt-0'>
                        <div className='w-full flex flex-row items-center justify-between border-b-[#222] border-b mb-2 pb-3 mt-5 lg:mt-0'>
                            <Link href={`/account/${post.user.id}`} className='flex flex-row items-center justify-start'>
                                <img className='w-[40px] h-[40px] rounded-full bg-center bg-cover' src={ProfileImg.src} alt='Profile'/>
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
                                <button className='mr-4 flex flex-col items-center sm:flex-row'>
                                    <FaRegHeart className='text-[21px] sm:text-[23px]'/>
                                    <p className='sm:pl-2 text-sm sm:text-base'>{post?.likes}</p>
                                </button>
                                <button className='mr-4 flex flex-col items-center sm:flex-row'>
                                    <BiDislike className='text-[21px] sm:text-[23px]'/>
                                    <p className='sm:pl-2 text-sm sm:text-base'>{post?.disLikes}</p>
                                </button>
                                <button className='flex flex-col items-center sm:flex-row'>
                                    <FaRegComment className='text-[21px] sm:text-[23px]'/>
                                    <p className='sm:pl-2 text-sm sm:text-base'>{post.PostComments.length}</p>
                                </button>
                            </div>
                            <SavePostBtn saved={post.SavedPosts[0] ? post.SavedPosts[0].postsId : ''} id={post?.id} username={post?.user.username}/>
                        </div>
                        <div className='flex flex-col w-full'>
                            <AddCommentForm userId={post.user.id} postId={post.id}/>
                            {post.PostComments.length === 0 ? null
                            : post.PostComments.map((item) => (
                                <div className='flex mb-3 justify-between'>
                                    <p className='w-10/12 text-sm sm:text-base text-gray-300'><span className='font-medium tracking-wide text-white'>{item.user.username}</span> {item.text}</p>
                                    <FaRegHeart className='text-[17px]'/>
                                </div>
                            ))}
                            {post.PostComments.length === 0 ? null : post.PostComments.length >= 3 ? <Link href='/post/post-slug' className='text-blue-500'>Show more</Link> : null}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default page