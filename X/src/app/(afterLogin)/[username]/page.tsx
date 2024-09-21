import Post from "@after/_component/post/Post"
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query"

import BackButton from "../_component/buttons/BackButton"
import FollowButton from "../_component/buttons/FllowButton"
import UserInfo from "./_component/UserInfo"
import UserPosts from "./_component/UserPosts"
import { getUser } from "./_lib/getUser"
import { getUserPosts } from "./_lib/getUserPosts"
import style from "./profile.module.css"

type Props = {
  params: { username: string }
}

export default async function Profile({ params }: Props) {
  const { username } = params
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["users", username],
    queryFn: getUser,
  })
  await queryClient.prefetchQuery({
    queryKey: ["posts", "users", username],
    queryFn: getUserPosts,
  })
  const dehydratedState = dehydrate(queryClient)

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <UserInfo username={username} />
        <div>
          <UserPosts username={username} />
        </div>
      </HydrationBoundary>
    </main>
  )
}
