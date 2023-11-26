import Article from '@/components/Article'
import DrawerNavLeft from '@/components/DrawerNavLeft'
import type { Metadata } from 'next'
import ProfileImg from '@/static/images/shortImg.jpeg'
import { MdOutlineArticle } from "react-icons/md";
import Link from 'next/link';
import prisma from '@/lib/db';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import LogoutBtn from '@/components/LogoutBtn';
import AddToFriendBtn from '@/components/AddToFriendBtn';
import DeleteFriendBtn from '@/components/DeleteFriendBtn';

export const metadata: Metadata = {
  title: 'Account | SocialMediaApp',
  description: 'Account page of SocialMediaApp',
}

type Props = {
  params: { username: string }
}

const page = async (props: Props) => {
  const session = await getServerSession(authOptions)
  const user = await prisma.users.findFirst({where: {username: props.params.username}, select: {
    username: true,
    description: true,
    profileImg: true,
    profileImgAlt: true,
    id: true
  }})
  const currentUser = await prisma.users.findFirst({where: {username: session?.user.username}, select: {
    username: true,
    profileImg: true,
    profileImgAlt: true,
  }})
  const posts = await prisma.posts.findMany({where: {usersId: user?.id}, select: {
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
    },
    LikedPosts: {
      where: {usersId: session?.user.id},
      select: {usersId: true, postId: true}
    },
    DisLikedPosts: {
      where: {usersId: session?.user.id},
      select: {usersId: true, postsId: true}
    }
  }})
  const groups = await prisma.groups.findMany({where: {UserInGroup: {some: {usersId: user?.id}}}, include: {
    _count: {select: {UserInGroup: true}}
  }})
  const postsCount = await prisma.posts.count({where: {usersId: user?.id}})
  const friendsCount = await prisma.friends.count({ where: {
    OR: [{
      user1Id: user?.id,
    }, {
      user2Id: user?.id
    }]
  }})
  const groupsCount = await prisma.groups.count({where: {UserInGroup: {some: {usersId: user?.id}}}})

  if(!user){
    return notFound()
  }

  return (
    <main className='w-full flex flex-row items-center justify-center'>
      <div className='w-10/12 flex flex-row justify-center mt-24 max-w-[1700px] lg:justify-between lg:mt-28'>
        <DrawerNavLeft groups={groups} user={{username: currentUser?.username, profileImg: currentUser?.profileImg?.toString(), profileImgAlt: currentUser?.profileImgAlt?.toString()}}/>
        <div className='flex flex-col w-full md:w-[600px] lg:w-7/12 xl:w-5/12'>
          <div className='flex flex-row items-start justify-between'>
            <div className='flex flex-col'>
              <img className='w-[70px] aspect-square rounded-full' src={ProfileImg.src} alt='Profile'/>
              <p className='mt-3 tracking-wider font-medium sm:mt-4'>{user?.username}</p>
            </div>
            <div className='flex flex-row justify-end items-center'>
              <div className='flex flex-col items-center justify-center'>
                <p>{postsCount}</p>
                <p className='text-gray-300'>Posts</p>
              </div>
              <Link href='/account/friends' className='flex flex-col items-center justify-center mx-4'>
                <p>{friendsCount}</p>
                <p className='text-gray-300'>Friends</p>
              </Link>
              <Link href='/groups' className='flex flex-col items-center justify-center'>
                <p>{groupsCount}</p>
                <p className='text-gray-300'>Groups</p>
              </Link>
            </div>
          </div>
          <p className='text-sm mt-2 sm:text-base text-gray-200'>{user?.description}</p>
          <div className='mt-4'>
            {session?.user.username === user.username ?
            <div className='flex flex-row'>
              <Link href='/account/edit-account' className='bg-[#111] rounded-md px-4 mr-4 py-1'>Edit profile</Link>
              <LogoutBtn/>
            </div>
            : session?.user.username != user.username && friendsCount === 0 ?
              <AddToFriendBtn user1Id={session?.user.id} user2Id={user.id}/>
            : session?.user.username != user.username && friendsCount === 1 ?
              <DeleteFriendBtn user1Id={session?.user.id} user2Id={user.id}/>
            : null}
          </div>
          <div className='flex flex-col mb-10 border-b border-b-[#111] pb-5 mt-8'>
            <h1 className='text-2xl tracking-wider pt-3 flex items-center'><MdOutlineArticle size={25} className='mr-3'/> 
            {session?.user.username === user.username ? " Your Posts" : "User's Posts"}</h1>
          </div>
          {posts.map((item, key) => (
            <Article currentUserId={session?.user.id} userId={item.user.id} comments={item.PostComments} key={key} saved={item.SavedPosts[key] ? item.SavedPosts[key].postsId : ''} id={item.id} createdAt={item.createdAt.toLocaleDateString().toString()} username={item.user.username} description={item.description?.toString()} 
            likes={item.likes} disLikes={item.disLikes} current={true} currentUser={session?.user.username} number={key} liked={session && item.LikedPosts.map((item1) => {
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
            })}/>
          ))}
        </div>
        <div className="hidden xl:flex flex-col lg:w-3/12 lg:max-w-[270px]"></div>
      </div>
    </main>
  )
}

export default page