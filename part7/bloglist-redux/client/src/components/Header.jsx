import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/authReducer'
import { StyledHeader, StyledNavLink, StyledNavButton } from './styledComponents'

const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleLogout = () => dispatch(logout())

  return (
    <StyledHeader>
      <div>
        <StyledNavLink to='/'>
          home
        </StyledNavLink>
        <StyledNavLink to='/blogs'>
          blogs
        </StyledNavLink>
        <StyledNavLink to='/users'>
          users
        </StyledNavLink>
      </div>
      <div>
        <em>{user.name || user.username} logged in </em>
        <StyledNavButton onClick={handleLogout}>
          logout
        </StyledNavButton>
      </div>
    </StyledHeader>
  )
}

export default Header
