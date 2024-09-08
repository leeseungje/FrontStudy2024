import Image from "next/image"
import Link from "next/link"

import logo from "../../../../public/nc-logo-blue.png"
import styles from "./login.module.css"

export default function LoginHome() {
  return (
    <>
      <div className={styles.left}>
        <Image src={logo} alt="로고" />
      </div>
      <div className={styles.right}>
        <h1>Push Play</h1>
        <h2>지금 가입하세요.</h2>
        <Link href="/i/flow/signup" className={styles.signup}>
          계정 만들기
        </Link>
        <h3>이미 트위터에 가입하셨나요?</h3>
        <Link href="/login" className={styles.login}>
          로그인
        </Link>
      </div>
    </>
  )
}
