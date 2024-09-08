"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import style from "../../[username]/profile.module.css"

export default function FollowButton() {
  const { data } = useSession()
  const router = useRouter()
  const handleClick = () => {
    if (!data?.user) {
      router.replace("/login")
      return null
    }
  }
  console.log("data", data)
  return (
    <button className={style.followButton} onClick={handleClick}>
      팔로우
    </button>
  )
}
