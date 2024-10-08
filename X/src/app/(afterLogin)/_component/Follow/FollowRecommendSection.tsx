"use client"

import { User } from "@/model/User"
import { useQuery } from "@tanstack/react-query"

import { getFollowRecommends } from "../../_lib/getFollowRecommends"
import FollowRecommend from "./FollowRecommend"

export default function FollowRecommendSection() {
  const { data } = useQuery<User[]>({
    queryKey: ["users", "followRecommends"],
    queryFn: getFollowRecommends,
    staleTime: 60000, // fresh -> stale, 5분이라는 기준
    gcTime: 300000,
  })
  return data?.map((user) => <FollowRecommend user={user} key={user.id} />)
}
