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

export const setNotification = (type, message) => {
  return async dispatch => {
    if (type === 'success')
      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: `SUCCESS ${message}`
      })
    else if (type === 'error') 
      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: `ERROR ${message}`
      })
    setTimeout(() => dispatch({ type: 'HIDE_NOTIFICATION' }), 3000)
  }
}

export default notificationReducer