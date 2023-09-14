import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import './index.css'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
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

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlogs())
  }, [])

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  // const createBlog = async blogObject => {
  //   blogFormRef.current.toggleVisibility()
  //   try {
  //     await blogService
  //       .create(blogObject)
  //       .then(returnedBlog => {
  //         dispatch(addBlog(returnedBlog))
  //         dispatch(setNotification('success', `a new blog '${blogObject.title}' by '${blogObject.author}' added`))
  //       })
  //   } catch (error) {
  //     dispatch(setNotification('error', `cannot add blog '${blogObject.title}'`))
  //   }
  // }

  // const increaseLikes = async blogToUpdate => {
  //   const updatedBlog = {
  //     ...blogToUpdate,
  //     likes: blogToUpdate.likes + 1
  //   }

  //   try {
  //     await blogService
  //       .update(updatedBlog)
  //       .then(() => {
  //         dispatch(updateBlog(updatedBlog))
  //         dispatch(setNotification('success', `Blog '${updatedBlog.title}' was successfully updated`))
  //       })
  //   } catch (error) {
  //     dispatch(setNotification('error', `Cannot update blog ${blogToUpdate.title}`))
  //   }
  // }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  // const removeBlog = async blogToDelete => {
  //   if (window.confirm(`Remove blog '${blogToDelete.title}' by '${blogToDelete.author}'`)) {
  //     try {
  //       await blogService
  //         .remove(blogToDelete.id)
  //         .then(() => {
  //           dispatch(deleteBlog(blogToDelete.id))
  //           dispatch(setNotification('success', `Blog '${blogToDelete.title}' was successfully removed`))
  //         })
  //     } catch (error) {
  //       dispatch(setNotification('error', `Cannot remove blog '${blogToDelete.title}'`))
  //     }
  //   }
  // }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div>
      {
        !user &&
        <>
          <h2>Log in to application</h2>
          <Notification />
          <LoginForm />
        </>
      }
      {
        user &&
        <>
          <h2>blogs</h2>
          <Notification />
          {user.name || user.username} logged in &nbsp;
          <button onClick={handleLogout}>log out</button>
          <BlogList />
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