"use client"

import { Fragment, useEffect } from "react"
import { useInView } from "react-intersection-observer"

import { Post as IPost } from "@/model/Post"
import Post from "@after/_component/post/Post"
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query"

import { getFollowingPosts } from "../_lib/getFollowingPosts"
import { default as ErrorComponent } from "../error"
import Loading from "../loading"

export default function FollowingPosts() {
  // useQuery를 사용하여 데이터를 비동기로 가져옵니다
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isPending,
    isLoading, // isPending && isFetching
    isError,
  } = useInfiniteQuery<
    IPost[],
    Object,
    InfiniteData<IPost[]>,
    [_1: string, _2: string],
    number
  >({
    queryKey: ["posts", "followings"],
    queryFn: getFollowingPosts, // 비동기 함수로 데이터를 가져오는 함수
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
    staleTime: 60000, // fresh > stale time Infinity 일경우 항상 fresh
    gcTime: 300000,
  })
  // 데이터가 있을 경우 map으로 렌더링
  // Intersection Observer 모듈
  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  })

  const handleReset = () => {}

  /**
   * @param {boolean} hasNextPage - 다음페이지 유무
   * @param {function} fetchNextPage - 다음페이지 api 호출
   * @param {boolean} isFetching - react가 데이터를 가져오는 순간
   */
  useEffect(() => {
    const totalPosts =
      data?.pages.reduce((acc, page) => acc + page.length, 0) || 0

    // 게시글이 10개 이상일 때만 다음 페이지를 가져오도록 조건 추가
    if (inView && totalPosts >= 10) {
      !isFetching && hasNextPage && fetchNextPage()
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage, data])

  if (isPending) {
    return <Loading />
  }

  if (isError) {
    const errorObj = new Error("An unexpected error occurred")
    return <ErrorComponent error={errorObj} reset={handleReset} />
  }

  return (
    <>
      {data?.pages.map((page, i: number) => (
        <Fragment key={i}>
          {page.map((post) => (
            <Post key={post.postId} post={post} />
          ))}
        </Fragment>
      ))}
      <div ref={ref} style={{ height: 50 }} />
    </>
  )
}
