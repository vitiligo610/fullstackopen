import { useField } from '../hooks'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'

const BlogForm = ({ toggleForm }) => {
  const dispatch = useDispatch()

  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const user = useSelector(state => state.user)

  const createBlog = async e => {
    // e.preventDefault()
    // createBlog({
    //   title: title.value,
    //   author: author.value,
    //   url: url.value
    // })
    // title.reset()
    // author.reset()
    // url.reset()
    // toggleForm()
    e.preventDefault()
    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value
    }
    try {
      await blogService
        .create(blogObject)
        .then(returnedBlog => {
          dispatch(addBlog({ ...returnedBlog, user: { username: user.username, name: user.name, id: returnedBlog.user.id }}))
          console.error('returnedBlog ', returnedBlog)
          dispatch(setNotification('success', `a new blog '${blogObject.title}' by '${blogObject.author}' added`))
        })
    } catch (error) {
      dispatch(setNotification('error', `cannot add blog '${blogObject.title}'`))
    }
    title.reset()
    author.reset()
    url.reset()
    toggleForm()
  }

  return (
    <form onSubmit={createBlog}>
      <h2>create new</h2>
      <div>
        title: <input
          name='title'
          type={title.type}
          value={title.value}
          onChange={title.onChange}
          required
        />
      </div>
      <div>
        author: <input
          name='author'
          type={author.type}
          value={author.value}
          onChange={author.onChange}
          required
        />
      </div>
      <div>
        url: <input
          name='url'
          type={url.type}
          value={url.value}
          onChange={url.onChange}
          required
        />
      </div>
      <button>create</button>
    </form>
  )
}

export default BlogForm