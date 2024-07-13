'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useUsers, useUpdateUser } from '@/hooks'

const EditUserPage = () => {
  const pathname = usePathname()
  const id = pathname?.split('/')[2]
  const { data: user, isLoading, isError } = useUsers(id)
  const { updateUser, error: updateError } = useUpdateUser()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (user && !Array.isArray(user)) {
      setName(user.name)
      setEmail(user.email)
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (id) {
      updateUser(id, name, email)
    }
  }

  if (isError) {
    return <div>Error: {isError.message}</div>
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
      {updateError && <p style={{ color: 'red' }}>{updateError}</p>}
    </div>
  )
}

export default EditUserPage
