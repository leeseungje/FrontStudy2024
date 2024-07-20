/**
 * useUsers 훅
 *
 * @description
 * 이 훅은 사용자 데이터를 가져오는 로직
 * id가 주어지면 특정 사용자의 데이터를, 그렇지 않으면 모든 사용자의 데이터를 호출
 *
 * @param {string} [id] - 선택적 사용자 ID. 주어지면 특정 사용자 호출
 *
 * @returns {{
 *   data: User[] | User | undefined,
 *   isLoading: boolean,
 *   isError: boolean,
 * }} 사용자 데이터, 로딩 상태 및 에러 상태를 반환
 *
 * @useQuery - 데이터를 가져오는 로직 관리
 * @queryKey - 쿼리를 식별하기 위한 key
 * @queryFn - 데이터를 가져오는 함수
 */
import { useQuery } from '@tanstack/react-query'
import { fetcher, User } from '@/utils/api'

export const useUsers = (id?: string) => {
  const { data, error, isLoading } = useQuery<User[] | User>({
    queryKey: ['users'],
    queryFn: () => fetcher(id ? `/api/user/${id}` : '/api/user'),
  })

  return {
    data,
    isLoading,
    isError: !!error,
  }
}
