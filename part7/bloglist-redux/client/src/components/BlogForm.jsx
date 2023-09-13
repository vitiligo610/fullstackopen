import { useField } from '../hooks'

const BlogForm = ({ createBlog }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const addBlog = e => {
    e.preventDefault()
    createBlog({
      title: title.value,
      author: author.value,
      url: url.value
    })
    title.reset()
    author.reset()
    url.reset()
  }

  return (
    <form onSubmit={addBlog}>
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