"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { RiMovie2Line } from "react-icons/ri";
import classnames from "classnames";

const NavBar = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Movies", href: "/movies" },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <RiMovie2Line />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => {
          return (
            <Link
              key={link.href}
              className={classnames({
                "text-zinc-900": link.href === currentPath,
                "text-zinc-500": link.href != currentPath,
                "hover:text-zinc-800 transition-colors": true,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
