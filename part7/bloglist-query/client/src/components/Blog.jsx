import { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const [blogObject, setBlogObject] = useState(blog)
  console.log(blogObject)

  const toggleDetailsVisibility = () => {
    setDetailsVisible(!detailsVisible)
  }

  const increaseLikes = async () => {
    await updateBlog(blogObject)
    setBlogObject({ ...blog, likes: blog.likes + 1 })
  }

  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const buttonStyle = {
    marginLeft: 5
  }

  console.log('user', blog.user.name, blog.user.username)
  return (
    <div style={blogStyle}>
      {blog.title} - {blog.author}
      <button onClick={toggleDetailsVisibility} style={buttonStyle}>{detailsVisible ? 'hide' : 'show'}</button>
      {
        detailsVisible &&
        <>
          <br /><a href={blog.url} target='blank'>{blog.url}</a><br />
          likes {blogObject.likes}
          <button onClick={increaseLikes} style={buttonStyle}>like</button><br />
          {blog.user.name || blog.user.username}<br />
          <button onClick={() => removeBlog(blog)} style={buttonStyle}>remove</button>
        </>
      }
    </div>
  )
}

export default Blog