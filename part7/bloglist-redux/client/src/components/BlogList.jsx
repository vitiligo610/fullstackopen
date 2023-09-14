import { useSelector, useDispatch } from 'react-redux'
import { useRef } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)

  const blogFormRef = useRef()
  const toggleForm = () => blogFormRef.current.toggleVisibility()

  const blogsCopy = [...blogs]
  return (
    <div>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm toggleForm={toggleForm} />
      </Togglable>
      {blogsCopy.map((blog) => (
        <Link key={blog.id} to={`/blogs/${blog.id}`}><Blog blog={blog} /></Link>
      ))}
    </div>
  )
}

export default BlogList
