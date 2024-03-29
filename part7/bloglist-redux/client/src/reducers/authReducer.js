import loginService from '../services/login'
import blogService from '../services/blogs'

const authReducer = (state = null, action) => {
  console.log('state', state)
  console.log('action', action)
  switch(action.type) {
    case 'INIT_USER':
      return action.payload
    case 'LOGIN':
      return action.payload
    case 'LOGOUT':
      return action.payload
    default:
      return state
  }
}

export const initializeUser = () => {
    const loggedBlogAppUser = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedBlogAppUser) {
      const user = JSON.parse(loggedBlogAppUser)
      blogService.setToken(user.token)
      return {
        type: 'INIT_USER',
        payload: user
      }
    }
    return {
      type: 'INIT_USER',
      payload: null
    }
}

export const login = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({ username, password })
    blogService.setToken(user.token)
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    dispatch({
      type: 'LOGIN',
      payload: user
    })
  }
}

export const logout = () => {
  window.localStorage.clear()
  return {
    type: 'LOGOUT',
    payload: null
  }
}

export default authReducer