import Article from '@/components/Article'
import DrawerNavLeft from '@/components/DrawerNavLeft'
import type { Metadata } from 'next'
import { MdSaveAlt } from "react-icons/md";

export const metadata: Metadata = {
  title: 'Saved Posts | SocialMediaApp',
  description: 'Saved Posts page of SocialMediaApp',
}

type Props = {}

const page = (props: Props) => {
    return (
        <main className='w-full flex flex-row items-center justify-center'>
          <div className='w-10/12 flex flex-row justify-center mt-24 max-w-[1700px] lg:justify-between lg:mt-28'>
            <DrawerNavLeft/>
            <div className='flex flex-col w-full md:w-[600px] lg:w-7/12 xl:w-5/12'>
                <h1 className='text-2xl tracking-wider pt-3 pb-4 px-4 mb-10 rounded-md bg-[#060606] flex items-center'><MdSaveAlt size={25} className='mr-3'/> Saved Posts</h1>
                <Article/>
                <Article/>
            </div>
            <div className="hidden xl:flex flex-col lg:w-3/12 lg:max-w-[270px]"></div>
          </div>
        </main>
      )
}

export default page