import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'A new anecdote is created',
  reducers: {
    anecdoteCreated(state, action) {
      return action.payload
    }
  }
})

export const { anecdoteCreated } = notificationSlice.actions
export default notificationSlice.reducer