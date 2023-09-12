import { useSelector, useDispatch } from 'react-redux'

import { setNotification } from '../reducers/notificationReducer'
import { updateLikesOf, removeBlog as deleteBlog } from '../reducers/blogReducer'

import Blog from './Blog'

const BlogList = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)

  const byLikes = (b1, b2) => b2.likes - b1.likes

  const updateBlog = (blogToUpdate) => {
    dispatch(updateLikesOf(blogToUpdate))
    dispatch(setNotification('success', `Blog '${blogToUpdate.title}' was successfully updated`))
  }

  const removeBlog = async (blogToDelete) => {
    if (window.confirm(`Remove blog '${blogToDelete.title}' by '${blogToDelete.author}'`)) {
      await dispatch(deleteBlog(blogToDelete))
      dispatch(setNotification('success', `Blog '${blogToDelete.title}' was successfully deleted`))
    }
  }

  const blogsCopy = [...blogs]
  console.log('value', blogsCopy)
  return (
    <div>
      {blogsCopy.sort(byLikes).map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          removeBlog={removeBlog}
        />
      ))}
    </div>
  )
}

export default BlogList