import { ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div>
      <ul className="list-tab">
        <li>
          <Link href="/">Root</Link>
        </li>
        <li>
          <Link href="/user">Users List</Link>
        </li>
        <li>
          <Link href="/user/create">Create User</Link>
        </li>
      </ul>
      {children}
    </div>
  )
}

export default Layout
