import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    newNotification(state, action) {
      return action.payload
    },
    hideNotification(state, action) {
      return null
    }
  }
})

export const { newNotification, hideNotification } = notificationSlice.actions

export const setNotification = (notification, displayTime) => {
  return dispatch => {
    dispatch(newNotification(notification))

    setTimeout(() => {
      dispatch(hideNotification())
    }, displayTime * 1000)
  }
}

export default notificationSlice.reducer