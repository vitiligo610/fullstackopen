import { useSelector, useDispatch } from 'react-redux'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)

  const blogsCopy = [...blogs]
  return (
    <div>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      {blogsCopy.map((blog) => (
        <Blog blog={blog} />
      ))}
    </div>
  )
}

export default BlogList
