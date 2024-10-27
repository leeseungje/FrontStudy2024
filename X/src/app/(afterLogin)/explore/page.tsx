import SearchForm from "@after/_component/SearchForm"
import { Metadata } from "next"

import TrendSection from "./_component/TrendSection"
import style from "./explore.module.css"

export const metadata: Metadata = {
  title: "탐색하기",
  description: "탐색해보세요.",
}

export default function Explore() {
  return (
    <main className={style.main}>
      <div className={style.formZone}>
        <SearchForm />
      </div>
      <div className={style.trend}>
        <h3>나를 위한 트렌드</h3>
        <TrendSection />
      </div>
    </main>
  )
}
