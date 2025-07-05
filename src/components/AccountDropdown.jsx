import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User} from "@heroui/react";
import { ChevronDown, LogOut, UserRound } from "lucide-react";
import { Link } from "react-router-dom";

export default function AccountDropdown({logout, user}) {
  return (
    <div className="flex items-center gap-4">
      <Dropdown showArrow className="bg-gray-900 text-white" placement="bottom-end">
        <DropdownTrigger>
            <div className="flex items-center cursor-pointer text-gray-400 gap-1">
            <Avatar className="size-8 md:size-10" src={user?.profileImage||"https://i.pinimg.com/236x/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg"}  />
          <ChevronDown className="size-5 md:size-6" />
            </div>
        </DropdownTrigger>
        <DropdownMenu >
          <DropdownItem key="account"><Link to="/account" className="flex items-center gap-2">
          <UserRound size={20} /> 
         <span>Account</span>
        </Link></DropdownItem>
          <DropdownItem onClick={logout} key="logout" color="danger">
            <div className="flex items-center gap-2">
            <LogOut size={20} />
            <span>Logout</span>
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
