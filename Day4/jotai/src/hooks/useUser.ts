import { atom, useAtom } from 'jotai'
import { fetcher } from '@/utils/api'

// atom을 고유하게 관리하기 위한 Map
const userAtoms = new Map<string, any>()

// 비동기 데이터를 관리하기 위한 atom 정의 (해당 방식으로 하면 api를 무한으로 호출)
// const userAtom = (id: string) =>
//   atom(async () => {
//     const response = await fetcher(`/api/user/${id}`, { cache: 'no-store' })
//     return response
//   })

const usersAtom = atom(async () => {
  const response = await fetcher('/api/user', { cache: 'no-store' })
  return response
})

const userAtom = (id: string) => {
  // 해당 ID에 대한 Atom이 존재하지 않는 경우에만 새로운 Atom 생성
  if (!userAtoms.has(id)) {
    userAtoms.set(
      id,
      atom(async () => {
        const response = await fetcher(`/api/user/${id}`, { cache: 'no-store' })
        return response
      }),
    )
  }
  return userAtoms.get(id)
}

// useUsers 훅 정의
export const useUsers = (id?: string) => {
  const [data, setData] = useAtom(id ? userAtom(id) : usersAtom)
  const isLoading = data === undefined
  const isError = data instanceof Error

  const refreshUsers = async (id?: string) => {
    try {
      const response = await fetcher(id ? `/api/user/${id}` : '/api/user', {
        cache: 'no-store',
      })
      setData(response)
    } catch (error) {
      setData(error)
    }
  }

  return {
    data,
    isLoading,
    isError,
    refreshUsers,
  }
}
