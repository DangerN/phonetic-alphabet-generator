import { useReducer, useState } from 'react'

export const useWordOptions = () => {
  const reducer = (state, action) => {
    return {...state, [action.letter]: action.options}
  }
  const [state, dispatch] = useReducer(reducer, {})
  return [state, dispatch]
}

export const useGeneratedWord = () => {
  const reducer = (state, action) => {
    const newState = [...state]
    newState[action.index] = action.word
    return newState
  }
  const [state, dispatch] = useReducer(reducer, [])
  return [state, dispatch]
}

export const useCharLock = locks => {
  const [state, setState] = useState(locks)
  const setLock = (lock, index) => {
    const newState = [...state]
    newState[index] = lock
    setState(newState)
  }
  return [state, setLock]
}
