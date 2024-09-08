import { auth } from "@/auth"
import { redirect } from "next/navigation"

import LoginHome from "./_component/LoginHome"

export default async function Home() {
  const session = await auth()
  if (session?.user) {
    redirect("/home")
    return null
  }
  return <LoginHome />
}
