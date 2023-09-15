import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { StyledList } from './styledComponents'

const UserInfo = ({ user }) => {
  const blogs = useSelector(state => state.blogs)

  if (!user)
    return <h3><em>loading data...</em></h3>

  const userBlogs = blogs.filter(blog => blog.user.username === user.username)
  
  return (
    <div>
      <h1>{user.name}</h1>
      <h3>Added blogs</h3>
      <StyledList>
        {userBlogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </StyledList>
    </div>
  )
}

export default UserInfo
