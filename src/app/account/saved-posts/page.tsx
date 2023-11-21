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

type Props = {}

const page = async (props: Props) => {
  const session = await getServerSession(authOptions)
  const user = await prisma.users.findFirst({where: {username: session?.user.username}, select: {
    username: true,
    profileImg: true,
    profileImgAlt: true,
  }})

  const posts = await prisma.posts.findMany({where: {usersId: session?.user.id}, select: {
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
    SavedPosts: {select: {postsId: true}}
  }})

  if(!session?.user){
    return notFound()
  }

  return (
    <main className='w-full flex flex-row items-center justify-center'>
      <div className='w-10/12 flex flex-row justify-center mt-24 max-w-[1700px] lg:justify-between lg:mt-28'>
        <DrawerNavLeft user={{username: user?.username, profileImg: user?.profileImg?.toString(), profileImgAlt: user?.profileImgAlt?.toString()}}/>
        <div className='flex flex-col w-full md:w-[600px] lg:w-7/12 xl:w-5/12'>
          <h1 className='text-2xl tracking-wider pt-3 mb-10 border-b border-b-[#111] pb-5 flex items-center'><MdSaveAlt size={25} className='mr-3'/> Saved Posts</h1>
          {posts.map((item, key) => (
            <Article key={key} saved={item.SavedPosts[0] ? item.SavedPosts[0].postsId : ''} id={item.id} createdAt={item.createdAt.toLocaleDateString().toString()} username={item.user.username} description={item.description?.toString()} 
            likes={item.likes} disLikes={item.disLikes}/>
          ))}
        </div>
        <div className="hidden xl:flex flex-col lg:w-3/12 lg:max-w-[270px]"></div>
      </div>
    </main>
  )
}

export default page