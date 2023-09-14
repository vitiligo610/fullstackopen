import { useSelector } from 'react-redux'

const UserList = () => {
  const users = useSelector(state => state.users)

  return <div>
    <h2>Users</h2>
    <table width='300'>
      <tbody>
        <tr>
          <td></td>
          <td>blogs created</td>
        </tr>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
}

export default UserList