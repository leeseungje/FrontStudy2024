import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { deleteUserFn } from '@/utils/api'

/**
 * useDeleteUser 훅
 *
 * @description
 * 이 훅은 사용자를 삭제하는 로직을 관리. 성공적으로 사용자를 삭제한 후 사용자 목록 페이지로 이동
 *
 * @param {string | undefined} id - 삭제할 사용자의 ID이며, undefined 일 수 있다.
 *
 * @returns {{
 *   deleteUser: () => void,
 *   deleting: boolean,
 * }} 삭제 함수와 삭제 상태를 반환
 */
export const useDeleteUser = (id: string | undefined) => {
  const queryClient = useQueryClient() // React Query의 Query Client를 사용하여 쿼리를 무효화
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  // useMutation 훅을 사용하여 사용자 삭제 Mutation을 정의
  const mutation = useMutation<void, Error, string>({
    mutationFn: deleteUserFn, // 사용자 삭제 함수
    onMutate: () => {
      setDeleting(true)
    },
    onSuccess: () => {
      // 작업이 성공적으로 완료되었을 때 실행되는 코드
      queryClient.invalidateQueries({ queryKey: ['users'] }) // 'users' 쿼리를 무효화하여 데이터를 다시 가져오게 함
      alert('삭제했습니다. 목록 페이지로 이동합니다.')
      router.push('/user')
    },
    onError: (error: Error) => {
      alert(error.message)
      setDeleting(false)
    },
  })

  // 사용자 삭제 함수
  const deleteUser = () => {
    if (!id) return
    mutation.mutate(id) // Mutation 실행
  }

  return { deleteUser, deleting } // 삭제 함수와 삭제 상태 반환
}
