import Link from "next/link";
import { LuUsers } from "react-icons/lu";
import { MdSaveAlt } from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import { FiUser } from "react-icons/fi";

type Props = {}

const DrawerNavLeft = (props: Props) => {
  return (
    <div className="hidden lg:flex flex-col lg:w-3/12 lg:max-w-[270px]">
        <Link className="flex items-center justify-start w-full border-b-[#222] border-b py-5" href='/account/username'>
            <FiUser size={25}/>
            <p className="pl-3">Username</p>
        </Link>
        <Link className="flex items-center justify-start w-full border-b-[#222] border-b py-5" href='/account/friends'>
            <LuUsers size={25}/>
            <p className="pl-3">Friends</p>
        </Link>
        <Link className="flex items-center justify-start w-full border-b-[#222] border-b py-5" href='/account/saved-posts'>
            <MdSaveAlt size={25}/>
            <p className="pl-3">Saved</p>
        </Link>
        <Link className="flex items-center justify-start w-full border-b-[#222] border-b py-5" href='/account/groups'>
            <GrGroup size={25}/>
            <p className="pl-3">Groups</p>
        </Link>
    </div>
  )
}

export default DrawerNavLeft