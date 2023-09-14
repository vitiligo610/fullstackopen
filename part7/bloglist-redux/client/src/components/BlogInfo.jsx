import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import { useNavigate } from 'react-router-dom'

const BlogInfo = ({ blog }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!blog)
    return <h2>loading data...</h2>

  const increaseLikes = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    try {
      await blogService.update(updatedBlog).then(() => {
        dispatch(updateBlog(updatedBlog))
        dispatch(setNotification('success',`Blog '${updatedBlog.title}' was successfully updated`))
      })
    } catch (error) {
      dispatch(setNotification('error', `Cannot update blog ${blog.title}`))
    }
  }

  const removeBlog = async () => {
    if (window.confirm(`Remove blog '${blog.title}' by '${blog.author}'`)) {
      try {
        await blogService
          .remove(blog.id)
          .then(() => {
            dispatch(deleteBlog(blog.id))
            dispatch(setNotification('success', `Blog '${blog.title}' was successfully removed`))
            navigate('/')
          })
      } catch (error) {
        dispatch(setNotification('error', `Cannot remove blog '${blog.title}'`))
      }
    }
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <span>
        {blog.likes} likes <button onClick={increaseLikes}>like</button>
      </span><br />
      <span>
        added by {blog.user.name || blog.user.username} <button onClick={removeBlog}>remove</button>
      </span>
      <h2>comments</h2>
      <br />
    </div>
  )
}

export default BlogInfo
