"use client"

import { User } from "@/model/User"

import FollowButton from "../buttons/FllowButton"
import style from "../styles/followRecommend.module.css"

type Props = {
  user: User
}

export default function FollowRecommend({ user }: Props) {
  const onFollow = () => {}

  return (
    <div className={style.container}>
      <div className={style.userLogoSection}>
        <div className={style.userLogo}>
          <img src={user.image} alt={user.id} />
        </div>
      </div>
      <div className={style.userInfo}>
        <div className={style.title}>{user.nickname}</div>
        <div className={style.count}>@{user.id}</div>
      </div>
      <div className={style.followButtonSection}>
        <FollowButton />
      </div>
    </div>
  )
}