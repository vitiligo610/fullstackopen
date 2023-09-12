import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateLikesOf, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogInfo = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  const id = useParams().id
  const blog = blogs.find(blog => blog.id === String(id))

  const increaseLikes = async () => {
    console.log('liked')
    await dispatch(updateLikesOf(blog))
    dispatch(setNotification('success', `blog '${blog.title}' was successfully updated`))
  }

  const remove = () => {
    console.log('removed')
  }

  if (!blog)
    return null

  console.log('blog', blog)
  return (
    <div>
      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a><br />
      <span>{blog.likes} likes <button onClick={increaseLikes}>like</button></span><br />
      <span>added by {blog.user.name || blog.user.username} <button onClick={remove}>remove</button></span>
    </div>
  )
}

export default BlogInfo