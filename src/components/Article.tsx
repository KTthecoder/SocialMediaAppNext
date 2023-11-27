
import { IoCalendarClearOutline } from "react-icons/io5";
import { FaRegComment } from "react-icons/fa";
import Link from 'next/link';
import SavePostBtn from "./SavePostBtn";
import LikePostBtn from "./LikePostBtn";
import DislikePostBtn from "./DislikePostBtn";
import EditBtn from "./EditBtn";
import Image from "next/image";

type Props = {
    userId: string,
    username: string,
    profileImg?: string | null,
    profileImgAlt?: string | null,
    createdAt: string,
    description?: string,
    postImages?: {src: string; alt: string}[],
    likes?: number,
    disLikes?: number,
    commentsCount?: number,
    id: string,
    saved: boolean[] | undefined | null,
    comments: {user: {username: string}, text: string}[],
    current?: boolean,
    currentUser?: string,
    currentUserId?: string,
    liked?: boolean[] | undefined | null,
    disLiked?: boolean[] | undefined | null,
    number: number,
}

const Article = async (props: Props) => {    
    return (
        <div className='w-full flex flex-col items-center justify-center mb-10'>
            <div className='w-full flex flex-row items-center justify-between border-b-[#222] border-b mb-2 pb-3'>
                <Link href={`/account/${props.username}`} className='flex flex-row items-center justify-start'>
                    {props.profileImg != null ? <Image width={0} height={0} sizes={'100%'} className='w-[40px] h-[40px] rounded-full bg-center bg-cover' src={props.profileImg} alt={props.profileImg}/> 
                    : <div className='w-[40px] h-[40px] rounded-full bg-center bg-cover bg-[#222]'></div>}
                    <p className='pl-3'>{props.username}</p>
                </Link>
                <div className='items-center justify-end w-5/12 hidden sm:flex'>
                    <IoCalendarClearOutline/>
                    <p className='pl-2'>{props.createdAt}</p>
                </div>
            </div>
            <div className='flex items-start justify-start flex-col w-full'>
                <p className="mt-1 mb-4">{props.description}</p>
                {props.description != undefined && props.description?.length >= 200 ? <button className='text-blue-500 -mt-3 mb-4'>Load more</button> : null}
            </div>
            <Link href={`/post/${props.id}`}>
                {props.postImages && props.postImages?.map((item, key) => (
                    <Image width={0} height={0} sizes={'100%'} style={{width: '100%'}} src={item.src} className='aspect-[6/5]' alt={item.alt} key={key}/>
                ))}  
            </Link>
            <div className='flex items-start justify-between w-full mt-4 border-b border-b-[#222] pb-4 mb-4'>
                <div className='flex flex-row'>
                    {props.liked && props.liked[0] === true ?
                    <LikePostBtn likes={props.likes} postId={props.id} userId={props.currentUserId} liked={true}/> : 
                    <LikePostBtn likes={props.likes} postId={props.id} userId={props.currentUserId} liked={false}/>}
                    {props.disLiked && props.disLiked[0] === true ?
                    <DislikePostBtn disLikes={props.disLikes} postId={props.id} userId={props.currentUserId} liked={true}/> : 
                    <DislikePostBtn disLikes={props.disLikes} postId={props.id} userId={props.currentUserId} liked={false}/>}
                    <Link href={`/post/${props.id}`} className='flex flex-col items-center sm:flex-row'>
                        <FaRegComment className='text-[21px] sm:text-[23px]'/>
                        <p className='sm:pl-2 text-sm sm:text-base'>{props.comments.length}</p>
                    </Link>
                    {props.currentUser && props.currentUser === props.username ? <EditBtn currentUser={props.currentUser} postId={props.id}/> : null}
                </div>
                {props.saved && props.saved[0] === true ?
                <SavePostBtn saved={true} id={props.id} username={props.currentUserId}/> : 
                <SavePostBtn saved={false} id={props.id} username={props.currentUserId}/>}
            </div>
            <div className="flex flex-col w-full">
                {props.comments.length === 0 ? null
                : props.comments.map((item, key) => (
                    <div className='flex mb-3 justify-between' key={key}>
                        <p className='w-10/12 text-sm sm:text-base text-gray-300'><span className='font-medium tracking-wide text-white'>{item.user.username}</span> {item.text}</p>
                    </div>
                ))}
                {props.comments.length === 0 ? null : props.comments.length >= 3 ? <Link href={`/post/${props.id}`} className='text-blue-500'>Show more</Link> : null}
            </div>
        </div>
    )
}

export default Article