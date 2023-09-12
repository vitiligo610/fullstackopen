import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = () => {
  const dispatch = useDispatch()

  const title = useField('text')
  const author = useField('author')
  const url = useField('url')

  const addBlog = e => {
    e.preventDefault()
    dispatch(createBlog({ title, author, url }))
  }

  return (
    <form onSubmit={addBlog}>
      <h2>create new</h2>
      <div>
        title: <input {...title} />
      </div>
      <div>
        author: <input {...author} />
      </div>
      <div>
        url: <input {...url} />
      </div>
      <button>create</button>
    </form>
  )
}

export default BlogForm