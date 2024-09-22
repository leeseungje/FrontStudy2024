"use client"

import { getComments } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getComments"
import { Post as IPost } from "@/model/Post"
import Post from "@after/_component/post/Post"
import { useQuery, useQueryClient } from "@tanstack/react-query"

type Props = {
  id: string
}
export default function Comments({ id }: Props) {
  const queryClient = useQueryClient()
  const post = queryClient.getQueryData(["posts", id])
  const { data, error } = useQuery<
    IPost[],
    Object,
    IPost[],
    [_1: string, _2: string, _3: string]
  >({
    queryKey: ["posts", id, "comments"],
    queryFn: getComments,
    staleTime: 60000, // fresh -> stale, 5분이라는 기준
    gcTime: 300000,
    enabled: !!post,
  })
  if (post) {
    return data?.map((post) => <Post post={post} key={post.postId} />)
  }
  return null
}
