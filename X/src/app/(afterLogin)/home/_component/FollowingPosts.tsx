"use client"

import { Post as IPost } from "@/model/Post"
import Post from "@after/_component/post/Post"
import { useQuery } from "@tanstack/react-query"

import { getFollowingPosts } from "../_lib/getFollowingPosts"

export default function FollowingPosts() {
  // useQuery를 사용하여 데이터를 비동기로 가져옵니다
  const { data, isLoading } = useQuery<IPost[]>({
    queryKey: ["posts", "followings"],
    queryFn: getFollowingPosts, // 비동기 함수로 데이터를 가져오는 함수
    staleTime: 60000, // fresh > stale time Infinity 일경우 항상 fresh
    gcTime: 300000,
  })
  // 데이터가 있을 경우 map으로 렌더링
  return (
    <>
      {data?.map((post) => {
        return <Post key={post.postId} post={post} />
      })}
    </>
  )
}
