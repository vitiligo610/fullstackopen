import { Link } from 'react-router-dom'

const UserInfo = ({ user }) => {
  if (!user)
    return <h3><em>loading data...</em></h3>

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserInfo
