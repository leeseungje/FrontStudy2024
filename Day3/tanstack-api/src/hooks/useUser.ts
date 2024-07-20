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
