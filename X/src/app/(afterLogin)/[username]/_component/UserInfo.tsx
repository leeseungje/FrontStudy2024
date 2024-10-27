"use client"

import { MouseEventHandler } from "react"

import { useFollow } from "@/app/hooks"
import { User } from "@/model/User"
import BackButton from "@after/_component/buttons/BackButton"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import cx from "classnames"
import { produce } from "immer"
import { useSession } from "next-auth/react"

import { getUser } from "../_lib/getUser"
import style from "../profile.module.css"

type Props = {
  username: string
}
export default function UserInfo({ username }: Props) {
  const { data: session } = useSession()
  const { data: user, error } = useQuery<
    User,
    Object,
    User,
    [_1: string, _2: string]
  >({
    queryKey: ["users", username],
    queryFn: getUser,
    staleTime: 60000, // fresh -> stale, 5분이라는 기준
    gcTime: 300000,
  })
  if (error) {
    return (
      <>
        <div className={style.header}>
          <BackButton />
          <h3 className={style.headerTitle}>프로필</h3>
        </div>
        <div className={style.userZone}>
          <div className={style.userImage}></div>
          <div className={style.userName}>
            <div>@{username}</div>
          </div>
        </div>
        <div
          style={{
            height: 100,
            alignItems: "center",
            fontSize: 31,
            fontWeight: "bold",
            justifyContent: "center",
            display: "flex",
          }}
        >
          계정이 존재하지 않음
        </div>
      </>
    )
  }
  if (!user) {
    return null
  }
  const followed = !!user.Followers?.find((v) => v.id === session?.user?.email)
  const { toggleFollow } = useFollow()

  const onFollow: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    e.preventDefault()
    console.log("follow", followed, user.id)
    toggleFollow(user.id, followed)
  }
  return (
    <>
      <div className={style.header}>
        <BackButton />
        <h3 className={style.headerTitle}>{user.nickname}</h3>
      </div>
      <div className={style.userZone}>
        <div className={style.userImage}>
          <img src={user.image} alt={user.id} />
        </div>
        <div className={style.userName}>
          <div>{user.nickname}</div>
          <div>@{user.id}</div>
        </div>
        {user.id !== session?.user?.email && (
          <button
            onClick={onFollow}
            className={cx(style.followButton, followed && style.followed)}
          >
            {followed ? "팔로잉" : "팔로우"}
          </button>
        )}
      </div>
    </>
  )
}
