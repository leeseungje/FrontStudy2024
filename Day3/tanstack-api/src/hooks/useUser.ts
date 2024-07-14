import { useQuery } from '@tanstack/react-query'
import { fetcher, User } from '@/utils/api'

export const useUsers = () => {
  const { data, error, isLoading } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => fetcher('/api/user'),
  })

  return {
    data,
    isLoading,
    isError: !!error,
  }
}
