'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useUserContext } from '@/context'

const EditUserPage = () => {
  const pathname = usePathname()
  const id = pathname?.split('/')[2]
  const { data, isLoading, fetchUser, updateUser, updateUserError } = useUserContext()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (id) {
      fetchUser(id)
    }
  }, [id, fetchUser])

  useEffect(() => {
    if (data && !Array.isArray(data) && data.id === id) {
      setName(data.name)
      setEmail(data.email)
    }
  }, [data, id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (id) {
      updateUser(id, name, email)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="form-container">
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit" className="submit">
          Update User
        </button>
      </form>
      {updateUserError && <p style={{ color: 'red' }}>{updateUserError}</p>}
    </div>
  )
}

export default EditUserPage
