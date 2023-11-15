import React from 'react'
import { IoCalendarClearOutline } from "react-icons/io5";
import ProfileImg from '../static/images/shortImg.jpeg'
import { FaRegHeart } from "react-icons/fa";
import { BiDislike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { MdSaveAlt } from "react-icons/md";
import PostImage from '../static/images/postImage.png'

type Props = {}

const Article = (props: Props) => {
  return (
    <div className='w-full flex flex-col items-center justify-center mb-10'>
        <div className='w-full flex flex-row items-center justify-between border-b-[#222] border-b mb-2 pb-3'>
            <div className='flex flex-row items-center justify-start'>
                <img className='w-[40px] h-[40px] rounded-full bg-center bg-cover' src={ProfileImg.src} alt='Profile'/>
                <p className='pl-3'>Username</p>
            </div>
            <div className='items-center justify-end w-5/12 hidden sm:flex'>
                <IoCalendarClearOutline/>
                <p className='pl-2'>09-11-2023</p>
            </div>
        </div>
        <div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
            <button className='text-blue-500 mt-1 mb-4'>Load more</button>
        </div>
        <img src={PostImage.src} className='aspect-[6/5]' alt='Main'/>
        <div className='flex items-start justify-between w-full mt-4 border-b border-b-[#222] pb-4 mb-4'>
            <div className='flex'>
                <button className='mr-4 flex flex-col items-center sm:flex-row'>
                    <FaRegHeart className='text-[21px] sm:text-[23px]'/>
                    <p className='sm:pl-2 text-sm sm:text-base'>22</p>
                </button>
                <button className='mr-4 flex flex-col items-center sm:flex-row'>
                    <BiDislike className='text-[21px] sm:text-[23px]'/>
                    <p className='sm:pl-2 text-sm sm:text-base'>33</p>
                </button>
                <button className='flex flex-col items-center sm:flex-row'>
                    <FaRegComment className='text-[21px] sm:text-[23px]'/>
                    <p className='sm:pl-2 text-sm sm:text-base'>44</p>
                </button>
            </div>
            <button className='flex flex-col items-center'>
                <MdSaveAlt className='text-[22px] sm:text-[24px]'/>
            </button>
        </div>
        <div>
            <div className='flex mb-3 justify-between'>
                <p className='w-10/12 text-sm sm:text-base text-gray-300'><span className='font-medium tracking-wide text-white'>Username</span> Adipiscing enim eu turpis egestas pretium aenean. Integer eget aliquet nibh praesent tristique magna sit amet.</p>
                <FaRegHeart className='text-[17px]'/>
            </div>
            <div className='flex mb-3 justify-between'>
                <p className='w-10/12 text-sm sm:text-base text-gray-300'><span className='font-medium tracking-wide text-white'>Username</span> Adipiscing enim eu turpis egestas pretium aenean. Integer eget aliquet nibh praesent tristique magna sit amet.</p>
                <FaRegHeart className='text-[17px]'/>
            </div>
            <button className='text-blue-500'>Show more</button>
        </div>
    </div>
  )
}

export default Article