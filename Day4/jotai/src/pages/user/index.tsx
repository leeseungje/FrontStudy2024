'use client'

import Link from 'next/link'
import { useUsers } from '@/hooks'

const UsersPage = () => {
  const { data: users, isLoading, isError } = useUsers()

  if (isError) {
    return <div>Error: Failed to fetch users</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Users List</h1>
      <ul className="file-list">
        {Array.isArray(users) &&
          users.map((user) => (
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
