"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { RiMovie2Line } from "react-icons/ri";

const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  const pathname = usePathname();

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <RiMovie2Line />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => {
          if (link.href == pathname) {
            return (
              <Link
                key={link.href}
                className="text-zinc-800 hover:text-zinc-800 transition-colors"
                href={link.href}
              >
                {link.label}
              </Link>
            );
          } else
            return (
              <Link
                key={link.href}
                className="text-zinc-500 hover:text-zinc-800 transition-colors"
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
