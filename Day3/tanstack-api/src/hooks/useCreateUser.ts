import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { createUserFn, User, CreateUserParams } from '@/utils/api'

export const useCreateUser = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const mutation = useMutation<User, Error, CreateUserParams>({
    mutationFn: createUserFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      alert('생성했습니다. Users List 페이지로 이동합니다.')
      router.push('/user')
    },
    onError: (error: Error) => {
      setError(error.message)
    },
  })

  const createUser = (name: string, email: string) => {
    setError(null)
    mutation.mutate({ name, email })
  }

  return { createUser, error }
}
