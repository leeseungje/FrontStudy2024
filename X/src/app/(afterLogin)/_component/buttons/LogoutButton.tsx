"use client"

import { Session } from "@auth/core/types"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

import style from "./styles/logoutButton.module.css"

interface Props {
  me: Session | null
}

export default function LogoutButton({ me }: Props) {
  const router = useRouter()

  const onLogout = () => {
    signOut({ redirect: false }).then(() => {
      router.replace("/")
    })
  }

  if (!me?.user) return null

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
