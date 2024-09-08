"use client"

import { signOut, useSession } from "next-auth/react"
import { redirect } from "next/dist/server/api-utils"
import { useRouter } from "next/navigation"

import style from "./styles/logoutButton.module.css"

export default function LogoutButton() {
  const router = useRouter()
  const { data: me } = useSession()

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
