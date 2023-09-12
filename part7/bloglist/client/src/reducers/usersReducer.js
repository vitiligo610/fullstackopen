import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    getAllUsers: (state, action) => {
      return action.payload
    }
  }
})

export const { getAllUsers } = usersSlice.actions

export const initializeUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch(getAllUsers(users))
  }
}

export default usersSlice.reducer