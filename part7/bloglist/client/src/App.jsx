import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import './index.css'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'

import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, logout } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  
  console.log('rerendering App')
  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlogs())
  }, [])

  const user = useSelector(state => state.user)

  const blogFormRef = useRef()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div>
      {!user && (
        <>
          <h2>Log in to application</h2>
          <Notification />
          <LoginForm />
        </>
      )}
      {user && (
        <>
          <h2>blogs</h2>
          <Notification />
          <em>{user.name || user.username} logged in &nbsp;</em>
          <button onClick={handleLogout}>log out</button>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm />
          </Togglable>
          <BlogList />
        </>
      )}
    </div>
  )
}

// LoginForm.propTypes = {
//   username: PropTypes.string.isRequired,
//   password: PropTypes.string.isRequired,
//   handleUsernameChange: PropTypes.func.isRequired,
//   handlePasswordChange: PropTypes.func.isRequired,
//   handleSubmit: PropTypes.func.isRequired
// }

export default App
