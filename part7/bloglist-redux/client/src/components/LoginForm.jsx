import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { login } from '../reducers/authReducer'
import Notification from './Notification'
import {
  LoginPage,
  StyledHeading,
  StyledInput,
  StyledButton
} from './styledComponents'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await dispatch(login(e.target.username.value, e.target.password.value))
      dispatch(
        setNotification(
          'success',
          `Logged in successfully as '${e.target.username.value}'`
        )
      )
    } catch (error) {
      dispatch(setNotification('error', 'Wrong credentials'))
    }
  }

  return (
    <LoginPage>
      <StyledHeading>Login to application</StyledHeading>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <Notification />
              </td>
            </tr>
            <tr>
              <td>
                <StyledInput
                  name='username'
                  type='text'
                  placeholder='Enter username'
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <StyledInput
                  name='password'
                  type='password'
                  placeholder='Enter password'
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <StyledButton>login</StyledButton>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </LoginPage>
  )
}

export default LoginForm
