"use client"

import { Heart, Home, Search, Square, UserRound } from "lucide-react"
import Link from "next/link"

const Navbar = () => {
  const listLinks = [
    { name: "Home", path: "/", icon: <Home /> },
    { name: "User", path: "/user", icon: <UserRound />},
    { name: "Search", path: "/search", icon: <Search /> },
    { name: "Like", path: "/like", icon: <Heart /> },
    { name: "Write", path: "/write", icon: <Square /> },
  ]
  return (
    <header className="flex flex-row">
      {listLinks.map((link, index) => (
        <Link key={index} href={link.path}>
          {link.icon}
          {link.name}
          
        </Link>
      ))}
    </header>
  )
}

export default Navbar