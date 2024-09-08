import Post from "@after/_component/post/Post"

import BackButton from "../_component/buttons/BackButton"
import FollowButton from "../_component/buttons/FllowButton"
import style from "./profile.module.css"

export default function Profile() {
  const user = {
    id: "leeseungje",
    nickname: "승짱",
    image: "/1639046.png",
  }

  return (
    <main className={style.main}>
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
        <FollowButton />
      </div>
      <div>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </main>
  )
}
