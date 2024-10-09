"use client"

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
import { getPostRecommend } from "./_lib/getPostRecommends"
import style from "./home.module.css"
import Loading from "./loading"

export default async function Home() {
  const session = await auth()
  const queryClient = new QueryClient() // 클라이언트에서 데이터 처리
  queryClient.prefetchInfiniteQuery({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommend,
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
