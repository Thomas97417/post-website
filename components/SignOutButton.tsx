"use client"

import { Button } from "./ui/button"
import { signOut } from "next-auth/react"

const SignOutButton = () => {
  return (
    <Button onClick={() => signOut()}>Sign Out</Button>
  )
}

export default SignOutButton