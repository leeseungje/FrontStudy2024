import React from 'react'

export interface AfterLoginLayoutProps {
  children: React.ReactNode
}

const AfterLoginLayout: React.FC<AfterLoginLayoutProps> = ({ children }) => {
  return (
    <div>
      애프터 로그인 레이아웃
      {children}
    </div>
  )
}

export default AfterLoginLayout
