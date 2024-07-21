import { useRouter } from 'next/router'
import { useAtom, atom, useSetAtom } from 'jotai'
import { deleteUserFn } from '@/utils/api'
import { useUsers } from './useUser'

// 삭제 상태를 관리하기 위한 atom
const deletingAtom = atom<boolean>(false)

// 에러 상태를 관리하기 위한 atom
const errorAtom = atom<string | null>(null)

// 사용자 삭제 atom 정의
const deleteUserAtom = atom(null, async (get, set, id: string | undefined) => {
  if (!id) return

  set(deletingAtom, true) // 삭제 상태를 true로 설정
  try {
    await deleteUserFn(id) // 사용자 삭제 함수 호출
    set(deletingAtom, false) // 삭제 상태를 false로 설정
    set(errorAtom, null) // 에러 상태 초기화
  } catch (error) {
    set(deletingAtom, false) // 삭제 상태를 false로 설정
    set(errorAtom, (error as Error).message) // 에러 상태 설정
  }
})

export const useDeleteUser = (id: string | undefined) => {
  const router = useRouter()
  const [deleting] = useAtom(deletingAtom) // 삭제 상태 읽기
  const [error] = useAtom(errorAtom) // 에러 상태 읽기
  const deleteUser = useSetAtom(deleteUserAtom) // 사용자 삭제 atom의 업데이트 함수 사용
  const { refreshUsers } = useUsers()

  const handleDeleteUser = async () => {
    await deleteUser(id)
    if (!error) {
      alert('삭제했습니다. 목록 페이지로 이동합니다.')
      await refreshUsers() // 사용자 정보 갱신 에서 not writable atom 에러가 딸어집니다.
      router.push('/user')
    } else {
      alert(error)
    }
  }

  return { deleteUser: handleDeleteUser, deleting }
}
