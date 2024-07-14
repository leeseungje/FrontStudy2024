[API 샘플](./kjk7034/example/study-api/)에서 user 관련 CRUD 확인 가능

- 데이터 Fetch

  - SWR
  - TanStack Query

    - TanStack Query (이전에는 React Query로 알려져 있음)는 서버 상태 관리를 위한 라이브러리<br />
      이는 비동기 데이터 페칭, 캐싱, 동기화, 그리고 서버 상태를 관리하기 위한 다양한 기능을 제공<br />
      React 애플리케이션에서 데이터 페칭 로직을 간소화하고, 비동기 데이터 관리의 복잡성을 줄인다.<br />
    - **_폴더 구조_**

      ```bash
      ├── components/
      │ ├── Header.tsx
      │ ├── Layout.tsx
      ├── pages/
      │ ├── _app.tsx
      │ ├── index.tsx
      │ └── user/
      │ ├── [id]/
      │ │ ├── edit/
      │ │ │ └── page.tsx
      │ │ └── page.tsx
      │ └── create/
      │ └── page.tsx
      ├── hooks/
      │ └── useUserApi.ts
      ├── api/
      │ └── user/
      │ └── user.ts
      └── types/
      └── types.ts
      ```

      1. **QueryClient 및 QueryClientProvider 설정**<br />
         swr 방식과 다르게 pages/\_app.tsx 를 만들어 설정을 해야 한다.<br />
         해당 페이지에 QueryClient 및 QueryClientProvider 설정을 한다.<br />

이전 스터디한 SSR, CSR, ISR 확인해보기.
