"use client"

import { Heart, Home, NotebookPen, Search, UserRound } from "lucide-react"
import Link from "next/link"
import SignOutButton from "./SignOutButton"
import { usePathname } from "next/navigation"

const Navbar = () => {
  const listLinks = [
    { name: "Home", path: "/home", icon: Home },
    { name: "Search", path: "/search", icon: Search },
    { name: "Write", path: "/write", icon: NotebookPen} ,
    { name: "Like", path: "/like", icon: Heart },
    { name: "User", path: "/me", icon: UserRound },
  ]
  const pathname = usePathname()
  return (
    <>
      <div className="flex flex-row mt-12 gap-x-12 cursor-pointer">
        {listLinks.map((link, index) => {
          const Icon = link.icon
          return (
            <Link key={index} href={link.path}>
              <Icon className={pathname === link.path ? 'text-gray-300' : 'text-gray-600 hover:text-gray-300'} />
            </Link>
          )
        })}
      </div>

      <div className='mt-4 absolute top-0 right-4'>
        <SignOutButton />
      </div>
    </>
  )
}

export default Navbar