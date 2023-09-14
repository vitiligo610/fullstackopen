import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = () => {
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  const usersBlogs = users.map(user => (
    {
      ...user,
      blogs: blogs.filter(blog => blog.user.username === user.username)
    }
  ))

  return <div>
    <h2>Users</h2>
    <table width='300'>
      <tbody>
        <tr>
          <td></td>
          <td><b>blogs created</b></td>
        </tr>
          {usersBlogs.map(user => (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
}

export default UserList