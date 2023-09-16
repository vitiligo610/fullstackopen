import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import './index.css'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import { setNotification, useDispatchValue } from './NotificationContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { setToken, getAll, create, update, remove } from './requests'

const App = () => {
  // const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatchValue()
  const queryClient = useQueryClient()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  const newBlogMutation = useMutation(create, {
    onSuccess: (returnedBlog) => {
      queryClient.invalidateQueries(['blogs'])
      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: `SUCCESS a new blog '${returnedBlog.title}' by '${returnedBlog.author}' added`
      })
      setTimeout(() => dispatch({ type: 'HIDE_NOTIFICATION' }), 3000)
    }
  })

  const updateBlogMutation = useMutation(update, {
    onSuccess: (returnedBlog) => {
      queryClient.invalidateQueries(['blogs'])
      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: `SUCCESS blog '${returnedBlog.title}' was successfully updated`
      })
      setTimeout(() => dispatch({ type: 'HIDE_NOTIFICATION' }), 3000)
    }
  })

  const result = useQuery(['blogs'], getAll)

  const blogs = result.data

  const blogFormRef = useRef()

  const createBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      newBlogMutation.mutate(blogObject)
    } catch (error) {
      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: `cannot add blog ${blogObject.title}`
      })
      setTimeout(() => dispatch({ type: 'HIDE_NOTIFICATION' }, 3000))
    }
  }

  const updateBlog = (blogToUpdate) => {
    try {
      const updatedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1
      }
      updateBlogMutation.mutate(updatedBlog)
    } catch (error) {
      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: `cannot update blog ${blogToUpdate.title}`
      })
      setTimeout(() => dispatch({ type: 'HIDE_NOTIFICATION' }, 3000))
    }
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  const removeBlog = async (blogToDelete) => {
    if (
      window.confirm(
        `Remove blog '${blogToDelete.title}' by '${blogToDelete.author}'`
      )
    ) {
      try {
        await remove(blogToDelete)
        const blogs = queryClient.getQueryData(['blogs'])
        queryClient.setQueryData(
          ['blogs'],
          blogs.filter((blog) => blog.id !== blogToDelete.id)
        )
        queryClient.invalidateQueries(['blogs'])
        dispatch({
          type: 'SHOW_NOTIFICATION',
          payload: `SUCCESS blog '${blogToDelete.title}' was successfully deleted`
        })
        setTimeout(() => dispatch({ type: 'HIDE_NOTIFICATION' }), 3000)
      } catch (error) {
        dispatch({
          type: 'SHOW_NOTIFICATION',
          payload: `cannot remove blog '${blogToDelete.title}'`
        })
        setTimeout(() => dispatch({ type: 'HIDE_NOTIFICATION' }, 3000))
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

      setToken(user.token)
      setUser(user)
      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: `SUCCESS logged in successfully as ${
          user.name || user.username
        }`
      })
      setTimeout(() => dispatch({ type: 'HIDE_NOTIFICATION' }), 3000)
      setNotification(
        'success',
        `Logged in successfully as ${user.name || user.username}`
      )
      setUsername('')
      setPassword('')
    } catch (error) {
      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: `ERROR wrong credentials`
      })
      setTimeout(() => dispatch({ type: 'HIDE_NOTIFICATION' }, 3000))
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
          {result.isLoading ? (
            <h2>
              <em>loading data....</em>
            </h2>
          ) : (
            blogs
              .sort(byLikes)
              .map((blog, index) => (
                <Blog
                  key={index}
                  blog={blog}
                  updateBlog={updateBlog}
                  removeBlog={removeBlog}
                />
              ))
          )}
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
