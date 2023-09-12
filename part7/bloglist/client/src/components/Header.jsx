import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/authReducer'

const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const padding = {
    padding: 5
  }

  return (
    <div>
      <Link to='/' style={padding}>home</Link>
      <Link to='/users' style={padding}>users</Link>
      <em>{user.name || user.username} logged in &nbsp;</em>
      <button onClick={() => dispatch(logout())}>log out</button>
    </div>
  )
}

export default Header