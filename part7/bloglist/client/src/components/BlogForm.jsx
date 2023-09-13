import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = ({ toggleForm }) => {
  const dispatch = useDispatch()

  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const addBlog = async e => {
    e.preventDefault()
    await dispatch(createBlog({
      title: title.value,
      author: author.value,
      url: url.value
    }))
    dispatch(setNotification('success', `a new blog '${title.value}' by '${author.value}' added`))
    title.reset()
    author.reset()
    url.reset()
    toggleForm()
  }

  return (
    <form onSubmit={addBlog}>
      <h2>create new</h2>
      <div>
        title: <input name='title' type={title.type} value={title.value} onChange={title.onChange} />
      </div>
      <div>
        author: <input name='author' type={author.type} value={author.value} onChange={author.onChange} />
      </div>
      <div>
        url: <input name='url' type={url.type} value={url.value} onChange={url.onChange} />
      </div>
      <button>create</button>
    </form>
  )
}

export default BlogForm