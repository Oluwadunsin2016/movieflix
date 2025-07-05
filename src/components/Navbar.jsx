import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AccountDropdown from "./AccountDropdown";
import SearchInput from "./SearchInput";
import { Search } from "lucide-react";

const Navbar = () => {
  const { user, logout, scrollRef } = useAuth();
  const navigate=useNavigate()
  const [searchText, setSearchText] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const dropdownRef = useRef(null);



  const handleSearch = () => {
    const params = new URLSearchParams({
      search: searchText
    });
    navigate(`/?${params.toString()}`);
    setShowSearch(false);
  };


  return (
    <div ref={scrollRef} className="flex items-center justify-end py-4 px-4 md:px-12 lg:px-16 xl:px-20 2xl:px-24 relative border-b border-gray-800 bg-black/60 backdrop-blur-md z-50">
      <Link to="/" className="absolute left-0 md:left-8 lg:left-12 top-1/2 -translate-y-1/2">
        <img className="w-36 md:w-48" src="./movieflix.png" alt="logo" />
      </Link>
  <div className="flex md:w-1/2 lg:w-1/3 items-center justify-end gap-4 md:gap-6">
  <div className="hidden md:block w-full">
  <SearchInput handleSearch={handleSearch} setSearchText={setSearchText} />
  </div>
      <div className='md:hidden' ref={dropdownRef}>
      <Search
        onClick={() => setShowSearch(!showSearch)} 
        className="size-5 cursor-pointer text-gray-500" 
      />
      <div 
        className={`fixed left-0 w-screen mt-1 p-3 z-50 shadow-sm
          transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${showSearch 
            ? 'opacity-100 translate-y-0 top-12' 
            : 'opacity-0 -translate-y-10 top-0'}`}
      >
        <SearchInput
          handleSearch={handleSearch} 
          setSearchText={setSearchText} 
        />
      </div>
    </div>
     {user?
     <AccountDropdown user={user} logout={logout} />
      // <div className="flex items-center gap-4">
      //   <Link to="/account">
      //     <button className="text-white border rounded px-4 py-1 md:px-6 md:py-2 border-gray-600 ">Account</button>
      //   </Link>
      //     <button onClick={logout} className="bg-red-600 px-4 py-1 md:px-6 md:py-2 rounded cursor-pointer text-white">
      //       Log Out
      //     </button>
      // </div>
      :
        <Link to="/login">
          <button className="text-white border whitespace-nowrap rounded px-4 py-1 md:px-6 md:py-2 border-gray-600 ">Sign In</button>
        </Link>}
  </div>
    </div>
  );
};

export default Navbar;
