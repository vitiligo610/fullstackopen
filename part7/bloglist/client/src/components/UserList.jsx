import { useSelector } from 'react-redux'
import User from './User'

const UserList = () => {
  const users = useSelector(state => state.users)
  console.log(users)
  return (
    <div>
      <h2>users</h2>
      <table width="300px">
        <tbody>
          <tr>
            <td></td>
            <td><b>blogs created</b></td>
          </tr>
          {users.map(user => (
            <tr key={user.id} ><User user={user} /></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList