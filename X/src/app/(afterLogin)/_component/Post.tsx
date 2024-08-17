import dayjs from "dayjs"
import "dayjs/locale/ko"
import relativeTime from "dayjs/plugin/relativeTime"
import Link from "next/link"

import ActionButtons from "./ActionButtons"
import style from "./post.module.css"

dayjs.locale("ko")
dayjs.extend(relativeTime)

export default function Post() {
  const target = {
    User: {
      id: "leeseungje",
      nickname: "이승제",
      image: "/1639046.png",
    },
    content: "벌써 스터디 입니까????",
    createdAt: dayjs("1999-01-01"),
    Images: [],
  }
  return (
    <article className={style.post}>
      <div className={style.postWrapper}>
        <div className={style.postUserSection}>
          <Link href={`/${target.User.id}`} className={style.postUserImage}>
            <img src={target.User.image} alt={target.User.nickname} />
            <div className={style.postShade} />
          </Link>
        </div>
        <div className={style.postBody}>
          <div className={style.postMeta}>
            <Link href={`/${target.User.id}`}>
              <span className={style.postUserName}>{target.User.nickname}</span>
              &nbsp;
              <span className={style.postUserId}>@{target.User.id}</span>
              &nbsp; · &nbsp;
            </Link>
            <span className={style.postDate}>
              {dayjs(target.createdAt).fromNow()}
            </span>
          </div>
          <div>{target.content}</div>
          <div className={style.postImageSection}></div>
          <ActionButtons />
        </div>
      </div>
    </article>
  )
}
