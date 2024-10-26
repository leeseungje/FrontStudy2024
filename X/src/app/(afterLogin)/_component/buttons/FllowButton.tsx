"use client"

import { MouseEventHandler } from "react"

interface Props {
  followed: boolean
  handleFollow: MouseEventHandler<HTMLButtonElement>
}

export default function FollowButton({ followed, handleFollow }: Props) {
  return (
    <button onClick={handleFollow}>{followed ? "팔로잉" : "팔로우"}</button>
  )
}
