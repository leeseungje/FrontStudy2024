import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { createUserFn, User, UserParams } from '@/utils/api'

/**
 * useCreateUser 훅
 *
 * @description
 * 이 훅은 새로운 사용자를 생성하는 로직을 관리
 * 성공적으로 사용자를 생성한 후 사용자 목록 페이지로 이동
 *
 * @returns {{
 *   createUser: (name: string, email: string) => void,
 *   error: string | null,
 * }} 생성 함수와 에러 상태를 반환
 */
export const useCreateUser = () => {
  const queryClient = useQueryClient() // React Query의 Query Client를 사용하여 쿼리를 무효화
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  // useMutation 훅을 사용하여 사용자 생성 Mutation을 정의
  const mutation = useMutation<User, Error, UserParams>({
    mutationFn: createUserFn, // 사용자 생성 함수
    onSuccess: () => {
      // 성공적으로 사용자 생성 시 쿼리를 무효화하여 사용자 목록을 최신 상태로 유지
      queryClient.invalidateQueries({ queryKey: ['users'] })
      alert('생성했습니다. Users List 페이지로 이동합니다.')
      router.push('/user')
    },
    onError: (error: Error) => {
      setError(error.message)
    },
  })

  // 사용자 생성 함수
  const createUser = (name: string, email: string) => {
    setError(null) // 에러 상태 초기화
    mutation.mutate({ name, email }) // Mutation 실행
  }

  return { createUser, error } // 생성 함수와 에러 상태 반환
}
