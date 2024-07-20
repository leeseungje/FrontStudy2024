import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { updateUserFn, UpdateUserParams, User } from '@/utils/api'

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const mutation = useMutation<User, Error, UpdateUserParams>({
    mutationFn: updateUserFn,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['user', variables.id] })
      alert('수정했습니다. 상세 페이지로 이동합니다.')
      router.push(`/user/${variables.id}`)
    },
    onError: (error: Error) => {
      setError(error.message)
    },
  })

  const updateUser = (id: string, name: string, email: string) => {
    setError(null)
    mutation.mutate({ id, name, email })
  }

  return { updateUser, error }
}
