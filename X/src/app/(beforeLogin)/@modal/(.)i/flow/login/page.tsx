"use client"

// 인터셉팅 라우팅
import { useState } from 'react'
import style from './modal.module.css'

export default function Page() {
  const [id, setId] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();
  const onSubmit = () => {
    
  }
  const onCLickClose = () => {
    
  }
  const onChangeId = () => {

  }
  const onChangePassword = () => {

  }
  return (
    <div className={style.modalBackground}>
      <div className={style.modal}>
        모달
        <div className={style.modalHeader}>
          <button className={style.closeButton} onClick={onCLickClose}>
            <svg viewBox="0 0 24 24" aria-hidden="true" className={style.buttonClose}><g><path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path></g></svg>
          </button>
        </div>
        <div className={style.modalBody}>
          
        </div>
        <div className={style.modalFooter}>          
        </div>
      </div> 
    </div>
  )
}
