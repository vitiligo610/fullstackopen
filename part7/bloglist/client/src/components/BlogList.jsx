import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateLikesOf, removeBlog as deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Togglable from './Togglable'
import Blog from './Blog'
import BlogForm from './BlogForm'

const BlogList = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)

  const byLikes = (b1, b2) => b2.likes - b1.likes

  

  const blogFormRef = useRef()

  const toggleForm = () => blogFormRef.current.toggleVisibility()

  const blogsCopy = [...blogs]

  return (
    <div>
      <h2>blogs</h2>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm toggleForm={toggleForm} />
      </Togglable>
      {blogsCopy.sort(byLikes).map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  )
}

export default BlogList