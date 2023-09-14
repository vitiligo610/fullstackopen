import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/authReducer'

const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLogout = () => dispatch(logout())

  return (
    <header>
      {user.name || user.username} logged in &nbsp;
      <button onClick={handleLogout}>log out</button>
    </header>
  )
}

export default Header