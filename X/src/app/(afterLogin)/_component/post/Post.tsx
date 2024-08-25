import { faker } from "@faker-js/faker"
import dayjs from "dayjs"
import "dayjs/locale/ko"
import relativeTime from "dayjs/plugin/relativeTime"
import Link from "next/link"

import ActionButtons from "../buttons/ActionButtons"
import PostArticle from "./PostArticle"
import PostImages from "./PostImages"
import style from "./styles/post.module.css"

dayjs.locale("ko")
dayjs.extend(relativeTime)

export type PostProps = {
  noImage?: boolean
}

export default function Post({ noImage }: PostProps) {
  const target = {
    postId: 1,
    User: {
      id: "leeseungje",
      nickname: "이승제",
      image: "/1639046.png",
    },
    content: "벌써 스터디 입니까????",
    createdAt: new Date(),
    Images: [] as { imageId: number; link: string }[],
  }
  if (Math.random() > 0.5 && !noImage) {
    target.Images.push(
      { imageId: 1, link: faker.image.urlLoremFlickr() },
      { imageId: 2, link: faker.image.urlLoremFlickr() },
      { imageId: 3, link: faker.image.urlLoremFlickr() },
      { imageId: 4, link: faker.image.urlLoremFlickr() },
    )
  }
  return (
    <PostArticle post={target}>
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
              {dayjs(target.createdAt).fromNow(true)}
            </span>
          </div>
          <div>{target.content}</div>
          <div>
            <PostImages post={target} />
          </div>
          <ActionButtons />
        </div>
      </div>
    </PostArticle>
  )
}
