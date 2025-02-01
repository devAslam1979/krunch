import Link from "next/link";
import React from "react";
import Image from "next/image";

const Footer = () => {
  const options = [
    { href: "#", icon: "icons/whatsapp.svg" },
    { href: "#", icon: "icons/instagram.svg" },
    { href: "#", icon: "icons/youtube.svg" },
  ];
  return (
    <div className="sticky z-10 bottom-0 border-t border-gray-300 flex justify-center gap-10 items-center py-2.5 bg-[#fefaed]">
      {options.map((option, index) => (
        <Link href={option.href} key={index}>
          <Image width={40} height={40} src={option.icon} alt="icon" />
        </Link>
      ))}
    </div>
  );
};

export default Footer;
