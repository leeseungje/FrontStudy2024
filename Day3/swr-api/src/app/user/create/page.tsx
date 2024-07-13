'use client'

import { useCreateUser } from '@/hooks'
import { useState } from 'react'

const CreateUserPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const { createUser, error } = useCreateUser()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createUser(name, email)
  }

  return (
    <div className="form-container">
      <h1>Create User</h1>
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
          Create User
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default CreateUserPage
