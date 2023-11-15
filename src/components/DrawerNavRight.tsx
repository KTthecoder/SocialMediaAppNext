import Link from "next/link";
import { LuUsers } from "react-icons/lu";
import { MdSaveAlt } from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import { FiUser } from "react-icons/fi";

type Props = {}

const DrawerNavRight = (props: Props) => {
  return (
    <div className="hidden lg:flex flex-col lg:w-3/12 lg:max-w-[270px]">
        <div className="flex items-center justify-start w-full border-b-[#222] border-b py-5">
            <LuUsers size={25}/>
            <p className="pl-3">Your Friends</p>
        </div>
        <div className="flex items-center justify-start w-full border-b-[#222] border-b py-5">
            <FiUser size={25}/>
            <p className="pl-3">Username</p>
        </div>
        <div className="flex items-center justify-start w-full border-b-[#222] border-b py-5">
            <FiUser size={25}/>
            <p className="pl-3">Username</p>
        </div>
        <div className="flex items-center justify-start w-full border-b-[#222] border-b py-5">
            <FiUser size={25}/>
            <p className="pl-3">Username</p>
        </div>
        <div className="flex items-center justify-start w-full border-b-[#222] border-b py-5">
            <FiUser size={25}/>
            <p className="pl-3">Username</p>
        </div>
        <div className="flex items-center justify-start w-full border-b-[#222] border-b py-5">
            <FiUser size={25}/>
            <p className="pl-3">Username</p>
        </div>
    </div>
  )
}

export default DrawerNavRight