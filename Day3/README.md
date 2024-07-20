[API 샘플](./kjk7034/example/study-api/)에서 user 관련 CRUD 확인 가능

- 데이터 Fetch

  - SWR
  - TanStack Query

    - TanStack Query (이전에는 React Query로 알려져 있음)는 서버 상태 관리를 위한 라이브러리<br />
      이는 비동기 데이터 페칭, 캐싱, 동기화, 그리고 서버 상태를 관리하기 위한 다양한 기능을 제공<br />
      React 애플리케이션에서 데이터 페칭 로직을 간소화하고, 비동기 데이터 관리의 복잡성을 줄인다.<br />
    - **useMutation**<br />
      서버에 데이터를 전송하거나 변경하는 비동기 작업을 처리<br />예를 들어, 데이터를 생성, 업데이트, 삭제하는 등의 작업에 사용

      - **_주요기능_**

        - mutationFn: 실제로 비동기 작업(예: API 호출)을 수행하는 함수입니다.
        - onSuccess: 작업이 성공했을 때 실행되는 콜백 함수입니다.
        - onError: 작업이 실패했을 때 실행되는 콜백 함수입니다.
        - onSettled: 작업이 완료되었을 때(성공 또는 실패 후) 실행되는 콜백 함수입니다.
        - mutate: Mutation을 실행하는 함수입니다.<br />

        ```javascript
        import { useMutation } from '@tanstack/react-query'
        import { createUserFn, User, CreateUserParams } from '@/utils/api'

        export const useCreateUser = () => {
          const mutation = useMutation<User, Error, CreateUserParams>({
            mutationFn: createUserFn,
            onSuccess: () => {
              // 작업이 성공적으로 완료되었을 때 실행되는 코드
              console.log('User created successfully')
            },
            onError: (error: Error) => {
              // 작업이 실패했을 때 실행되는 코드
              console.error('Failed to create user:', error)
            },
          })

          const createUser = (name: string, email: string) => {
            mutation.mutate({ name, email })
          }

          return { createUser }
        }
        ```

    - **useQueryClient**<br />
      React Query에서 제공하는 Query Client 인스턴스에 접근할 수 있게 해주는 역할<br />
      Query Client는 쿼리 데이터를 캐싱하고, 쿼리를 무효화하거나 다시 가져오는 등의 다양한 작업을 수행할 수 있는 기능을 제공

      - **_주요기능_**

        - invalidateQueries: 특정 쿼리를 무효화하여 데이터를 다시 가져오게 만드는 역할
        - setQueryData: 특정 쿼리의 데이터를 수동으로 설정
        - getQueryData: 특정 쿼리의 현재 캐시된 데이터를 가져옴

        ```javascript
        import { useMutation, useQueryClient } from '@tanstack/react-query'
        import { createUserFn, User, CreateUserParams } from '@/utils/api'

        export const useCreateUser = () => {
          const queryClient = useQueryClient()

          const mutation = useMutation<User, Error, CreateUserParams>({
            mutationFn: createUserFn,
            onSuccess: () => {
              // 'users' 쿼리를 무효화하여 데이터를 다시 가져오게 함
              queryClient.invalidateQueries({ queryKey: ['users'] })
              console.log('User created successfully and users query invalidated')
            },
            onError: (error: Error) => {
              console.error('Failed to create user:', error)
            },
          })

          const createUser = (name: string, email: string) => {
            mutation.mutate({ name, email })
          }

          return { createUser }
        }
        ```

        이 두 훅을 함께 사용하면, 예를 들어 새로운 사용자를 생성한 후 사용자 목록 쿼리를 무효화하여 목록이 최신 상태로 유지되도록 할 수 있다.<br />
        이는 사용자가 데이터를 생성, 업데이트, 삭제할 때 화면이 즉시 업데이트되도록 보장

이전 스터디한 SSR, CSR, ISR 확인해보기.
