"use client";

import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white text-black flex items-center justify-between py-2.5 px-6 shadow-md sticky top-0 z-10">
      <button
        onClick={() => setIsOpen(true)}
        className="text-white focus:outline-none"
      >
        <Bars3Icon className="h-7 w-7 text-black" />
      </button>
      <div className="text-xl font-bold">KRUNCH</div>
      {/* {isOpen && (
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={() => setIsOpen(false)}
        ></div>
      )} */}
      {/* <div
        className={`relative top-0 left-0 h-full max-w-[400px] w-64 bg-white shadow-lg p-4 flex flex-col transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="self-end text-gray-600"
        >
          <XMarkIcon className="h-7 w-7" />
        </button>
        <ul className="mt-4 space-y-4">
          <li className="p-2 hover:bg-gray-200 cursor-pointer">Profile</li>
          <li className="p-2 hover:bg-gray-200 cursor-pointer">Settings</li>
          <li className="p-2 hover:bg-gray-200 cursor-pointer text-red-500">
            Logout
          </li>
        </ul>
      </div> */}

      <div
        className={`fixed md:absolute top-0 left-0 z-[99999] h-screen max-w-[170px] w-64 border-l py-2.5 overflow-hidden bg-white transform transition-transform duration-300 
          ${
            isOpen
              ? "translate-x-0 md:w-full  px-4"
              : "-translate-x-full md:w-0 px-0"
          }
          `}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="self-end text-gray-600"
        >
          <XMarkIcon className="h-7 w-7" />
        </button>
        <div className="mt-4 flex justify-center">
          <button className="bg-[#4d4b49] text-white text-base font-semibold rounded-full py-2 px-6 transition-colors">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
