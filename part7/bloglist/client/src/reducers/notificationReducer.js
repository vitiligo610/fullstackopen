import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    showNotification: (state, action) => {
      return action.payload
    },
    hideNotification: (state, action) => {
      return action.payload
    }
  }
})

export const { showNotification, hideNotification } = notificationSlice.actions

export const setNotification = (dispatch, type, message) => {
  return async dispatch => {
    if (type === 'success')
      dispatch(showNotification(`SUCCESS${message}`))
    if (type === 'error')
      dispatch(showNotification(`ERROR${message}`))
    setTimeout(() => dispatch(hideNotification(null)), 5000)
  }
}

export default notificationSlice.reducer