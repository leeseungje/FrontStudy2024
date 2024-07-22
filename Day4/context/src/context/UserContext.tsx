import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { fetcher, createUserFn, updateUserFn, deleteUserFn, User, UserParams } from '@/utils/api'

interface UserContextType {
  data: User[] | User | undefined
  isLoading: boolean
  isError: boolean
  fetchUser: (id?: string) => void
  createUser: (name: string, email: string) => void
  createUserError: string | null
  updateUser: (id: string, name: string, email: string) => void
  updateUserError: string | null
  deleteUser: (id: string) => void
  deleting: boolean
  deleteUserError: string | null
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<User[] | User | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [createUserError, setCreateUserError] = useState<string | null>(null)
  const [updateUserError, setUpdateUserError] = useState<string | null>(null)
  const [deleteUserError, setDeleteUserError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  const queryClient = useQueryClient()
  const router = useRouter()

  /**
   * 사용자를 불러오는 함수
   * @param id - 불러올 사용자 ID, 없으면 모든 사용자를 불러옴
   */
  const fetchUser = async (id?: string) => {
    setIsLoading(true)
    setIsError(false)
    try {
      const result = await fetcher(id ? `/api/user/${id}` : '/api/user', { cache: 'no-store' })
      setData(result)
    } catch (error) {
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  // 컴포넌트가 처음 마운트될 때 모든 사용자 데이터를 불러옴
  useEffect(() => {
    fetchUser()
  }, [])

  /**
   * 사용자 데이터를 생성, 수정, 삭제하기 위해 React Query의 useMutation 훅을 사용
   * useMutation 훅을 통해 데이터베이스와 상호작용하며, 성공과 실패 시의 행동을 정의
   * 유사하게 updateMutation, deleteMutation도 설정
   */
  const createMutation = useMutation<User, Error, UserParams>({
    mutationFn: createUserFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      alert('생성했습니다. Users List 페이지로 이동합니다.')
      router.push('/user')
    },
    onError: (error: Error) => {
      setCreateUserError(error.message)
    }
  })

  const createUser = (name: string, email: string) => {
    setCreateUserError(null)
    createMutation.mutate({ name, email })
  }

  const updateMutation = useMutation<User, Error, UserParams>({
    mutationFn: updateUserFn,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['user', variables.id] })
      alert('수정했습니다. 상세 페이지로 이동합니다.')
      router.push(`/user/${variables.id}`)
    },
    onError: (error: Error) => {
      setUpdateUserError(error.message)
    }
  })

  const updateUser = (id: string, name: string, email: string) => {
    setUpdateUserError(null)
    updateMutation.mutate({ id, name, email })
  }

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: deleteUserFn,
    onMutate: () => {
      setDeleting(true)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      alert('삭제했습니다. 목록 페이지로 이동합니다.')
      router.push('/user')
    },
    onError: (error: Error) => {
      setDeleteUserError(error.message)
      setDeleting(false)
    }
  })

  const deleteUser = (id: string) => {
    setDeleteUserError(null)
    deleteMutation.mutate(id)
  }

  /**
   * UserContext.Provider를 사용하여, 하위 컴포넌트들이 UserContext의 값을 사용할 수 있도록 제공
   * fetchUser, createUser, updateUser, deleteUser 각 함수가 포함 된다.
   */
  return (
    <UserContext.Provider
      value={{
        data,
        isLoading,
        isError,
        fetchUser,
        createUser,
        createUserError,
        updateUser,
        updateUserError,
        deleteUser,
        deleting,
        deleteUserError
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

/**
 * useUserContext 훅은 UserContext에서 제공하는 값을 사용하는 데 도움을 주는 커스텀 훅
 * useContext(UserContext)를 사용하여 현재 Context의 값을 가져옴
 * UserContext가 제공되지 않는 경우 (즉, UserProvider로 감싸지 않은 컴포넌트에서 사용한 경우), 에러를 발생
 * UserContextType으로 반환된 Context의 값을 안전하게 사용할 수 있도록 보장
 */
export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider')
  }
  return context
}
