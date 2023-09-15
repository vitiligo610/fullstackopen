import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { TableWrapper, StyledTable } from './styledComponents'

const UserList = () => {
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)

  const usersBlogs = users.map((user) => ({
    ...user,
    blogs: blogs.filter((blog) => blog.user.username === user.username)
  }))

  return (
    <TableWrapper>
      <StyledTable>
        <tbody>
          <tr>
            <td>Users</td>
          </tr>
          {usersBlogs.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
      <StyledTable>
        <tbody>
          <tr>
            <td>Blogs created</td>
          </tr>
          {usersBlogs.map((user) => (
            <tr key={user.id}>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  )
}

export default UserList
