import { useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useApiReducer } from './useApiReducer'
import { deleteUserFn } from '@/utils/api'

/**
 * useDeleteUser 훅
 *
 * @description
 * 이 훅은 사용자를 삭제하는 로직을 관리합니다. 성공적으로 사용자를 삭제한 후 사용자 목록 페이지로 이동합니다.
 *
 * @param {string | undefined} id - 삭제할 사용자의 ID이며, undefined 일 수 있다.
 *
 * @returns {{
 *   deleteUser: () => void,
 *   isLoading: boolean,
 *   isError: boolean,
 * }} 삭제 함수와 삭제 상태를 반환
 */
export const useDeleteUser = (id: string | undefined) => {
  const queryClient = useQueryClient() // React Query의 Query Client를 사용하여 쿼리를 무효화
  const router = useRouter()

  // API 호출 함수를 생성하여 useApiReducer에 전달합니다.
  const deleteUserApiCall = useCallback(async () => {
    if (id) {
      try {
        await deleteUserFn(id) // 실제 API 호출
      } catch (error) {
        throw new Error('Failed to delete user')
      }
    } else {
      throw new Error('User ID is undefined')
    }
  }, [id])

  // useApiReducer 훅을 사용하여 API 호출 상태 관리
  const { isLoading, isError } = useApiReducer<void, void>(deleteUserApiCall)

  // 사용자 삭제 함수
  const deleteUser = async () => {
    if (!id) return
    try {
      await deleteUserApiCall()
      queryClient.invalidateQueries({ queryKey: ['users'] }) // 성공 시 쿼리 무효화
      alert('삭제했습니다. 목록 페이지로 이동합니다.')
      router.push('/user') // 성공 시 페이지 이동
    } catch (err) {
      alert('삭제에 실패했습니다. 다시 시도해주세요.')
    }
  }

  return { deleteUser, isLoading, isError } // 삭제 함수와 삭제 상태 반환
}
