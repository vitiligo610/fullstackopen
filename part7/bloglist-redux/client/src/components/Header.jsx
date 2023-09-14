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
      <Link to='/' style={padding}>home</Link>
      <Link to='/blogs' style={padding}>blogs</Link>
      <Link to='/users' style={padding}>users</Link>
      <em>{user.name || user.username} logged in{' '}</em>
      <button onClick={handleLogout} className='btn btn-primary'>log out</button>
    </header>
  )
}

export default Header