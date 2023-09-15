import { createContext, useContext, useReducer } from "react"

const notificationReducer = (state, action) => {
  switch(action.type) {
    case 'SHOW_NOTIFICATION':
      return action.payload
    case 'HIDE_NOTIFICATION':
      return action.payload
    default:
      return state
  }
}

const NotificationContext = createContext()

export const useNotificationValue = () => {
  const stateAndDispatch = useContext(NotificationContext)
  return stateAndDispatch[0]
}

export const useDispatchValue = () => {
  const stateAndDispatch = useContext(NotificationContext)
  return stateAndDispatch[1]
}

export const setNotification = (dispatch, status, notification) => {
  if (status === 'success')
    dispatch(useDispatchValue({ type: 'NEW_NOTIFICATION', payload: `SUCCESS ${notification}`}))
  else if (status === 'error')
    dispatch(useDispatchValue({ type: 'NEW_NOTIFICATION', payload: `ERROR ${notification}`}))

  setTimeout(() => dispatch(useDispatchValue({ type: 'HIDE_NOTIFICATION' })), 3000)
}

export const NotificationContextProvider = (props) => {
  const [state, dispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[state, dispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}