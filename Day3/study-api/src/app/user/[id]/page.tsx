'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

interface User {
  id: string
  name: string
  email: string
}

const UserPage = () => {
  const pathname = usePathname()
  const router = useRouter()
  const id = pathname?.split('/')[2]
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (id) {
      fetch(`/api/user/${id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            setError(data.message)
          } else {
            setUser(data)
          }
        })
        .catch((error) => setError('Failed to fetch user'))
    }
  }, [id])

  const handleDelete = async () => {
    setDeleting(true)
    try {
      const response = await fetch(`/api/user?id=${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        alert('삭제했습니다. 목록 페이지로 이동합니다.')
        router.push(`/user`)
      } else {
        const data = await response.json()
        setError(data.message || 'Failed to delete user')
        setDeleting(false)
      }
    } catch (error) {
      setError('Failed to delete user')
      setDeleting(false)
    }
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!user) {
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
        <button onClick={handleDelete} disabled={deleting} className={'btn-delete'}>
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
