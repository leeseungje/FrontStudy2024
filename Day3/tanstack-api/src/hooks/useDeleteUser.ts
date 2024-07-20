import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { deleteUserFn } from '@/utils/api'

export const useDeleteUser = (id: string | undefined) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  const mutation = useMutation<void, Error, string>({
    mutationFn: deleteUserFn,
    onMutate: () => {
      setDeleting(true)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      alert('삭제했습니다. 목록 페이지로 이동합니다.')
      router.push('/user')
    },
    onError: (error: Error) => {
      alert(error.message)
      setDeleting(false)
    },
  })

  const deleteUser = () => {
    if (!id) return
    mutation.mutate(id)
  }

  return { deleteUser, deleting }
}
