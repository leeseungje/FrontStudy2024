import BackButton from "@after/_component/buttons/BackButton"
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query"

import CommentForm from "./_component/CommentForm"
import Comments from "./_component/Comments"
import SinglePost from "./_component/SinglePost"
import { getComments } from "./_lib/getComments"
import { getSinglePost } from "./_lib/getSinglePost"
import style from "./singlePost.module.css"

type Props = {
  params: { id: string }
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
