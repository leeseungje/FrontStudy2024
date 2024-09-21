"use client"

import { Hashtag } from "@/model/Hashtag"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"

import { getTrends } from "../../_lib/getTrends"
import Trend from "./Trend"
import style from "./styles/trendSection.module.css"

export default function TrendSection() {
  const { data: session } = useSession()
  const { data } = useQuery<Hashtag[]>({
    queryKey: ["trends"],
    queryFn: getTrends,
    staleTime: 60000, // fresh -> stale, 5분이라는 기준
    gcTime: 300000,
    enabled: !!session?.user, // 로그인을 안했을경우 조건부 쿼리 처리
  })
  const pathname = usePathname()
  if (pathname === "/explore") return null
  if (session?.user) {
    return (
      <div className={style.trendBg}>
        <div className={style.trend}>
          <h3>나를 위한 트렌드</h3>
          {data?.map((trend) => <Trend trend={trend} key={trend.tagId} />)}
        </div>
      </div>
    )
  }
  return (
    <div className={style.trendBg}>
      <div className={style.noTrend}>트렌드를 가져올 수 없습니다.</div>
    </div>
  )
}
