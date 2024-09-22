import Comments from "@/app/(afterLogin)/[username]/status/[id]/_component/Comments"
import SinglePost from "@/app/(afterLogin)/[username]/status/[id]/_component/SinglePost"
import { getComments } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getComments"
import { getSinglePost } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost"
import CommentForm from "@after/[username]/status/[id]/_component/CommentForm"
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query"

import ImageZone from "./_component/ImageZone"
import PhotoModalCloseButton from "./_component/PhotoModalCloseButton"
import style from "./photoModal.module.css"

type Props = {
  params: { id: string }
}

export default async function Page({ params }: Props) {
  if (!params || !params.id) {
    return <div>Error: Invalid or missing ID</div>
  }
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
    <div className={style.container}>
      <HydrationBoundary>
        <PhotoModalCloseButton />
        <ImageZone id={id} />
        <div className={style.commentZone}>
          <SinglePost id={id} noImage />
          <CommentForm id={id} />
          <Comments id={id} />
        </div>
      </HydrationBoundary>
    </div>
  )
}
