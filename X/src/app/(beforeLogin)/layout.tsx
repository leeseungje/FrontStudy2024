import React from 'react'
import styles from '@/app/page.module.css'

export interface LayoutProps {
    children: React.ReactNode
    modal: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({children, modal}) => {
    return (
        <div className={styles.container}>
            {children}
            {modal}
        </div>
    )
}

// 주소가 .com 일때는 chilren -> page.tsx, modal -> @modal/default.tsx
// /i/flow/login 일때는 children -> i/flow/login/page.tsx, modal -> @modal/i/flow/login/page.tsx
export default Layout