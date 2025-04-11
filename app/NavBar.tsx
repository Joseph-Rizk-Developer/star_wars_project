"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavBar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Characters", path: "/people" },
    { name: "Pilots", path: "/pilots" },
  ];

  return (
    <div className="flex items-center bg-[#111] px-8 py-4 text-white font-sans gap-6">
      {navItems.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          className={`hover:text-yellow-300 transition duration-200 ${
            pathname.startsWith(item.path) ? "underline text-yellow-400" : ""
          }`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default NavBar;
