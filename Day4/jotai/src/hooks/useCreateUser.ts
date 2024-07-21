import { useRouter } from 'next/router'
import { atom, useAtom, useSetAtom } from 'jotai'
import { createUserFn, UserParams } from '@/utils/api'
import { useUsers } from './useUser'

// 에러 상태를 관리하기 위한 atom
const errorAtom = atom<string | null>(null)

// 사용자 생성 상태를 관리하기 위한 atom 정의
const createUserAtom = atom(
  null,
  async (get, set, { name, email }: UserParams) => {
    try {
      set(errorAtom, null) // 에러 상태 초기화
      await createUserFn({ name, email }) // 사용자 생성 함수 호출
      alert('생성했습니다. Users List 페이지로 이동합니다.')
      set(errorAtom, null) // 에러 상태 초기화 (성공 시)
    } catch (error) {
      set(errorAtom, (error as Error).message) // 에러 상태 설정
    }
  },
)

export const useCreateUser = () => {
  const router = useRouter()
  const [error] = useAtom(errorAtom) // 에러 상태 읽기
  const createUser = useSetAtom(createUserAtom) // 사용자 생성 atom의 업데이트 함수 사용
  const { refreshUsers } = useUsers()

  const handleCreateUser = async (name: string, email: string) => {
    await createUser({ name, email }) // 사용자 생성 함수 실행
    if (!error) {
      alert('생성했습니다. Users List 페이지로 이동합니다.')
      await refreshUsers() // 사용자 정보 갱신 에서 not writable atom 에러가 딸어집니다.
      router.push('/user')
    }
  }

  return { createUser: handleCreateUser, error }
}
