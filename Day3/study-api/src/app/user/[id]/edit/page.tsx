'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface User {
  id: string
  name: string
  email: string
}

const EditUserPage = () => {
  const pathname = usePathname()
  const router = useRouter()
  const id = pathname?.split('/')[2]
  const [user, setUser] = useState<User | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      fetch(`/api/user?id=${id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            setError(data.message)
          } else {
            setUser(data)
            setName(data.name)
            setEmail(data.email)
          }
        })
        .catch(() => setError('Failed to fetch user'))
    }
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, name, email })
      })

      if (response.ok) {
        alert('수정했습니다. 상세 페이지로 이동합니다.')
        router.push(`/user/${id}`)
      } else {
        const data = await response.json()
        setError(data.message || 'Failed to update user')
      }
    } catch (error) {
      setError('Failed to update user')
    }
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="form-container">
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
        </div>
        <div className="form-group">
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
        </div>
        <button type="submit" className="submit">
          Update User
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default EditUserPage
