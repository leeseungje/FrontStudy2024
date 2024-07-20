'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useUsers } from '@/hooks'
import { useDeleteUser } from '@/hooks/useDeleteUser'

const UserPage = () => {
  const pathname = usePathname()
  const id = pathname?.split('/')[2]
  const { data: user, isLoading } = useUsers(id)
  const { deleteUser, deleting } = useDeleteUser(id)

  if (isLoading || !user || Array.isArray(user)) {
    return <div>Loading...</div>
  }

  return (
    <div className="user-detail">
      <h1>User Detail</h1>
      <p>
        <strong>ID:</strong> {user.id}
      </p>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
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
