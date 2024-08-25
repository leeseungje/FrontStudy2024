import BackButton from "@after/_component/buttons/BackButton"
import Post from "@after/_component/post/Post"

import CommentForm from "./_component/CommentForm"
import style from "./singlePost.module.css"

export default function SinglePost() {
  return (
    <div className={style.main}>
      <div className={style.header}>
        <BackButton />
        <h3 className={style.headerTitle}>게시하기</h3>
      </div>
      <Post />
      <CommentForm />
      <div>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  )
}
