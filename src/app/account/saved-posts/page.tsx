import Article from '@/components/Article'
import DrawerNavLeft from '@/components/DrawerNavLeft'
import prisma from '@/lib/db';
import type { Metadata } from 'next'
import { MdSaveAlt } from "react-icons/md";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Saved Posts | SocialMediaApp',
  description: 'Saved Posts page of SocialMediaApp',
}

const page = async () => {
  const session = await getServerSession(authOptions)
  const user = await prisma.users.findFirst({where: {username: session?.user.username}, select: {
    username: true,
    profileImg: true,
    profileImgAlt: true,
    id: true,
  }})
  const posts = await prisma.savedPosts.findMany({where: {usersId: session?.user.id}, select: {
    post: {
      select: {
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
          take: 3,
          orderBy: {createdAt: 'desc'}
        },
        LikedPosts: {
          where: {usersId: session?.user.id},
          select: {usersId: true, postId: true}
        },
        DisLikedPosts: {
          where: {usersId: session?.user.id},
          select: {usersId: true, postsId: true}
        }
      }
    }
  }})
  const groups = await prisma.groups.findMany({where: {UserInGroup: {some: {usersId: user?.id}}}, include: {
    _count: {select: {UserInGroup: true}}
  }})

  if(!session?.user){
    return notFound()
  }

  return (
    <main className='w-full flex flex-row items-center justify-center'>
      <div className='w-10/12 flex flex-row justify-center mt-24 max-w-[1700px] lg:justify-between lg:mt-28'>
        <DrawerNavLeft groups={groups} user={{username: user?.username, profileImg: user?.profileImg?.toString(), profileImgAlt: user?.profileImgAlt?.toString()}}/>
        <div className='flex flex-col w-full md:w-[600px] lg:w-7/12 xl:w-5/12'>
          <h1 className='text-2xl tracking-wider pt-3 mb-10 border-b border-b-[#222] pb-5 flex items-center'><MdSaveAlt size={25} className='mr-3'/> Saved Posts</h1>
          {posts.length === 0 ? <h1 className='-mt-5'>No saved posts found</h1> : posts.map((item, key) => (
            <Article currentUserId={session?.user.id} userId={item.post.user.id} comments={item.post.PostComments} key={key} saved={session && item.post.SavedPosts.map((item1) => {
              if(item1.postsId === item.post.id && item1.usersId === session.user.id){
                return true
              }
              else{
                return false
              }
            })} id={item.post.id} createdAt={item.post.createdAt.toLocaleDateString().toString()} username={item.post.user.username} description={item.post.description?.toString()} 
            likes={item.post.likes} disLikes={item.post.disLikes} number={key} liked={session && item.post.LikedPosts.map((item1) => {
              if(item1.postId === item.post.id && item1.usersId === session.user.id){
                return true
              }
              else{
                return false
              }
            })} disLiked={session && item.post.DisLikedPosts.map((item1) => {
              if(item1.postsId === item.post.id && item1.usersId === session.user.id){
                return true
              }
              else{
                return false
              }
            })} postImages={item.post.PostImages} profileImg={item.post.user.profileImg ? item.post.user.profileImg : null} 
            profileImgAlt={item.post.user.profileImgAlt ? item.post.user.profileImgAlt : null}/>
          ))}
        </div>
        <div className="hidden xl:flex flex-col lg:w-3/12 lg:max-w-[270px]"></div>
      </div>
    </main>
  )
}

export default page