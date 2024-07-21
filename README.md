# FrontEnd Study 2024

## 목표

- 프론트엔드 기본 이론
- 라이브러리, 개발환경 등을 **왜** 사용하는지??

## 진행방법

- 각 아젠다를 최대한 미리 예습 후 참석

## 아젠다

### Day1 (6/25)

- [FrontEnd Roadmap](https://roadmap.sh/frontend)
- W3C는 뭐 하는 곳인가요??
  - 표준이 정의되는 단계는??
  - 웹 표준이란? 웹 접근성이란?
- 자바스크립트 표준은??
  - ES6 란??
  - ES7 이후
- CommonJS(CJS)와 ECMAScript Modules(ESM)의 차이점은??
- 브라우저에 https://www.naver.com 입력 후 화면에 렌더링 되기까지의 **모든 과정**
- Virtual Dom 이란??
- Svelte는 virtual DOM을 사용하는 React, Vue와의 차이점은??
- CORS란??
  - 해결하는 방법은??
- null 과 undefined의 차이점은?
- 자바스크립트에서 ?? vs || 의 차이점은?

[Day1링크](https://github.com/leeseungje/FrontStudy2024/tree/main/Day1)

### Day2 (7/2 예정)

- Transpiler와 Bundler는 각각 무엇인가요??
- webpack에서 loader와 plugin은 각각 무엇인가요??
- vite를 이용해서 프로젝트 설정(**실습**)
  1. react + typescript로 세팅
  2. build 결과물의 폴더를 abc로 변경 (다양한 build options 테스트 해보기)
  - css minify
  - target es2015, es2020 비교해보기
  - sourcemap 등...
  3. 빌드 별과물을 index.js 하나의 파일로 만들기
  - plugin 검색 후 추가
- Webpack과 vite를 비교해 주세요.
- Event Loop에 대해서 설명해 주세요.
  - 마이크로 태스크 큐, 태스크 큐
- var, let, const의 차이점에 대해 설명해 주세요.
- CSR, SSR, SSG, ISR에 대해서 각각 설명해 주세요.
- React Hydrate는 무엇인가요??
- Nextjs에서 app 라우터와 pages 라우터의 차이점은??

[Day2링크](https://github.com/leeseungje/FrontStudy2024/tree/main/Day2)

### Day3 (7/17 예정)

[API 샘플](https://github.com/kjk7034/fe-study-2024/tree/main/kjk7034/example/study-api)에서 user 관련 CRUD 확인 가능

- 데이터 Fetch
  - SWR
  - TanStack Query

이전 스터디한 SSR, CSR, ISR 확인해보기.

[Day3링크](https://github.com/leeseungje/FrontStudy2024/tree/main/Day3)

### Day4 (7/23 예정)

Day3에서 진행한 User CRUD 관련 페이지를 state 구조로 변경해보세요.
(ex: redux를 이용해서 상태관리 해보기)

- React 상태 관리 하고 싶은 것 **최소** 3개 써보기. (테스트 하면서 장단점 찾아보기 **실습**)

  - useReducer [useReducer](https://github.com/leeseungje/FrontStudy2024/tree/main/Day4/useReducer)
  - Redux
  - MobX
  - Context API
  - Recoil
  - jotai [jotai](https://github.com/leeseungje/FrontStudy2024/tree/main/Day4/jotai)

- Next 스터디로 하고 싶은 것 제안하기.
  - 해보고 싶은 것

### Day5

- 미정!!

### 스터디로 괜찮다고 생각하는 주제.

- 하고 싶은 분은 개인적으로 or 스터디 구성

- [벨로퍼트와 함께하는 모던 리액트](https://react.vlpt.us/)
  - redux를 사용 안 해봤다면, 참고해서 스터디 해도 좋을 것 같음.
  - 스터디 후 [Redux 톺아보기](https://goidle.github.io/redux/in-depth-redux/)를 보면 좋을 것 같음.
- [React Internals Deep Dive](https://jser.dev/series/react-source-code-walkthrough)
  - 스터디에서 진행하려 했으나, 난이도와 시간이 오래 걸릴 것 같아서...
    추후 다른 분들과 스터디를 해도 좋을 것 같습니다.
- [React 톺아보기 - 01. Preview ~ 04. Concurrent Render](https://goidle.github.io/)
  - 위 React Internals Deep Dive를 읽기 전 먼저 보고 진행 여부 파악해 보기. (난이도)
