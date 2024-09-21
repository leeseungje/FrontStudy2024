"use client"

import { Hashtag } from "@/model/Hashtag"
import Trend from "@after/_component/trend/Trend"
import { useQuery } from "@tanstack/react-query"

import { getTrends } from "../../_lib/getTrends"

export default function TrendSection() {
  const { data } = useQuery<Hashtag[]>({
    queryKey: ["trends"],
    queryFn: getTrends,
    staleTime: 60000, // fresh -> stale, 5분이라는 기준
    gcTime: 300000,
  })
  return data?.map((trend) => <Trend trend={trend} key={trend.tagId} />)
}
