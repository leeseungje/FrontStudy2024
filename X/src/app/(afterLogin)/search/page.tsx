import SearchForm from "@after/_component/SearchForm"
import BackButton from "@after/_component/buttons/BackButton"

import SearchResult from "./_component/SearchResult"
import Tab from "./_component/Tab"
import style from "./search.module.css"

type Props = {
  searchParams: { q: string; f?: string; pf?: string }
}
export default function Search({ searchParams }: Props) {
  return (
    <main className={style.main}>
      <div className={style.searchTop}>
        <div className={style.searchZone}>
          <div className={style.buttonZone}>
            <BackButton />
          </div>
          <div className={style.formZone}>
            <SearchForm q={searchParams.q} />
          </div>
        </div>
        <Tab />
      </div>
      <div className={style.list}>
        <SearchResult searchParams={searchParams} />
      </div>
    </main>
  )
}
