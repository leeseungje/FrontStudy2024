import { Post } from "@/model/Post"
import { User } from "@/model/User"
import BackButton from "@after/_component/buttons/BackButton"
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query"

import { getUserServer } from "../../_lib/getUserServer"
import CommentForm from "./_component/CommentForm"
import Comments from "./_component/Comments"
import SinglePost from "./_component/SinglePost"
import { getComments } from "./_lib/getComments"
import { getSinglePost } from "./_lib/getSinglePost"
import { getSinglePostServer } from "./_lib/getSinglePostServer"
import style from "./singlePost.module.css"

export async function generateMetadata({ params }: Props) {
  const user: User = await getUserServer({
    queryKey: ["users", params.username],
  })
  const post: Post = await getSinglePostServer({
    queryKey: ["posts", params.id],
  })
  return {
    title: `${user.nickname} 님 : ${post.content}`,
    description: post.content,
  }
}

type Props = {
  params: { id: string; username: string }
}

export default async function Page({ params }: Props) {
  const { id } = params
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["posts", id],
    queryFn: getSinglePost,
  })
  await queryClient.prefetchQuery({
    queryKey: ["posts", id, "comments"],
    queryFn: getComments,
  })
  const dehydratedState = dehydrate(queryClient)
  return (
    <div className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <div className={style.header}>
          <BackButton />
          <h3 className={style.headerTitle}>게시하기</h3>
        </div>
        <SinglePost id={id} />
        <CommentForm id={id} />
        <div>
          <Comments id={id} />
        </div>
      </HydrationBoundary>
    </div>
  )
}
