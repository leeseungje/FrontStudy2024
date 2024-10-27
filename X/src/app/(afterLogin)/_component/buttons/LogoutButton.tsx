"use client"

import { Session } from "@auth/core/types"
import { useQueryClient } from "@tanstack/react-query"
import { signOut } from "next-auth/react"

import style from "./styles/logoutButton.module.css"

interface Props {
  me: Session | null
}

export default function LogoutButton({ me }: Props) {
  const queryClient = useQueryClient()

  const onLogout = () => {
    queryClient.invalidateQueries({
      queryKey: ["posts"],
    })
    queryClient.invalidateQueries({
      queryKey: ["users"],
    })
    signOut({ callbackUrl: "/" })
  }

  if (!me?.user) {
    return null
  }

  return (
    <button className={style.logOutButton} onClick={onLogout}>
      {me.user?.image && (
        <div className={style.logOutUserImage}>
          <img src={me.user?.image as string} alt={me.user?.email as string} />
        </div>
      )}
      <div className={style.logOutUserName}>
        <div>{me.user?.name}</div>
        <div>@{me.user?.email}</div>
      </div>
    </button>
  )
}
