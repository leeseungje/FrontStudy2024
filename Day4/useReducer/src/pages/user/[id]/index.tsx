'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useUsers } from '@/hooks/useUser'
import { useDeleteUser } from '@/hooks/useDeleteUser'
import { User } from '@/utils/api'

const UserPage = () => {
  const pathname = usePathname()
  const id = pathname?.split('/')[2]
  const { data: user, isLoading } = useUsers(id)
  const { deleteUser, isLoading: deleting, isError } = useDeleteUser(id)

  if (isLoading || !user || Array.isArray(user)) {
    return <div>Loading...</div>
  }

  return (
    <div className="user-detail">
      <h1>User Detail</h1>
      <p>
        <strong>ID:</strong> {(user as User).id}
      </p>
      <p>
        <strong>Name:</strong> {(user as User).name}
      </p>
      <p>
        <strong>Email:</strong> {(user as User).email}
      </p>
      <div className="actions">
        <button
          onClick={deleteUser}
          disabled={deleting}
          className={'btn-delete'}
        >
          {deleting ? 'Deleting...' : 'Delete User'}
        </button>
        {isError && <p>Error deleting user. Please try again.</p>}
        <Link href="/user" className={'link'}>
          Back to User List
        </Link>
      </div>
    </div>
  )
}

export default UserPage
