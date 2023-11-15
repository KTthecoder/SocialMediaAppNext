import { LuUsers } from "react-icons/lu";
import UserImage from '@/static/images/shortImg.jpeg'
import { FaChevronDown } from "react-icons/fa";

type Props = {}

const DrawerNavRight = (props: Props) => {
  return (
    <div className="hidden xl:flex flex-col lg:w-3/12 lg:max-w-[270px]">
        <div className="flex items-center justify-between w-full border-b-[#222] border-b pb-5">
            <div className="flex ">
                <LuUsers size={25}/>
                <p className="pl-3">Your Friends</p>
            </div>
            <div className="px-2">
                <FaChevronDown/>
            </div>
        </div>
        <div className="flex items-center justify-start w-full border-b-[#222] border-b py-4">
            <img className="w-[37px] h-[37px] rounded-full" src={UserImage.src} alt='User'/>
            <p className="pl-3">Username</p>
        </div>
        <div className="flex items-center justify-start w-full border-b-[#222] border-b py-4">
            <img className="w-[37px] h-[37px] rounded-full" src={UserImage.src} alt='User'/>
            <p className="pl-3">Username</p>
        </div>
        <div className="flex items-center justify-start w-full border-b-[#222] border-b py-4">
            <img className="w-[37px] h-[37px] rounded-full" src={UserImage.src} alt='User'/>
            <p className="pl-3">Username</p>
        </div>
        <div className="flex items-center justify-start w-full border-b-[#222] border-b py-4">
            <img className="w-[37px] h-[37px] rounded-full" src={UserImage.src} alt='User'/>
            <p className="pl-3">Username</p>
        </div>
    </div>
  )
}

export default DrawerNavRight