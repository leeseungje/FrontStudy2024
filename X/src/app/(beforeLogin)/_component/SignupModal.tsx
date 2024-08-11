"use client";

import { ChangeEventHandler, useState } from "react";

import { useRouter } from "next/navigation";

import style from "./modal.module.css";

export default function SignupModal() {
  const [id, setId] = useState();
  const [password, setPassword] = useState();
  const [nickname, setNickname] = useState();
  const [image, setImage] = useState();
  const [imageFile, setImageFile] = useState<File>();
  const router = useRouter();
  const onSubmit = () => {};
  const onClickClose = () => {
    router.back();
    // TODO: 뒤로가기가 /home이 아니면 /home으로 보내기
  };
  const onChangeId: ChangeEventHandler<HTMLInputElement> = (e) => {};
  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {};
  const onChangeNickname: ChangeEventHandler<HTMLInputElement> = (e) => {};
  const onChangeImageFile: ChangeEventHandler<HTMLInputElement> = (e) => {};
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
          <h1 className={style.title}>계정 생성하세요.</h1>
        </div>
        <form>
          <div className={style.modalBody}>
            <div className={style.inputDiv}>
              <label className={style.inputLabel} htmlFor="id">
                <span>아이디</span>
                <input
                  id="id"
                  className={style.input}
                  type="text"
                  placeholder=""
                  value={id}
                  onChange={onChangeId}
                />
              </label>
            </div>
            <div className={style.inputDiv}>
              <label className={style.inputLabel} htmlFor="name">
                <span>닉네임</span>
                <input
                  id="name"
                  className={style.input}
                  type="text"
                  placeholder=""
                  value={nickname}
                  onChange={onChangeNickname}
                />
              </label>
            </div>
            <div className={style.inputDiv}>
              <label className={style.inputLabel} htmlFor="password">
                <span>비밀번호</span>
                <input
                  id="password"
                  className={style.input}
                  type="password"
                  placeholder=""
                  value={password}
                  onChange={onChangePassword}
                />
              </label>
            </div>
            <div className={style.inputDiv}>
              <label className={style.inputLabel} htmlFor="image">
                <span>프로필</span>
                <input
                  id="image"
                  className={style.input}
                  type="file"
                  accept="image/*"
                  onChange={onChangeImageFile}
                />
              </label>
            </div>
          </div>
          <div className={style.modalFooter}>
            <button className={style.actionButton} disabled>
              가입하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
