'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useEffect } from 'react'
import { useUserContext } from '@/context'

const UserPage = () => {
  const pathname = usePathname()
  const id = pathname?.split('/')[2]
  const { data, isLoading, fetchUser, deleteUser, deleting, deleteUserError } = useUserContext()

  useEffect(() => {
    if (id) {
      fetchUser(id)
    }
  }, [])

  if (isLoading || !data || Array.isArray(data)) {
    return <div>Loading...</div>
  }

  const user = data

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
        <button onClick={() => deleteUser(user.id)} disabled={deleting} className={'btn-delete'}>
          Delete User
        </button>
        {deleteUserError && <p style={{ color: 'red' }}>{deleteUserError}</p>}
        <Link href="/user" className={'link'}>
          Back to User List
        </Link>
      </div>
    </div>
  )
}

export default UserPage
