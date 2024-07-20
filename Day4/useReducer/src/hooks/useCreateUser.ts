import { useCallback, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useApiReducer } from './useApiReducer'
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
 *   isLoading: boolean,
 * }} 생성 함수, 에러 상태, 로딩 상태를 반환
 */
export const useCreateUser = () => {
  const queryClient = useQueryClient() // React Query의 Query Client를 사용하여 쿼리를 무효화
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  // API 호출 함수를 생성하여 useApiReducer에 전달
  const createUserApiCall = useCallback(async () => {
    // 실제 API 호출 로직은 이 안에 위치
    return { success: true }
  }, [])

  // useApiReducer 훅을 사용하여 API 호출 상태 관리
  const { isLoading, isError } = useApiReducer(createUserApiCall)

  // 사용자 생성 함수
  const createUser = async (name: string, email: string) => {
    setError(null) // 에러 상태 초기화
    try {
      await createUserFn({ name, email }) // 실제 API 호출
      queryClient.invalidateQueries({ queryKey: ['users'] }) // 성공 시 쿼리 무효화
      alert('생성했습니다. Users List 페이지로 이동합니다.')
      router.push('/user') // 성공 시 페이지 이동
    } catch (err) {
      setError((err as Error).message) // 실패 시 에러 상태 설정
    }
  }

  return { createUser, error, isLoading, isError } // 생성 함수, 에러 상태, 로딩 상태 반환
}
