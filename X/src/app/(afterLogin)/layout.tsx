import React from "react"

import Image from "next/image"
import Link from "next/link"

import logo from "../../../public/logo_black.svg"
import FollowRecommend from "./_component/FollowRecommend"
import LogoutButton from "./_component/LogoutButton"
import NavMenu from "./_component/NavMenu"
import RightSearchZone from "./_component/RightSearchZone"
import TrendSection from "./_component/TrendSection"
import style from "./layout.module.css"

export interface AfterLoginLayoutProps {
  children: React.ReactNode
  modal: React.ReactNode
}

const AfterLoginLayout: React.FC<AfterLoginLayoutProps> = ({
  children,
  modal,
}) => {
  return (
    <div className={style.container}>
      <header className={style.leftSectionWrapper}>
        <section className={style.leftSection}>
          <div className={style.leftSectionFixed}>
            <Link className={style.logo} href="/home">
              <div className={style.logoPill}>
                <Image src={logo} alt="nc" width={30} height={16} />
              </div>
            </Link>
            <nav>
              <ul>
                <NavMenu />
              </ul>
              <Link href="/compose/tweet" className={style.postButton}>
                게시하기
              </Link>
            </nav>
            <LogoutButton />
          </div>
        </section>
      </header>
      <div className={style.rightSectionWrapper}>
        <div className={style.rightSectionInner}>
          <main className={style.main}>{children}</main>
          <section className={style.rightSection}>
            <RightSearchZone />
            <TrendSection />
            <div className={style.followRecommend}>
              <h3>팔로우 추천</h3>
              <FollowRecommend />
              <FollowRecommend />
              <FollowRecommend />
            </div>
          </section>
        </div>
      </div>
      {modal}
    </div>
  )
}

export default AfterLoginLayout
