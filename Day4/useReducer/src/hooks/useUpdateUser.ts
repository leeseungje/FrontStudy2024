import { useCallback, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useApiReducer } from './useApiReducer'
import { updateUserFn, UserParams } from '@/utils/api'

/**
 * useUpdateUser 훅
 *
 * @description
 * 이 훅은 사용자를 업데이트하는 로직을 관리. 성공적으로 사용자를 업데이트한 후 해당 사용자 상세 페이지로 이동
 *
 * @returns {{
 *   updateUser: (id: string, name: string, email: string) => void,
 *   isLoading: boolean,
 *   isError: boolean,
 *   error: string | null,
 * }} 업데이트 함수와 상태 및 에러 상태를 반환
 */
export const useUpdateUser = () => {
  const queryClient = useQueryClient() // React Query의 Query Client를 사용하여 쿼리를 무효화
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  // API 호출 함수를 생성하여 useApiReducer에 전달합니다.
  const updateUserApiCall = useCallback(async (params: UserParams) => {
    try {
      await updateUserFn(params) // 실제 API 호출
    } catch (error) {
      throw new Error('Failed to update user')
    }
  }, [])

  // useApiReducer 훅을 사용하여 API 호출 상태 관리
  const { isLoading, isError, execute } = useApiReducer<void, UserParams>(
    updateUserApiCall,
  )

  // 사용자 업데이트 함수
  const updateUser = async (id: string, name: string, email: string) => {
    setError(null) // 에러 상태 초기화
    try {
      await execute({ id, name, email })
      queryClient.invalidateQueries({ queryKey: ['user', id] }) // 성공 시 쿼리 무효화
      alert('수정했습니다. 상세 페이지로 이동합니다.')
      router.push(`/user/${id}`) // 성공 시 페이지 이동
    } catch (err) {
      setError((err as Error).message) // 실패 시 에러 상태 설정
    }
  }

  return { updateUser, isLoading, isError, error } // 업데이트 함수와 상태 반환
}
