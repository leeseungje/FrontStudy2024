"use client"

import { useEffect, useState } from "react"

import style from "@/app/(afterLogin)/messages/message.module.css"
import { faker } from "@faker-js/faker"
import dayjs from "dayjs"
import "dayjs/locale/ko"
import relativeTime from "dayjs/plugin/relativeTime"
import { useRouter } from "next/navigation"

dayjs.locale("ko")
dayjs.extend(relativeTime)

export default function Room() {
  const router = useRouter()
  const [nickname, setNickname] = useState("")
  const [content, setContent] = useState("")

  useEffect(() => {
    setNickname(faker.internet.userName())
    setContent(faker.word.adjective())
  }, [])
  const user = {
    id: "hero",
    Messages: [
      { roomId: 123, createdAt: new Date() },
      { roomId: 123, createdAt: new Date() },
    ],
  }

  const onClick = () => {
    router.push(`/messages/${user.Messages.at(-1)?.roomId}`)
  }

  return (
    <div className={style.room} onClickCapture={onClick}>
      <div className={style.roomUserImage}>
        <img src={faker.image.avatar()} alt="" />
      </div>
      <div className={style.roomChatInfo}>
        <div className={style.roomUserInfo}>
          <b>{nickname || "Loading..."}</b>
          &nbsp;
          <span>@{user.id}</span>
          &nbsp; · &nbsp;
          <span className={style.postDate}>
            {dayjs(user.Messages?.at(-1)?.createdAt).fromNow(true)}
          </span>
        </div>
        <div className={style.roomLastChat}>{content}</div>
      </div>
    </div>
  )
}
