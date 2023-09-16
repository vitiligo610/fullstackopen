import { useReducer, createContext } from 'react'

const userReducer = (state, action) => {
  switch(action.type) {
    case 'INIT_USER':
      return action.payload
    case 'LOGIN':
      return action.payload
    case 'LOGOUT':
      window.localStorage.clear()
      return null
    default:
      return state
  }
}

export const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [state, dispatch] = useReducer(userReducer, null)

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}