"use client"

import { MouseEventHandler } from "react"

import { useFollow } from "@/app/hooks"
import { User } from "@/model/User"
import cx from "classnames"
import { useSession } from "next-auth/react"
import Link from "next/link"

import FollowButton from "../buttons/FllowButton"
import style from "../styles/followRecommend.module.css"

type Props = {
  user: User
}

export default function FollowRecommend({ user }: Props) {
  const { data: session } = useSession()
  const followed = !!user.Followers?.find((v) => v.id === session?.user?.email)
  const { toggleFollow } = useFollow()
  const onFollow: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    e.preventDefault()
    console.log("follow", followed, user.id)
    toggleFollow(user.id, followed)
  }

  return (
    <Link href={`/${user.id}`} className={style.container}>
      <div className={style.userLogoSection}>
        <div className={style.userLogo}>
          <img src={user.image} alt={user.id} />
        </div>
      </div>
      <div className={style.userInfo}>
        <div className={style.title}>{user.nickname}</div>
        <div className={style.count}>@{user.id}</div>
      </div>
      <div
        className={cx(style.followButtonSection, followed && style.followed)}
      >
        <FollowButton followed={followed} handleFollow={onFollow} />
      </div>
    </Link>
  )
}
