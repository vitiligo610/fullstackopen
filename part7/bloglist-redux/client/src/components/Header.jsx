import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/authReducer'
import Notification from './Notification'

const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLogout = () => dispatch(logout())

  const padding = {
    padding: 5
  }

  return (
    <header>
      <h2>Blogs</h2>
      <Notification />
      <p><em>{user.name || user.username} logged in &nbsp;</em></p>
      <button onClick={handleLogout}>log out</button>
    </header>
  )
}

export default Header