import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import './index.css'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog as createNew, updateLikesOf, removeBlog as deleteBlog } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  
  console.log('rerendering App')
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])
  
  const blogs = useSelector(state => state.blogs)
  console.log('blogs', blogs)
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const createBlog = async (blogToAdd) => {
    blogFormRef.current.toggleVisibility()
    try {
      await dispatch(createNew(blogToAdd))
      dispatch(setNotification(dispatch, 'success', `a new blog '${blogToAdd.title}' by '${blogToAdd.author}' added`))
    } catch (error) {
      dispatch(setNotification(dispatch, 'error', `Cannot add blog '${blogToAdd.title}'`))
    }
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  const updateBlog = async (blogToUpdate) => {
    try {
      await dispatch(updateLikesOf(blogToUpdate))
      dispatch(setNotification(dispatch, 'success', `Blog '${blogToUpdate.title}' was successfully updated`))
    } catch (error) {
      dispatch(setNotification(dispatch, 'error', `Cannot update blog '${blogToUpdate.title}'`))
    }
  }

  const removeBlog = async (blogToDelete) => {
    if (
      window.confirm(
        `Remove blog '${blogToDelete.title}' by '${blogToDelete.author}'`
      )
    ) {
      try {
        await dispatch(deleteBlog(blogToDelete))
        dispatch(setNotification(dispatch, 'success', `Blog '${blogToDelete.title}' was successfully deleted`))
      } catch (error) {
        dispatch(setNotification(dispatch, 'error', `Cannot remove blog '${blogToDelete.title}'`))
      }
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      dispatch(setNotification(dispatch, 'success', `Successfully logged in as ${username}`))
      setUsername('')
      setPassword('')
    } catch (error) {
      dispatch(setNotification(dispatch, 'error', `Wrong Credentials`))
    }
  }

  const handleLogout = () => {
    window.localStorage.clear('loggedBlogAppUser')
    setUser(null)
  }

  return (
    <div>
      {!user && (
        <>
          <h2>Log in to application</h2>
          <Notification />
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </>
      )}
      {user && (
        <>
          <h2>blogs</h2>
          <Notification />
          {user.name || user.username} logged in &nbsp;
          <button onClick={handleLogout}>log out</button>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          {blogs.map((blog, index) => (
            <Blog
              key={index}
              blog={blog}
              updateBlog={updateBlog}
              removeBlog={removeBlog}
            />
          ))}
        </>
      )}
    </div>
  )
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default App
