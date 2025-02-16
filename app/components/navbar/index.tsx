"use client";
import { useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { API_ENDPOINTS } from "@/app/constants/apiEndpoints";
import api from "@/app/utils/axiosInstance";
import { SocialIcon } from "@/app/types/common";
import { useAuth } from "@/app/context/AuthProvider";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [socialIcons, setSocialIcons] = useState<SocialIcon[]>([]);
  const { isAuthenticated } = useAuth();

  const fetchSocialIcons = async () => {
    try {
      const response = await api.get(API_ENDPOINTS.SOCIAL_ICONS);
      if (response.status === 200) {
        setSocialIcons(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSocialIcons();
  }, []);

  return (
    <nav className="bg-white text-black flex items-center justify-between py-2.5 px-6 shadow-md sticky top-0 z-10">
      <button
        onClick={() => setIsOpen(true)}
        className="text-white focus:outline-none"
      >
        <Bars3Icon className="h-7 w-7 text-black" />
      </button>
      <div className="flex gap-5">
        {socialIcons.map((icon, index) => (
          <Link href={icon.link} target="_blank" key={index}>
            <Image width={32} height={32} src={icon.image} alt="icon" />
          </Link>
        ))}
      </div>
      <div className="text-xl font-bold">
        <Link href="/">KRUNCH</Link>
      </div>
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
          <Link
            href={isAuthenticated ? "/logout" : "/login"}
            onClick={() => setIsOpen(false)}
            className="bg-[#4d4b49] text-white text-base font-semibold rounded-full py-2 px-6 transition-colors"
          >
            {isAuthenticated ? "Logout" : "Login"}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
