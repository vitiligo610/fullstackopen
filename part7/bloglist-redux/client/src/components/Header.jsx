import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/authReducer'
import { Link } from 'react-router-dom'

const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLogout = () => dispatch(logout())

  const padding = {
    padding: 5
  }

  const headerStyle = {
    backgroundColor: 'lightgray',
    padding: 5
  }

  return (
    <header style={headerStyle}>
      <Link to='/' style={padding}>blogs</Link>
      <Link to='/users' style={padding}>users</Link>
      <em style={padding}>{user.name || user.username} logged in &nbsp;</em>
      <button onClick={handleLogout}>log out</button>
    </header>
  )
}

export default Header