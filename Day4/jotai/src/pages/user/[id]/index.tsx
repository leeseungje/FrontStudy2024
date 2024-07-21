'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useUsers } from '@/hooks'
import { useDeleteUser } from '@/hooks/useDeleteUser'
import { useEffect } from 'react'
import { User } from '@/types'

const UserPage = () => {
  const pathname = usePathname()
  const id = pathname?.split('/')[2]
  const { data: user, isLoading } = useUsers(id)
  const { deleteUser, deleting } = useDeleteUser(id)

  useEffect(() => {
    if (user && !Array.isArray(user)) {
      console.log('User data:', user)
    }
  }, [user])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user || Array.isArray(user)) {
    return <div>User not found</div>
  }

  const UserData = user as User

  return (
    <div className="user-detail">
      <h1>User Detail</h1>
      <p>
        <strong>ID:</strong> {UserData.id}
      </p>
      <p>
        <strong>Name:</strong> {UserData.name}
      </p>
      <p>
        <strong>Email:</strong> {UserData.email}
      </p>
      <div className="actions">
        <button
          onClick={deleteUser}
          disabled={deleting}
          className={'btn-delete'}
        >
          Delete User
        </button>
        <Link href="/user" className={'link'}>
          Back to User List
        </Link>
      </div>
    </div>
  )
}

export default UserPage
