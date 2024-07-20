import { useCallback, useEffect } from 'react'
import { useApiReducer } from './useApiReducer'
import { fetcher, User } from '@/utils/api'

/**
 * fetchUsers 함수
 * @param id - 사용자 ID (옵션)
 * @returns 사용자 데이터 (User 배열 또는 단일 User 객체)
 */
const fetchUsers = async (id?: string): Promise<User[] | User> => {
  const url = id ? `/api/user/${id}` : '/api/user' // 사용자 ID가 있으면 해당 ID의 사용자 데이터, 없으면 전체 사용자 데이터
  const response = await fetcher(url, { cache: 'no-store' }) // API 호출
  return response
}

/**
 * useUsers 훅
 * @param id - 사용자 ID (옵션)
 * @returns 사용자 데이터, 로딩 상태, 오류 상태
 */
export const useUsers = (id?: string) => {
  // fetchUsers 함수를 의존성 배열에 따라 메모이제이션한 fetchFunction 생성
  const fetchFunction = useCallback(() => fetchUsers(id), [id])

  // useApiReducer 훅을 사용하여 API 호출 상태 관리
  const { data, isLoading, isError, execute } = useApiReducer<
    User[] | User,
    void
  >(fetchFunction)

  // 컴포넌트가 마운트될 때 API 호출을 트리거
  useEffect(() => {
    execute()
  }, [execute])

  return {
    data, // 사용자 데이터
    isLoading, // 로딩 상태
    isError, // 오류 상태
  }
}
