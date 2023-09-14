import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { login } from '../reducers/authReducer'
import Notification from './Notification'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await dispatch(login(e.target.username.value, e.target.password.value))
      dispatch(setNotification('success', `logged in successfully as ${e.target.username.value}`))
    } catch (error) {
      dispatch(setNotification('error', 'Wrong credentials'))
    }
  }

  return (
    <div>
      <h2>Login to application</h2>
      <Notification />
      <form onSubmit={handleSubmit}>
        <div>
          username: {' '}
          <input
            name='username'
            type='text'
            required
          />
        </div>
        <div>
          password: {' '}
          <input
            name='password'
            type='password'
            required
          />
        </div>
        <button>login</button>
      </form>
    </div>
  )
}

export default LoginForm
