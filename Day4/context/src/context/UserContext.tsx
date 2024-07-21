// src/context/UserContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import { fetcher, User } from '@/utils/api'

interface UserContextType {
  data: User[] | User | undefined
  isLoading: boolean
  isError: boolean
  fetchUser: (id?: string) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<User[] | User | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  const fetchUser = async (id?: string) => {
    setIsLoading(true)
    setIsError(false)
    try {
      const result = await fetcher(id ? `/api/user/${id}` : '/api/user', {
        cache: 'no-store',
      })
      setData(result)
    } catch (error) {
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <UserContext.Provider value={{ data, isLoading, isError, fetchUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider')
  }
  return context
}
