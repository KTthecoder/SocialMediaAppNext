import DrawerNavLeft from '@/components/DrawerNavLeft'
import type { Metadata } from 'next'
import PostImage from '@/static/images/postImage.png'
import { RiPlayListAddFill } from "react-icons/ri";

type Props = {}

export const metadata: Metadata = {
  title: 'Create post | SocialMediaApp',
  description: 'Create post page of SocialMediaApp',
}

const page = (props: Props) => {
    return (
      <main className='w-full flex flex-row items-center justify-center'>
        <div className='w-10/12 flex flex-row justify-center mt-24 max-w-[1700px] lg:justify-between lg:mt-28'>
          <DrawerNavLeft/>
          <div className='flex flex-col w-full md:w-[600px] lg:w-7/12 xl:w-5/12'>
            <div className='flex flex-col mb-6 border-b border-b-[#111] pb-5'>
              <h1 className='text-2xl tracking-wider pt-3 flex items-center'><RiPlayListAddFill size={25} className='mr-3'/>Create Post</h1>
            </div>
            <form className='flex flex-col justify-center w-full'>
                <div className='flex flex-col items-start justify-center px-4 w-full py-1 rounded-md bg-[#060606] pb-4'>
                    <label className='mt-2 pb-3 tracking-wide border-b border-b-[#111] w-full font-medium'>Images</label>
                    <div className='grid grid-cols-1 gap-5 mt-5 sm:grid-cols-2'>
                        <img src={PostImage.src} className='rounded-md aspect-square' alt='Post'/>
                        <img src={PostImage.src} className='rounded-md aspect-square' alt='Post'/>
                        <img src={PostImage.src} className='rounded-md aspect-square' alt='Post'/>
                    </div>
                    <button className='w-full py-2 mt-5 bg-[#222] rounded-md'>Add Images</button>
                </div>
                <div className='flex flex-col items-start justify-center px-4 w-full py-1 mt-5 rounded-md bg-[#060606]'>
                    <label className='mt-2 pb-3 tracking-wide border-b border-b-[#111] w-full font-medium'>Description</label>
                    <textarea className='w-full py-3 bg-transparent outline-none' placeholder='Description' name='description'/>
                </div>
                <div className='flex flex-col md:flex-row'>
                    <button type='submit' className='w-full bg-blue-500 text-white border-none py-2 tracking-wide rounded-md mt-5'>Create Post</button>
                </div>
            </form>
          </div>
          <div className="hidden xl:flex flex-col lg:w-3/12 lg:max-w-[270px]"></div>
        </div>
      </main>
    )
}

export default page