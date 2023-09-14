const notificationReducer = (state = null, action) => {
  switch(action.type) {
    case 'SHOW_NOTIFICATION':
      return action.payload
    case 'HIDE_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const setNotification = (status, message) => {
  return async dispatch => {
    if (status === 'success')
      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: `SUCCESS ${message}`
      })
    else if (status === 'error') 
      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: `ERROR ${message}`
      })
    setTimeout(() => dispatch({ type: 'HIDE_NOTIFICATION' }), 2000)
  }
}

export default notificationReducer