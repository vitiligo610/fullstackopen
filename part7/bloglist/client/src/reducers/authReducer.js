import { createSlice } from '@reduxjs/toolkit'

import { setNotification } from './notificationReducer'

import blogService from '../services/blogs'
import loginService from '../services/login'

const authSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    initUser: (state, action) => {
      return action.payload
    },
    loginUser: (state, action) => {
      return action.payload
    },
    logoutUser: (state, action) => {
      action.payload
    }
  }
})

export const { initUser, loginUser, logoutUser } = authSlice.actions

export const initializeUser = () => {
  return async dispatch => {
    const loggedBlogAppUser = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedBlogAppUser) {
      const user = JSON.parse(loggedBlogAppUser)
      await blogService.setToken(user.token)
      dispatch(initUser(user))
      return
    }
    dispatch(initUser(null))
  } 
}

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      dispatch(loginUser(user))
    } catch (error) {
      dispatch(setNotification('error', `Wrong Credentials`))
    }
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.clear('loggedBlogAppUser')
    dispatch(initializeUser(null))
  }
}

export default authSlice.reducer