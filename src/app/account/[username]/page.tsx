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

export const metadata: Metadata = {
  title: 'Account | SocialMediaApp',
  description: 'Account page of SocialMediaApp',
}

type Props = {
  params: { username: string }
}

const page = async (props: Props) => {
  const session = await getServerSession(authOptions)
  const user = await prisma.users.findUnique({where: {username: props.params.username}, select: {
    username: true,
    description: true,
    profileImg: true,
    profileImgAlt: true,
    id: true
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
    }
  }})

  if(!user){
    return notFound()
  }

  return (
    <main className='w-full flex flex-row items-center justify-center'>
      <div className='w-10/12 flex flex-row justify-center mt-24 max-w-[1700px] lg:justify-between lg:mt-28'>
        <DrawerNavLeft user={{username: user?.username, profileImg: user?.profileImg?.toString(), profileImgAlt: user?.profileImgAlt?.toString()}}/>
        <div className='flex flex-col w-full md:w-[600px] lg:w-7/12 xl:w-5/12'>
          <div className='flex flex-row items-start justify-between'>
            <div className='flex flex-col'>
              <img className='w-[70px] aspect-square rounded-full' src={ProfileImg.src} alt='Profile'/>
              <p className='mt-3 tracking-wider font-medium sm:mt-4'>{user?.username}</p>
            </div>
            <div className='flex flex-row justify-end items-center'>
              <div className='flex flex-col items-center justify-center'>
                <p>2</p>
                <p className='text-gray-300'>Posts</p>
              </div>
              <div className='flex flex-col items-center justify-center mx-4'>
                <p>423</p>
                <p className='text-gray-300'>Friends</p>
              </div>
              <div className='flex flex-col items-center justify-center'>
                <p>25</p>
                <p className='text-gray-300'>Groups</p>
              </div>
            </div>
          </div>
          <p className='text-sm mt-2 sm:text-base text-gray-200'>{user?.description}</p>
          <div className='mt-4'>
            {session?.user.username === user.username ?
            <>
              <Link href='/account/edit-account' className='bg-[#111] rounded-md py-1 px-4 mr-4'>Edit profile</Link>
              <button className='bg-[#111] rounded-md py-1 px-4'>Share profile</button>
            </>
            : <button className='bg-blue-500 rounded-md py-1 px-4 mr-4'>Add to friends</button>}
          {/* <button className='bg-blue-500 rounded-md py-1 px-4 mr-4'>Add to friends</button>
          <button className='bg-red-500 rounded-md py-1 px-4 mr-4'>Remove from friends</button> */}
          </div>
          <div className='flex flex-col mb-10 border-b border-b-[#111] pb-5 mt-8'>
            <h1 className='text-2xl tracking-wider pt-3 flex items-center'><MdOutlineArticle size={25} className='mr-3'/> 
            {session?.user.username === user.username ? " Your Posts" : "User's Posts"}</h1>
          </div>
          {posts.map((item, key) => (
            <Article comments={item.PostComments} key={key} saved={item.SavedPosts[0] ? item.SavedPosts[0].postsId : ''} id={item.id} createdAt={item.createdAt.toLocaleDateString().toString()} username={item.user.username} description={item.description?.toString()} 
            likes={item.likes} disLikes={item.disLikes}/>
          ))}
        </div>
        <div className="hidden xl:flex flex-col lg:w-3/12 lg:max-w-[270px]"></div>
      </div>
    </main>
  )
}

export default page