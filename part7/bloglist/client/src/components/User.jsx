import { Link } from 'react-router-dom'

const UserInfo = () => {
  
}

const User = ({ user }) => {
  return (
    <>
      <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
      <td>{user.blogs.length}</td>
    </>
  )
}

export default User