import { auth } from "@/auth"
import { User } from "@/model/User"
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query"
import { Metadata } from "next"

import UserInfo from "./_component/UserInfo"
import UserPosts from "./_component/UserPosts"
import { getUserPosts } from "./_lib/getUserPosts"
import { getUserServer } from "./_lib/getUserServer"
import style from "./profile.module.css"

type Props = {
  params: { username: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user: User = await getUserServer({
    queryKey: ["users", params.username],
  })
  return {
    title: `${user.nickname} (${user.id})`,
    description: `${user.nickname} (${user.id}) - 프로필`,
  }
}

export default async function Profile({ params }: Props) {
  const { username } = params
  const session = await auth()
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["users", username],
    queryFn: getUserServer,
  })
  await queryClient.prefetchQuery({
    queryKey: ["posts", "users", username],
    queryFn: getUserPosts,
  })
  const dehydratedState = dehydrate(queryClient)

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <UserInfo username={username} session={session} />
        <div>
          <UserPosts username={username} />
        </div>
      </HydrationBoundary>
    </main>
  )
}
