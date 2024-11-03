import React from "react"

import { auth } from "@/auth"
import Image from "next/image"
import Link from "next/link"

import logo from "../../../public/ci_ncids.png"
import FollowRecommendSection from "./_component/Follow/FollowRecommendSection"
import NavMenu from "./_component/NavMenu"
import RQProvider from "./_component/RQPrivider"
import RightSearchZone from "./_component/RightSearchZone"
import LogoutButton from "./_component/buttons/LogoutButton"
import TrendSection from "./_component/trend/TrendSection"
import style from "./layout.module.css"
import { CommentButton } from "./search/_component/CommentButton"

export interface AfterLoginLayoutProps {
  children: React.ReactNode
  modal: React.ReactNode
}

const AfterLoginLayout: React.FC<AfterLoginLayoutProps> = async ({
  children,
  modal,
}) => {
  const session = await auth()
  return (
    <div className={style.container}>
      <RQProvider>
        <header className={style.leftSectionWrapper}>
          <section className={style.leftSection}>
            <div className={style.leftSectionFixed}>
              <Link className={style.logo} href={session?.user ? "/home" : "/"}>
                <div className={style.logoPill}>
                  <Image src={logo} alt="nc" width={80} />
                </div>
              </Link>
              {session?.user && (
                <>
                  <nav>
                    <ul>
                      <NavMenu />
                    </ul>
                    <CommentButton />
                  </nav>
                  <LogoutButton me={session} />
                </>
              )}
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
                <FollowRecommendSection />
              </div>
            </section>
          </div>
        </div>
        {modal}
      </RQProvider>
    </div>
  )
}

export default AfterLoginLayout
