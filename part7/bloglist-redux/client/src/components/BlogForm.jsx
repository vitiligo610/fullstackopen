import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'

const BlogForm = ({ toggleForm }) => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  const createBlog = async (e) => {
    e.preventDefault()
    const blogObject = {
      title: e.target.title.value,
      author: e.target.author.value,
      url: e.target.url.value
    }
    try {
      await blogService.create(blogObject).then((returnedBlog) => {
        const blogToDispatch = {
          ...returnedBlog,
          user: {
            name: user.name,
            username: user.username,
            id: returnedBlog.user.id
          }
        }
        dispatch(addBlog(blogToDispatch))
        dispatch(setNotification('success', `a new blog '${e.target.title.value}' by '${e.target.author.value}' added`))
      })
    } catch (error) {
      dispatch(setNotification('error', `cannot add blog '${blogObject.title}'`))
    }
    e.target.title.value = ''
    e.target.author.value = ''
    e.target.url.value = ''
    toggleForm()
  }

  return (
    <form onSubmit={createBlog}>
      <h2>create new</h2>
      <div>
        title:{' '}
        <input
          name='title'
          type='text'
          required
        />
      </div>
      <div>
        author:{' '}
        <input
          name='author'
          type='text'
          required
        />
      </div>
      <div>
        url:{' '}
        <input
          name='url'
          type='text'
          required
        />
      </div>
      <button>create</button>
    </form>
  )
}

export default BlogForm
