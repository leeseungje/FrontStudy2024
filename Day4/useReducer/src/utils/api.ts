export const fetcher = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, { ...options, cache: 'no-store' })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Network response was not ok')
  }
  return response.json()
}

// 사용자를 생성및 업데이트때 필요한 매개변수의 타
export interface UserParams {
  id?: string
  name: string
  email: string
}

export interface User {
  id: string
  name: string
  email: string
}

export const createUserFn = async ({ name, email }: UserParams): Promise<User> => {
  const response = await fetch('/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email })
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to create user')
  }

  return response.json()
}

export const updateUserFn = async ({ id, name, email }: UserParams): Promise<User> => {
  const response = await fetch(`/api/user/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id, name, email })
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to update user')
  }

  return response.json()
}

export const deleteUserFn = async (id: string): Promise<void> => {
  const response = await fetch(`/api/user/?id=${id}`, {
    method: 'DELETE'
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to delete user')
  }
}
