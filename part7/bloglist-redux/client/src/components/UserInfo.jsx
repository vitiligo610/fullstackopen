import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserInfo = ({ user }) => {
  const blogs = useSelector(state => state.blogs)

  if (!user)
    return <h3><em>loading data...</em></h3>

  const userBlogs = blogs.filter(blog => blog.user.username === user.username)
  
  return (
    <div>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {userBlogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserInfo
