"use client"

import { useEffect } from "react"

export const MSWComponent = () => {
  useEffect(() => {
    // window가 존재할때 예외처리 추가
    if (typeof window !== "undefined") {
      if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
        require("@/mocks/browser")
      }
    }
  }, [])

  return null
}
