import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { updateUserFn, UserParams, User } from '@/utils/api'

/**
 * useUpdateUser 훅
 *
 * @description
 * 이 훅은 사용자를 업데이트하는 로직을 관리. 성공적으로 사용자를 업데이트한 후 해당 사용자 상세 페이지로 이동
 *
 * @returns {{
 *   updateUser: (id: string, name: string, email: string) => void,
 *   error: string | null,
 * }} 업데이트 함수와 에러 상태를 반환
 */
export const useUpdateUser = () => {
  const queryClient = useQueryClient() // React Query의 Query Client를 사용하여 쿼리를 무효화
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  // useMutation 훅을 사용하여 사용자 업데이트 Mutation을 정의
  const mutation = useMutation<User, Error, UserParams>({
    mutationFn: updateUserFn, // 사용자 업데이트 함수
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['user', variables.id] }) // 'user' 쿼리를 무효화하여 데이터를 다시 가져오게 함
      alert('수정했습니다. 상세 페이지로 이동합니다.') // 성공 메시지 표시
      router.push(`/user/${variables.id}`)
    },
    onError: (error: Error) => {
      setError(error.message)
    },
  })

  // 사용자 업데이트 함수
  const updateUser = (id: string, name: string, email: string) => {
    setError(null)
    mutation.mutate({ id, name, email }) // Mutation 실행
  }

  return { updateUser, error } // 업데이트 함수와 에러 상태 반환
}
