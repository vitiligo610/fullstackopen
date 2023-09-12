import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserInfo = () => {
  const id = useParams().id
  const users = useSelector(state => state.users)
  const user = users.find(user => user.id === String(id))

  if (!user)
    return null

  return (
    <div>
      <h1>{user.name || user.username}</h1>
      <h2>added blogs</h2>
      <ul>
        {user.blogs.map(blog => 
          <li key={blog.id}>{blog.title}</li>  
        )}
      </ul>
    </div>
  )
}

export default UserInfo