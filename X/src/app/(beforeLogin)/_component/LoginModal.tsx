"use client"

import { ChangeEventHandler, FormEventHandler, useState } from "react"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

import style from "./modal.module.css"

export default function LoginModal() {
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const router = useRouter()
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setMessage("")
    try {
      const response = await signIn("credentials", {
        username: id,
        password,
        redirect: false,
      })
      console.log("response", response)
      if (!response?.ok) {
        setMessage("아이디와 비밀번호가 일치하지 않습니다.")
      } else {
        router.replace("/home")
      }
    } catch (err) {
      console.error(err)
      setMessage("아이디와 비밀번호가 일치하지 않습니다.")
    }
  }
  const onClickClose = () => {
    router.back()
  }
  const onChangeId: ChangeEventHandler<HTMLInputElement> = (e) => {
    setId(e.target.value)
  }
  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value)
  }
  return (
    <div className={style.modalBackground}>
      <div className={style.modal}>
        <div className={style.modalHeader}>
          <button className={style.closeButton} onClick={onClickClose}>
            <svg
              width={24}
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"
            >
              <g>
                <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
              </g>
            </svg>
          </button>
          <h1 className={style.title}>로그인 하세요.</h1>
        </div>
        <form onSubmit={onSubmit}>
          <div className={style.modalBody}>
            <div className={style.inputDiv}>
              <label className={style.inputLabel} htmlFor="id">
                <span>아이디</span>
                <input
                  id="id"
                  className={style.input}
                  value={id}
                  onChange={onChangeId}
                  type="text"
                  placeholder=""
                />
              </label>
            </div>
            <div className={style.inputDiv}>
              <label className={style.inputLabel} htmlFor="password">
                <span>비밀번호</span>
                <input
                  id="password"
                  className={style.input}
                  value={password}
                  onChange={onChangePassword}
                  type="password"
                  placeholder=""
                />
              </label>
            </div>
          </div>
          <div className={style.message}>{message}</div>
          <div className={style.modalFooter}>
            <button className={style.actionButton} disabled={!id && !password}>
              로그인하기
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
