"use client"

import React from "react"

import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"

import SearchForm from "./SearchForm"
import style from "./styles/rightSearchZone.module.css"

export default function RightSearchZone() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const onChangeFollow = () => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set("pf", "on")
    router.replace(`/search?${newSearchParams.toString()}`)
  }
  const onChangeAll = () => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.delete("pf")
    router.replace(`/search?${newSearchParams.toString()}`)
  }
  if (pathname === "/explore") {
    return null
  }
  if (pathname === "/search") {
    return (
      <div>
        <h5 className={style.filterTitle}>검색 필터</h5>
        <div className={style.filterSection}>
          <div>
            <label>사용자</label>
            <div className={style.radio}>
              <div>모든 사용자</div>
              <input
                type="radio"
                name="pf"
                defaultChecked
                onChange={onChangeAll}
                id="radio1"
              />
              <label htmlFor="radio1" />
            </div>
            <div className={style.radio}>
              <div>내가 팔로우하는 사람들</div>
              <input
                type="radio"
                name="pf"
                value="on"
                id="radio2"
                onChange={onChangeFollow}
              />
              <label htmlFor="radio2" />
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div style={{ marginBottom: 60, width: "inherit" }}>
      <SearchForm />
    </div>
  )
}
