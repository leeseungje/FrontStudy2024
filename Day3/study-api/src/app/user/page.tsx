'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface User {
  id: string
  name: string
  email: string
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/user')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data)
      })
      .catch((error) => setError('Failed to fetch users'))
  }, [])

  if (error) {
    return <div>Error: {error}</div>
  }

  if (users.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Users List</h1>
      <ul className="file-list">
        {users.map((user) => (
          <li key={user.id}>
            <span className="user-name">{user.name}</span>
            <Link href={`/user/${user.id}`}>상세</Link>
            <Link href={`/user/${user.id}/edit`}>수정</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UsersPage
