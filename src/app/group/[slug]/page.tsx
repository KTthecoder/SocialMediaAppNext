import DrawerNavLeft from '@/components/DrawerNavLeft'
import type { Metadata } from 'next'
import Link from 'next/link';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { IoMdAdd } from "react-icons/io";
import Article from '@/components/Article';

type Props = {
  params: {
    slug: string
  }
}

export const metadata: Metadata = {
  title: 'Group Details | SocialMediaApp',
  description: 'Group Details page of SocialMediaApp',
}

const page = async (props: Props) => {
  const session = await getServerSession(authOptions)
  const user = await prisma.users.findFirst({where: {username: session?.user.username}, select: {
    username: true,
    profileImg: true,
    profileImgAlt: true,
    id: true,
  }})
  const group = await prisma.groups.findFirst({where: {id: props.params.slug}})
  const posts = await prisma.posts.findMany({ where: {groupsId: props.params.slug}, select: {
    description: true,
    createdAt: true,
    likes: true,
    disLikes: true,
    id: true,
    user: {
      select: {
        username: true,
        profileImgAlt: true,
        profileImg: true,
        id: true,
      }
    },
    PostImages: {select: {
      src: true, 
      alt: true,
    }},
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
    LikedPosts: {
      where: {usersId: session?.user.id},
      select: {usersId: true, postId: true}
    },
    DisLikedPosts: {
      where: {usersId: session?.user.id},
      select: {usersId: true, postsId: true}
    }
  }, orderBy: {createdAt: 'desc'}})
  const groups = await prisma.groups.findMany({where: {UserInGroup: {some: {usersId: user?.id}}}, include: {
    _count: {select: {UserInGroup: true}}
  }})

  return (
    <main className='w-full flex flex-row items-center justify-center'>
      <div className='w-10/12 flex flex-row justify-center mt-24 max-w-[1700px] lg:justify-between lg:mt-28'>
        <DrawerNavLeft groups={groups} user={{username: user?.username, profileImg: user?.profileImg?.toString(), profileImgAlt: user?.profileImgAlt?.toString()}}/>
        <div className='flex flex-col w-full md:w-[600px] lg:w-7/12 xl:w-5/12'>
          <div className='flex flex-col mb-7 border-b border-b-[#111] pb-5 sm:justify-between sm:flex-row sm:w-full'>
            <h1 className='text-2xl tracking-wider flex items-center w-full'>{group?.name}</h1>
            <Link href={`/account/create-post/group/${props.params.slug}`} className='bg-blue-500 rounded-full w-[42px] h-[40px] flex justify-center items-center mt-5 sm:mt-0'><IoMdAdd size={25}/></Link>
          </div>
          {posts.length === 0 ? <h1 className='-mt-2'>No posts in group</h1> : posts.map((item, key) => (
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
        </div>
        <div className="hidden xl:flex flex-col lg:w-3/12 lg:max-w-[270px]"></div>
      </div>
    </main>
  )
}

export default page