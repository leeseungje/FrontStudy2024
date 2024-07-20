_useReducer_
상태를 어떻게 업데이트 할지 정의하는 함수<br />
두 개의 인수를 방는데 state, action이 있다.<br />
useReducer는 데이터를 가져오거나 전송하는 동안의 로딩 상태와 오류 상태를 추적하고, 성공적으로 데이터를 가져왔을 때의 상태를 관리

- `useApiReducer` 훅 사용: useApiReducer 훅을 호출하여 API 호출 상태를 관리합니다. 이 훅은 로딩 상태, 오류 상태, 데이터를 반환합니다.<br />
  [useApiReducer.ts](https://github.com/leeseungje/FrontStudy2024/blob/main/Day4/useReducer/src/hooks/useApiReducer.ts)
  - `장점`
    - `상태 관리 일관성`: API 호출의 상태(로딩, 성공, 실패)를 일관되게 관리할 수 있습니다.
  - `단점`
    - `초기 설정 필요`: 처음에 useApiReducer 훅을 설정하고 사용하는 방법을 익히는 데 시간이 걸림.
    - `복잡한 API 호출 관리 한계`: 매우 복잡한 API 호출(예: 다단계 API 호출 또는 의존성 있는 호출)은 추가적인 상태 관리가 필요할 수 있음
    - `제네릭 타입 사용`: TypeScript를 사용하여 타입을 명확히 지정해야 하므로, 타입스크립트에 익숙하지 않은 사람에게는 어려울 수 있음
