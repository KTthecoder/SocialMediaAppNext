import Article from '@/components/Article'
import DrawerNavLeft from '@/components/DrawerNavLeft'
import DrawerNavRight from '@/components/DrawerNavRight'
import type { Metadata } from 'next'
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'SocialMediaApp',
  description: 'Home page of SocialMediaApp',
}

export default async function Home() {
  const session = await getServerSession(authOptions)
  const user = await prisma.users.findFirst({where: {username: session?.user.username}, select: {
    username: true,
    profileImg: true,
    profileImgAlt: true,
    id: true,
  }})

  const friends = await prisma.friends.findMany({where: {
    OR: [{
      user1Id: user?.id,
    }, {
      user2Id: user?.id
    }],
    isPending: false
  }, select: {
    user1: {
      select: {
        username: true,
        profileImg: true,
        profileImgAlt: true,
      }
    },
    user2: {
      select: {
        username: true,
        profileImg: true,
        profileImgAlt: true,
      }
    },
  }, take: 6})
  
  const posts = await prisma.posts.findMany({select: {
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
    SavedPosts: {where: {usersId: session?.user.id}, select: {postsId: true, usersId: true}},
    PostComments: {
      select: {
        text: true,
        user: {
          select: {
            username: true,
          }
        },
        _count: true
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
  }, orderBy: {createdAt: 'desc'}})

  const groups = await prisma.groups.findMany({where: {UserInGroup: {some: {usersId: user?.id}}}, include: {
    _count: {select: {UserInGroup: true}}
  }})

  if(session?.user){
    return (
      <main className='w-full flex flex-row items-center justify-center'>
        <div className='w-10/12 flex flex-row justify-center mt-24 max-w-[1700px] lg:justify-between lg:mt-28'>
          <DrawerNavLeft groups={groups} user={{username: user?.username, profileImg: user?.profileImg?.toString(), profileImgAlt: user?.profileImgAlt?.toString()}}/>
          <div className='flex flex-col w-full md:w-[600px] lg:w-7/12 xl:w-5/12'>
            {posts.map((item, key) => (
              <Article userId={item.user.id} currentUserId={session?.user.id} comments={item.PostComments} key={key} saved={item.SavedPosts.map((item1) => {
                if(item1.postsId === item.id && item1.usersId === session.user.id){
                  return true
                }
                else{
                  return false
                }
              })} id={item.id} createdAt={item.createdAt.toLocaleDateString().toString()} username={item.user.username} description={item.description?.toString()} 
              likes={item.likes} disLikes={item.disLikes} number={key} liked={item.LikedPosts.map((item1) => {
                if(item1.postId === item.id && item1.usersId === session.user.id){
                  return true
                }
                else{
                  return false
                }
              })} disLiked={item.DisLikedPosts.map((item1) => {
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
          <DrawerNavRight isAuthenticated={true} friends={friends} userId={null} currentUsername={session.user.username}/>
        </div>
      </main> 
    )
  }

  return (
    <main className='w-full flex flex-row items-center justify-center'>
      <div className='w-10/12 flex flex-row justify-center mt-24 max-w-[1700px] lg:justify-between lg:mt-28'>
        <DrawerNavLeft user={null} groups={null}/>
        <div className='flex flex-col w-full md:w-[600px] lg:w-7/12 xl:w-5/12'>
          {posts.map((item, key) => (
            <Article number={key} userId={item.user.id} comments={item.PostComments} key={key} saved={session && item.SavedPosts.map((item1) => {
              if(item1.postsId === item.id && item1.usersId === session.user.id){
                return true
              }
              else{
                return false
              }
            })} id={item.id} createdAt={item.createdAt.toLocaleDateString().toString()} username={item.user.username} description={item.description?.toString()} 
            likes={item.likes} disLikes={item.disLikes} postImages={item.PostImages} profileImg={item.user.profileImg ? item.user.profileImg : null} 
            profileImgAlt={item.user.profileImgAlt ? item.user.profileImgAlt : null}/>
          ))}
        </div>
        <DrawerNavRight isAuthenticated={false} userId={user?.id}/>
      </div>
    </main>
  )
}
