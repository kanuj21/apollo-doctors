"use client";

import { FaMapMarkerAlt, FaSearch, FaUser } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full shadow-xl">
      {/* Upper Part */}
      <div className="flex items-center justify-between px-20 my-0.5 h-[58px] border-b-[1px] gap-x-24">
        {/* Logo */}
        <div className="w-[85px] h-[68px] p-1">
          <Image
            src="/apollo247.svg" // Replace with actual logo path
            alt="Company Logo"
            width={85}
            height={57}
          />
        </div>

        {/* Select Address */}
        <div className="flex items-center w-[155px] h-[46px] text-sm gap-2 text-gray-700">
          <FaMapMarkerAlt className="text-gray-600" />
          <span>Select Address</span>
        </div>

        {/* Search Box */}
        <div className="w-[614px] h-[41px] relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full h-full pl-10 pr-4 border-1 border-[#02475b] rounded-md focus:outline-none text-sm"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>

        {/* Login Button */}
        <button className="flex items-center gap-2 px-4 py-2 border-1 border-[#02475b] text-sm rounded-md text-gray-800 hover:bg-gray-100">
          <span>Login</span>
          <FaUser />
        </button>
      </div>

      {/* Lower Nav Links Part */}
      <nav className="flex items-center font-bold justify-center flex-wrap gap-16 px-20 h-[40px] text-sm text-gray-700 hover:text-[#02475b] ">
        
        <Link href="#">Buy Medicines</Link>
        <Link href="#">Find Doctors</Link>
        <Link href="#">Lab Tests</Link>
        <Link href="#">Circle Membership</Link>
        <Link href="#">Health</Link>
        <Link href="#">Diabetes Reversal</Link>
        <Link href="#">Buy Insurance</Link>
      
      </nav>
    </header>
  );
}
