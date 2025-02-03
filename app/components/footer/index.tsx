import Link from "next/link";
import React from "react";
import Image from "next/image";
import { div } from "framer-motion/client";

const Footer = () => {
  const options = [
    { href: "#", icon: "icons/whatsapp.svg" },
    { href: "#", icon: "icons/instagram.svg" },
    { href: "#", icon: "icons/youtube.svg" },
  ];
  return (
    <div className="flex justify-center gap-10 items-center py-2.5">
      {options.map((option, index) => (
        <Link href={option.href} key={index}>
          <Image width={40} height={40} src={option.icon} alt="icon" />
        </Link>
      ))}
    </div>
  );
};

export default Footer;
