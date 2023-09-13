import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import './index.css'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'

import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, addBlog, updateBlog, deleteBlog } from './reducers/blogReducer'
import { initializeUser, login, logout } from './reducers/authReducer'

const App = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [user, setUser] = useState(null)

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlogs())
  }, [])

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const blogFormRef = useRef()

  const createBlog = async blogObject => {
    blogFormRef.current.toggleVisibility()
    try {
      await blogService
        .create(blogObject)
        .then(() => {
          dispatch(addBlog(blogObject))
          dispatch(setNotification('success', `a new blog '${blogObject.title}' by '${blogObject.author}' added`))
        })
    } catch (error) {
      dispatch(setNotification('error', `cannot add blog '${blogObject.title}'`))
    }
  }

  const increaseLikes = async blogToUpdate => {
    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1
    }

    try {
      await blogService
        .update(updatedBlog)
        .then(() => {
          dispatch(updateBlog(updatedBlog))
          dispatch(setNotification('success', `Blog '${updatedBlog.title}' was successfully updated`))
        })
    } catch (error) {
      dispatch(setNotification('error', `Cannot update blog ${blogToUpdate.title}`))
    }
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  const removeBlog = async blogToDelete => {
    if (window.confirm(`Remove blog '${blogToDelete.title}' by '${blogToDelete.author}'`)) {
      try {
        await blogService
          .remove(blogToDelete.id)
          .then(() => {
            dispatch(deleteBlog(blogToDelete.id))
            dispatch(setNotification('success', `Blog '${blogToDelete.title}' was successfully removed`))
          })
      } catch (error) {
        dispatch(setNotification('error', `Cannot remove blog '${blogToDelete.title}'`))
      }
    }
  }

  const handleLogin = async e => {
    e.preventDefault()
    try {
      dispatch(login(username, password))
      dispatch(setNotification('success', `logged in successfully as ${username}`))
    } catch (error) {
      dispatch(setNotification('error', 'Wrong credentials'))
    }
  }

  const handleLogout = () => {
    dispatch(logout())
  }


  const sortedBlogs = [...blogs].sort(byLikes)

  return (
    <div>
      {
        !user &&
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
      }
      {
        user &&
        <>
          <h2>blogs</h2>
          <Notification />
          {user.name || user.username} logged in &nbsp;
          <button onClick={handleLogout}>log out</button>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          {sortedBlogs.map((blog, index) =>
            <Blog key={index} blog={blog} updateBlog={increaseLikes} removeBlog={removeBlog} />
          )}
        </>
      }
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