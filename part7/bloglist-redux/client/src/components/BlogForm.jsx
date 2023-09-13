import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  const addBlog = e => {
    e.preventDefault()
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    })
    setNewBlog({
      title: '',
      author: '',
      url: ''
    })
  }

  return (
    <form onSubmit={addBlog}>
      <h2>create new</h2>
      <div>
        title: <input
          type='text'
          value={newBlog.title}
          name='Title'
          required
          onChange={({ target }) => setNewBlog(prev => ({ ...prev, title: target.value }))}
        />
      </div>
      <div>
        author: <input
          type='text'
          value={newBlog.author}
          name='Author'
          required
          onChange={({ target }) => setNewBlog(prev => ({ ...prev, author: target.value }))}
        />
      </div>
      <div>
        url: <input
          type='text'
          value={newBlog.url}
          name='Url'
          required
          onChange={({ target }) => setNewBlog(prev => ({ ...prev, url: target.value }))}
        />
      </div>
      <button>create</button>
    </form>
  )
}

export default BlogForm