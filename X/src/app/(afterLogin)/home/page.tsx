"use client"

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query"

import PostForm from "./_component/PostForm"
import Tab from "./_component/Tab"
import TabDecider from "./_component/TabDecider"
import TabProvider from "./_component/TabProvider"
import { getPostRecommend } from "./_lib/getPostRecommends"
import style from "./home.module.css"

export default function Home() {
  const queryClient = new QueryClient() // 클라이언트에서 데이터 처리
  // queryKey posts, recommends 가지고 있는 키값은 getPostRecommend 함수를 실행한다.
  queryClient.prefetchQuery({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommend,
  })
  const dehydratedState = dehydrate(queryClient)

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <TabProvider>
          <Tab />
          <PostForm />
          <TabDecider />
        </TabProvider>
      </HydrationBoundary>
    </main>
  )
}
