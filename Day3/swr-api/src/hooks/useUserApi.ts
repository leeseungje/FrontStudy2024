import { useState } from 'react'
import useSWR, { mutate } from 'swr'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  name: string
  email: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const useUsers = (id?: string) => {
  const { data, error } = useSWR<User | User[]>(
    id ? `/api/user/${id}` : '/api/user',
    fetcher,
  )

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}

export const useCreateUser = () => {
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const createUser = async (name: string, email: string) => {
    setError(null)
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      })

      if (response.ok) {
        alert('생성했습니다. Users List 페이지로 이동합니다.')
        router.push('/user')
      } else {
        const data = await response.json()
        setError(data.message || 'Failed to create user')
      }
    } catch (error) {
      setError('Failed to create user')
    }
  }

  return { createUser, error }
}

export const useDeleteUser = (id: string | undefined) => {
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()

  const deleteUser = async () => {
    if (!id) return
    setDeleting(true)
    try {
      const response = await fetch(`/api/user?id=${id}`, {
        method: 'DELETE',
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

  return { deleteUser, deleting }
}

export const useUpdateUser = () => {
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const updateUser = async (id: string, name: string, email: string) => {
    setError(null)
    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, name, email }),
      })

      if (response.ok) {
        alert('수정했습니다. 상세 페이지로 이동합니다.')
        mutate(`/api/user?id=${id}`)
        router.push(`/user/${id}`)
      } else {
        const data = await response.json()
        setError(data.message || 'Failed to update user')
      }
    } catch (error) {
      setError('Failed to update user')
    }
  }

  return { updateUser, error }
}
