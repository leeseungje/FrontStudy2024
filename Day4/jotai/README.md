**Jotai**

- React 상태 관리 라이브러리로 `useState`와 `useReducer`같은 기본적인 React 훅을 확장하여 보다 사용하기 쉬운 API제공<br />
  `atom` 이라는 개념을 사용하여 상태 관리 가능<br />
  `atom`은 단일 산태 족각을 나타내며 서로 독입적이거나 의존일 수 있다.

  - **_atom_**<br />
    상태의 기본 단위 `atom`을 사용하여 전역 상태를 정의하고 관리


    ```javascript
    import { atom } from 'jotai'

    // 기본 atom 정의
    const countAtom = atom(0)

    // 비동기 atom 정의
    const asyncDataAtom = atom(async () => {
      const response = await fetch('/api/data')
      const data = await response.json()
      return data
    })
    ```

- **_useAtom_**<br />
  atom의 상태를 읽고 업데이트할 수 있는 훅<br />
  useState와 유사하게 작동하며, 상태 값을 반환하고, 그 값을 업데이트할 수 있는 함수를 반환

  ```javascript
  import { useAtom } from 'jotai'

  const [count, setCount] = useAtom(countAtom)
  ```

- **_useSetAtom_**<br />
  상태 값을 읽지 않고 업데이트하는 데만 사용하는 훅<br />
  상태 업데이트가 필요한 곳에서 불필요한 재렌더링을 방지하는 데 유용

  ```javascript
  import { useSetAtom } from 'jotai'

  const setCount = useSetAtom(countAtom)
  ```
