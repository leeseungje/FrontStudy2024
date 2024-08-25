"use client"

import style from "./styles/logoutButton.module.css"

export default function LogoutButton() {
  const me = {
    // 임시 정보
    id: "leeseungje",
    nickname: "승짱",
    image: "/1639046.png",
  }

  const onLogout = () => {}

  return (
    <button className={style.logOutButton} onClick={onLogout}>
      <div className={style.logOutUserImage}>
        <img src={me.image} alt={me.id} />
      </div>
      <div className={style.logOutUserName}>
        <div>{me.nickname}</div>
        <div>@{me.id}</div>
      </div>
    </button>
  )
}
