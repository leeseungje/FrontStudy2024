// src/context/UserContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { fetcher, createUserFn, updateUserFn, User, UserParams } from '@/utils/api';

interface UserContextType {
  data: User[] | User | undefined;
  isLoading: boolean;
  isError: boolean;
  fetchUser: (id?: string) => void;
  createUser: (name: string, email: string) => void;
  createUserError: string | null;
  updateUser: (id: string, name: string, email: string) => void;
  updateUserError: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<User[] | User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [createUserError, setCreateUserError] = useState<string | null>(null);
  const [updateUserError, setUpdateUserError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const router = useRouter();

  const fetchUser = async (id?: string) => {
    setIsLoading(true);
    setIsError(false);
    try {
      const result = await fetcher(id ? `/api/user/${id}` : '/api/user', { cache: 'no-store' });
      setData(result);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const createMutation = useMutation<User, Error, UserParams>({
    mutationFn: createUserFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      alert('생성했습니다. Users List 페이지로 이동합니다.');
      router.push('/user');
    },
    onError: (error: Error) => {
      setCreateUserError(error.message);
    },
  });

  const createUser = (name: string, email: string) => {
    setCreateUserError(null);
    createMutation.mutate({ name, email });
  };

  const updateMutation = useMutation<User, Error, UserParams>({
    mutationFn: updateUserFn,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['user', variables.id] });
      alert('수정했습니다. 상세 페이지로 이동합니다.');
      router.push(`/user/${variables.id}`);
    },
    onError: (error: Error) => {
      setUpdateUserError(error.message);
    },
  });

  const updateUser = (id: string, name: string, email: string) => {
    setUpdateUserError(null);
    updateMutation.mutate({ id, name, email });
  };

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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
