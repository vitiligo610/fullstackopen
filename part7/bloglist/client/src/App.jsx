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

import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  console.log('rerendering App')
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const createBlog = (blogToAdd) => {
    blogFormRef.current.toggleVisibility()
    try {
      blogService
        .create(blogToAdd).
        then((addedBlog) => {
          setBlogs(blogs.concat(addedBlog))
          dispatch(setNotification(dispatch, 'success', `a new blog ${addedBlog.title} by ${addedBlog.author} added`))
        })
    } catch (error) {
      dispatch(setNotification(dispatch, 'error', `Cannot add blog ${blogObject.title}`))
    }
  }

  const updateBlog = async (blogToUpdate) => {
    try {
      blogService.update(blogToUpdate).then((updatedBlog) => {
        setBlogs(blogs.map((b) => (b.id !== updatedBlog.id ? b : updatedBlog)))
        dispatch(setNotification(dispatch, 'success', `Blog ${blogToUpdate.title} was successfully updated`))
      })
    } catch (error) {
      dispatch(setNotification(dispatch, 'error', `Cannot update blog ${blogToUpdate.title}`))
    }
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  const removeBlog = async (blogToDelete) => {
    if (
      window.confirm(
        `Remove blog ${blogToDelete.title} by ${blogToDelete.author}`
      )
    ) {
      try {
        await blogService.remove(blogToDelete)
        setBlogs(blogs.filter((n) => n.id !== blogToDelete.id))
        dispatch(setNotification(dispatch, 'success', `Blog ${blogToDelete.title} was successfully deleted`))
      } catch (error) {
        dispatch(setNotification(dispatch, 'error', `Cannot remove blog ${blogToDelete.title}`))
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
          <Notification error={errorMessage} success={successMessage} />
          {user.name || user.username} logged in &nbsp;
          <button onClick={handleLogout}>log out</button>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          {blogs.sort(byLikes).map((blog, index) => (
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
