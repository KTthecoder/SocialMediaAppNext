import Article from '@/components/Article'
import DrawerNavLeft from '@/components/DrawerNavLeft'
import DrawerNavRight from '@/components/DrawerNavRight'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SocialMediaApp',
  description: 'Home page of SocialMediaApp',
}

export default function Home() {
  return (
    <main className='w-full flex flex-row items-center justify-center'>
      <div className='w-10/12 flex flex-row justify-center mt-8 max-w-[1700px] sm:mt-10 lg:justify-between lg:w-11/12 2xl:w-10/12'>
        <DrawerNavLeft/>
        <div className='flex flex-col w-full md:w-[600px] lg:w-5/12'>
          <Article/>
          <Article/>
        </div>
        <DrawerNavRight/>
      </div>
    </main>
  )
}
