import { Suspense } from "react"

import { auth } from "@/auth"
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query"

import PostForm from "./_component/PostForm"
import Tab from "./_component/Tab"
import TabDeciderSuspense from "./_component/TabDesiderSuspense"
import TabProvider from "./_component/TabProvider"
import { getPostRecommends } from "./_lib/getPostRecommends"
import style from "./home.module.css"
import Loading from "./loading"

export default async function Home() {
  const session = await auth() // 세션 정보 가져오기
  const queryClient = new QueryClient()

  // 추천 포스트 데이터를 미리 패칭
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    initialPageParam: 0,
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <TabProvider>
          <Tab />
          <PostForm me={session} />
          <Suspense fallback={<Loading />}>
            <TabDeciderSuspense />
          </Suspense>
        </TabProvider>
      </HydrationBoundary>
    </main>
  )
}
