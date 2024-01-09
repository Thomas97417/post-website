"use client"

import { Button } from "./ui/button"
import { signIn } from "next-auth/react"

const SignInButton = () => {
  return (
    <Button onClick={() => signIn('github', { callbackUrl: 'http://localhost:3000/me'})}>Sign In</Button>
  )
}

export default SignInButton