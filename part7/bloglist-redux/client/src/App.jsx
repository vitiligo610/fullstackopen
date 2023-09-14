import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './index.css'
import BlogList from './components/BlogList'
import Header from './components/Header'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/authReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlogs())
  }, [])

  const user = useSelector(state => state.user)

  return (
    <div>
      {!user && <LoginForm />}
      {
        user &&
        <>
          <h2>blogs</h2>
          <Notification />
          <Header />
          <BlogList />
        </>
      }
    </div>
  )
}

export default App







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