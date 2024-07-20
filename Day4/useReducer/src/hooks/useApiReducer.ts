import { useReducer, useEffect, useCallback } from 'react'

/**
 * State 인터페이스
 * @template T - API로부터 받아온 데이터의 타입
 * @property data - API로부터 받아온 데이터를 저장하는 곳
 * @property isLoading - API 호출이 진행 중인지 여부를 나타내는 불리언 값
 * @property isError - API 호출이 실패했는지를 나타내는 불리언 값
 */
interface State<T> {
  data?: T
  isLoading: boolean
  isError: boolean
}

/**
 * Action 타입
 * @template T - API로부터 받아온 데이터의 타입
 */
type Action<T> =
  | { type: 'FETCH_INIT' } // API 호출을 시작할 때 액션 타입
  | { type: 'FETCH_SUCCESS'; payload: T } // API 호출 성공 시 액션 타입, payload에 데이터 전달
  | { type: 'FETCH_FAILURE' } // API 호출 실패 시 액션 타입

/**
 * apiReducer 함수
 * @template T - API로부터 받아온 데이터의 타입
 * @param state - 현재 상태
 * @param action - 실행할 액션
 * @returns 새로운 상태
 */
const apiReducer = <T>(state: State<T>, action: Action<T>): State<T> => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, isLoading: true, isError: false } // API 호출 시작 시 상태 업데이트
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload, // API 호출 성공 시 데이터 저장
      }
    case 'FETCH_FAILURE':
      return { ...state, isLoading: false, isError: true } // API 호출 실패 시 상태 업데이트
    default:
      throw new Error('Unhandled action type') // 처리되지 않은 액션 타입 에러 발생
  }
}

/**
 * useApiReducer 훅
 * @template T - API로부터 받아온 데이터의 타입
 * @template P - API 호출 함수의 인자 타입
 * @param fetchFunction - API 호출 함수
 * @returns API 호출 상태 (data, isLoading, isError)
 */
const useApiReducer = <T, P>(fetchFunction: (params: P) => Promise<T>) => {
  const [state, dispatch] = useReducer(apiReducer, {
    data: undefined,
    isLoading: false,
    isError: false,
  })

  const execute = useCallback(
    async (params: P) => {
      dispatch({ type: 'FETCH_INIT' }) // API 호출 시작 시 상태 업데이트
      try {
        const result = await fetchFunction(params) // API 호출
        dispatch({ type: 'FETCH_SUCCESS', payload: result }) // 성공 시 상태 업데이트
      } catch {
        dispatch({ type: 'FETCH_FAILURE' }) // 실패 시 상태 업데이트
      }
    },
    [fetchFunction],
  )

  return { ...state, execute } // 현재 상태와 실행 함수 반환
}

export { useApiReducer }
