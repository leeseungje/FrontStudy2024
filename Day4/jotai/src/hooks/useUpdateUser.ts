import { useRouter } from 'next/router'
import { atom, useAtom, useSetAtom } from 'jotai'
import { updateUserFn, UserParams, User } from '@/utils/api'
import { useUsers } from './useUser'

// 에러 상태를 관리하기 위한 atom
const errorAtom = atom<string | null>(null)

// 사용자 업데이트 상태를 관리하기 위한 atom 정의
const updateUserAtom = atom(
  null,
  async (get, set, { id, name, email }: UserParams) => {
    set(errorAtom, null) // 에러 상태 초기화
    try {
      const updatedUser = await updateUserFn({ id, name, email }) // 사용자 업데이트 함수 호출
      set(errorAtom, null) // 에러 상태 초기화 (성공 시)
      return updatedUser
    } catch (error) {
      set(errorAtom, (error as Error).message) // 에러 상태 설정
      throw error
    }
  },
)

export const useUpdateUser = () => {
  const router = useRouter()
  const [error] = useAtom(errorAtom) // 에러 상태 읽기
  const updateUser = useSetAtom(updateUserAtom) // 사용자 업데이트 atom의 업데이트 함수 사용
  const { refreshUsers } = useUsers()

  const handleUpdateUser = async (id: string, name: string, email: string) => {
    await updateUser({ id, name, email }) // 사용자 업데이트 함수 실행
    if (!error) {
      alert('수정했습니다. 상세 페이지로 이동합니다.')
      await refreshUsers(id) // 사용자 정보 갱신 에서 not writable atom 에러가 딸어집니다.
      router.push(`/user/${id}`)
    }
  }

  return { updateUser: handleUpdateUser, error }
}
