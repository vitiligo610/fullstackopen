import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import { useNavigate } from 'react-router-dom'

const BlogInfo = ({ blog }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!blog)
    return <h3><em>loading data...</em></h3>

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
            navigate('/blogs')
          })
      } catch (error) {
        dispatch(setNotification('error', `Cannot remove blog '${blog.title}'`))
      }
    }
  }

  const commentBlog = async e => {
    e.preventDefault()
    const updatedBlog = {
      ...blog,
      comments: [ ...blog.comments, e.target.comment.value ]
    }

    try {
      await blogService.update(updatedBlog).then(() => {
        dispatch(updateBlog(updatedBlog))
        dispatch(setNotification('success',`comment '${e.target.comment.value}' added successfully`))
        e.target.comment.value = ''
      })
    } catch (error) {
      dispatch(setNotification('error', `Cannot add comment ${e.target.comment.value}`))
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
      <form onSubmit={commentBlog}>
        <input name='comment' />{' '}
        <button>add comment</button>
      </form>
      {blog.comments.length < 1
        ? <p><em>No comments here, be the first one to comment!</em></p>
        : <ul>
            {blog.comments.map((comment, id) => <li key={id}>{comment}</li>)}
          </ul>
      }
    </div>
  )
}

export default BlogInfo
