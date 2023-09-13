import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateLikesOf, commentBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks'

const BlogInfo = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  const id = useParams().id
  const blog = blogs.find(blog => blog.id === String(id))

  const content = useField('text')

  const increaseLikes = async () => {
    await dispatch(updateLikesOf(blog))
    console.log('liked')
    dispatch(setNotification('success', `blog '${blog.title}' was successfully updated`))
  }
  
  const addComment = async e => {
    e.preventDefault()
    await dispatch(commentBlog(blog, content.value))
    dispatch(setNotification('success', `comment '${content.value}' was successfully added`))
    content.reset()
  }

  if (!blog)
    return null

  console.log('blog comments ', blog.comments)
  return (
    <div>
      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a><br />
      <span>{blog.likes} likes <button onClick={increaseLikes}>like</button></span><br />
      <span>added by {blog.user.name || blog.user.username}</span>
      <div>
        <h2>comments</h2>
        <form onSubmit={addComment}>
          <input name='comment' type={content.type} value={content.value} onChange={content.onChange} />
          <button>add comment</button>
        </form>
        <ul>
          {blog.comments.map((comment, idx) => <li key={idx}>{comment}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default BlogInfo