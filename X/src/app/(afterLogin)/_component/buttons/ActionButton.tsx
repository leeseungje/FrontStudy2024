"use client"

import { MouseEventHandler } from "react"

import cx from "classnames"

import style from "../post/styles/post.module.css"

export type ButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>
  count: number | string
  iconPath: string
  buttonStyle: string
  activeStyle: string
  isActive?: boolean
  white?: boolean
}

export default function ActionButton({
  onClick,
  count,
  iconPath,
  buttonStyle,
  activeStyle,
  isActive,
  white,
}: ButtonProps) {
  return (
    <div
      className={cx(
        buttonStyle,
        { [activeStyle]: isActive },
        white && style.white,
      )}
    >
      <button onClick={onClick}>
        <svg width={24} viewBox="0 0 24 24" aria-hidden="true">
          <g>
            <path d={iconPath}></path>
          </g>
        </svg>
      </button>
      <div className={style.count}>{count || ""}</div>
    </div>
  )
}
