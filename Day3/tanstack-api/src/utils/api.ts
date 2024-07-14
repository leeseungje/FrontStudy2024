export const fetcher = async (url: string) => {
  const response = await fetch(url)
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Network response was not ok')
  }
  return response.json()
}

export interface CreateUserParams {
  name: string
  email: string
}

export const createUserFn = async ({
  name,
  email,
}: CreateUserParams): Promise<User> => {
  const response = await fetch('/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to create user')
  }

  return response.json()
}

export interface User {
  id: string
  name: string
  email: string
}
