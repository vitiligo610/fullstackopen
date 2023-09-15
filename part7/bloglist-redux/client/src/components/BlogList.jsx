import { useSelector } from 'react-redux'
import { useRef } from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'
import { StyledTable } from './styledComponents'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)

  const blogFormRef = useRef()
  const toggleForm = () => blogFormRef.current.toggleVisibility()

  return (
    <div>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm toggleForm={toggleForm} />
      </Togglable>
      <StyledTable cellPadding='10'>
        <tbody>
          <tr>
            <td>Blogs</td>
          </tr>
          {blogs
            .sort((b1, b2) => b2.likes - b1.likes)
            .map((blog) => (
              <tr key={blog.id}>
                <td><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></td>
              </tr>
            ))}
        </tbody>
      </StyledTable>
    </div>
  )
}

export default BlogList
