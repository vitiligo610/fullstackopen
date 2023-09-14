import { useSelector, useDispatch } from 'react-redux'
import { useRef } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'

const BlogList = () => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)

  const blogFormRef = useRef()
  const toggleForm = () => blogFormRef.current.toggleVisibility()

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

  const blogsCopy = [...blogs]
  return (
    <div>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm toggleForm={toggleForm} />
      </Togglable>
      {blogsCopy.map((blog) => (
        <Blog key={blog.id} blog={blog} updateBlog={increaseLikes} removeBlog={removeBlog} />
      ))}
    </div>
  )
}

export default BlogList
