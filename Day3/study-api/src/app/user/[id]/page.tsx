'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import useSWR, { mutate } from 'swr'

interface User {
  id: string
  name: string
  email: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const UserPage = () => {
  const pathname = usePathname()
  const router = useRouter()
  const id = pathname?.split('/')[2]
  const { data, error } = useSWR<User>(id ? `/api/user/${id}` : null, fetcher)
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    setDeleting(true)
    try {
      const response = await fetch(`/api/user?id=${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        alert('삭제했습니다. 목록 페이지로 이동합니다.')
        router.push(`/user`)
        mutate(`/api/user/${id}`, null, false) // Remove the user from the cache
      } else {
        const data = await response.json()
        alert(data.message || 'Failed to delete user')
        setDeleting(false)
      }
    } catch (error) {
      alert('Failed to delete user')
      setDeleting(false)
    }
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <div className="user-detail">
      <h1>User Detail</h1>
      <p>
        <strong>ID:</strong> {data.id}
      </p>
      <p>
        <strong>Name:</strong> {data.name}
      </p>
      <p>
        <strong>Email:</strong> {data.email}
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
