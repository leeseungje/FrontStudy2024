"use client"

import { MouseEventHandler } from "react"

import { User } from "@/model/User"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import cx from "classnames"
import { produce } from "immer"
import { useSession } from "next-auth/react"

import FollowButton from "../buttons/FllowButton"
import style from "../styles/followRecommend.module.css"

type Props = {
  user: User
}

export default function FollowRecommend({ user }: Props) {
  const { data: session } = useSession()
  const followed = !!user.Followers?.find((v) => v.id === session?.user?.email)
  const queryClient = useQueryClient()
  const follow = useMutation({
    mutationFn: (userId: string) => {
      console.log("follow", userId)
      return fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`,
        {
          credentials: "include",
          method: "post",
        },
      )
    },
    onMutate: (userId: string) => {
      queryClient.setQueryData(
        ["users", "followRecommends"],
        (oldData?: User[]) =>
          produce(oldData, (draft) => {
            const index = draft?.findIndex((v) => v.id === userId)
            if (index !== undefined && index >= 0 && draft) {
              draft[index].Followers = [{ id: session?.user?.email as string }]
              draft[index]._count.Followers += 1
            }
          }),
      )

      queryClient.setQueryData(["users", userId], (oldData?: User) =>
        produce(oldData, (draft) => {
          if (draft) {
            draft.Followers = [{ id: session?.user?.email as string }]
            draft._count.Followers += 1
          }
        }),
      )
    },
    onError: (error, userId: string) => {
      queryClient.setQueryData(
        ["users", "followRecommends"],
        (oldData?: User[]) =>
          produce(oldData, (draft) => {
            const index = draft?.findIndex((v) => v.id === userId)
            if (index !== undefined && index >= 0 && draft) {
              draft[index].Followers = draft[index].Followers.filter(
                (v) => v.id !== session?.user?.email,
              )
              draft[index]._count.Followers -= 1
            }
          }),
      )

      queryClient.setQueryData(["users", userId], (oldData?: User) =>
        produce(oldData, (draft) => {
          if (draft) {
            draft.Followers = draft.Followers.filter(
              (v) => v.id !== session?.user?.email,
            )
            draft._count.Followers -= 1
          }
        }),
      )
    },
  })

  const unfollow = useMutation({
    mutationFn: (userId: string) => {
      console.log("unfollow", userId)
      return fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`,
        {
          credentials: "include",
          method: "delete",
        },
      )
    },
    onMutate: (userId: string) => {
      queryClient.setQueryData(
        ["users", "followRecommends"],
        (oldData?: User[]) =>
          produce(oldData, (draft) => {
            const index = draft?.findIndex((v) => v.id === userId)
            if (index !== undefined && index >= 0 && draft) {
              draft[index].Followers = draft[index].Followers.filter(
                (v) => v.id !== session?.user?.email,
              )
              draft[index]._count.Followers -= 1
            }
          }),
      )

      queryClient.setQueryData(["users", userId], (oldData?: User) =>
        produce(oldData, (draft) => {
          if (draft) {
            draft.Followers = draft.Followers.filter(
              (v) => v.id !== session?.user?.email,
            )
            draft._count.Followers -= 1
          }
        }),
      )
    },
    onError: (error, userId: string) => {
      queryClient.setQueryData(
        ["users", "followRecommends"],
        (oldData?: User[]) =>
          produce(oldData, (draft) => {
            const index = draft?.findIndex((v) => v.id === userId)
            if (index !== undefined && index >= 0 && draft) {
              draft[index].Followers = [{ id: session?.user?.email as string }]
              draft[index]._count.Followers += 1
            }
          }),
      )

      queryClient.setQueryData(["users", userId], (oldData?: User) =>
        produce(oldData, (draft) => {
          if (draft) {
            draft.Followers = [{ id: session?.user?.email as string }]
            draft._count.Followers += 1
          }
        }),
      )
    },
  })
  const onFollow: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    e.preventDefault()
    console.log("follow", followed, user.id)
    if (followed) {
      unfollow.mutate(user.id)
    } else {
      follow.mutate(user.id)
    }
  }

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
      <div
        className={cx(style.followButtonSection, followed && style.followed)}
      >
        <FollowButton followed={followed} handleFollow={onFollow} />
      </div>
    </div>
  )
}
