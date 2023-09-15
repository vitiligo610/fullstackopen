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
import { setNotification, useDispatchValue } from './NotificationContext'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatchValue()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON)
    {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const createBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog))
        dispatch({ type: 'SHOW_NOTIFICATION', payload: `SUCCESS a new blog ${returnedBlog.title} by ${returnedBlog.author} added` })
        setTimeout(() => dispatch({ type: 'HIDE_NOTIFICATION' }), 3000)
      })
      .catch(error => {
        dispatch({ type: 'SHOW_NOTIFICATION', payload: `cannot add blog ${blogObject.title}`})
        setTimeout(() => dispatch({ type: 'HIDE_NOTIFICATION' }, 3000))       
      })

  }

  const updateBlog = async blogToUpdate => {
    try {
      const updatedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1
      }
      await blogService
        .update(updatedBlog)
        .then(returnedBlog => {
          setBlogs(blogs.map(blog => blog.id !== returnedBlog.id ? blog : returnedBlog))
          dispatch({ type: 'SHOW_NOTIFICATION', payload: `SUCCESS blog ${returnedBlog.title} was successfully updated` })
          setTimeout(() => dispatch({ type: 'HIDE_NOTIFICATION' }), 3000)
        })
    } catch(error) {
      dispatch({ type: 'SHOW_NOTIFICATION', payload: `cannot update blog ${blogToUpdate.title}`})
      setTimeout(() => dispatch({ type: 'HIDE_NOTIFICATION' }, 3000))
    }
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  const removeBlog = async blogToDelete => {
    if (window.confirm(`Remove blog ${blogToDelete.title} by ${blogToDelete.author}`)) {
      try {
        await blogService
          .remove(blogToDelete)
          .then(() => {
            setBlogs(blogs.filter(n => n.id !== blogToDelete.id))
          })
          dispatch({ type: 'SHOW_NOTIFICATION', payload: `SUCCESS Blog ${blogToDelete.title} was successfully deleted` })
          setTimeout(() => dispatch({ type: 'HIDE_NOTIFICATION' }), 3000)
      } catch (error) {
        dispatch({ type: 'SHOW_NOTIFICATION', payload: `cannot remove blog ${blogToDelete.title}`})
        setTimeout(() => dispatch({ type: 'HIDE_NOTIFICATION' }, 3000))
      }
    }
  }

  const handleLogin = async e => {
    e.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      dispatch({ type: 'SHOW_NOTIFICATION', payload: `SUCCESS logged in successfully as ${user.name || user.username}` })
      setTimeout(() => dispatch({ type: 'HIDE_NOTIFICATION' }), 3000)
      setNotification('success', `Logged in successfully as ${user.name || user.username}`)
      setUsername('')
      setPassword('')
    } catch (error) {
      dispatch({ type: 'SHOW_NOTIFICATION', payload: `ERROR wrong credentials`})
      setTimeout(() => dispatch({ type: 'HIDE_NOTIFICATION' }, 3000))
    }
  }

  const handleLogout = () => {
    window.localStorage.clear('loggedBlogAppUser')
    setUser(null)
  }

  return (
    <div>
      {
        !user &&
        <>
          <h2>Log in to application</h2>
          <Notification error={errorMessage} success={successMessage} />
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
          <Notification error={errorMessage} success={successMessage} />
          {user.name || user.username} logged in &nbsp;
          <button onClick={handleLogout}>log out</button>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          {blogs.sort(byLikes).map((blog, index) =>
            <Blog key={index} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} />
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