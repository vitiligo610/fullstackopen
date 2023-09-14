import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { login } from '../reducers/authReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

  const username = useField('text')
  const password = useField('password')

  const handleSubmit = e => {
    e.preventDefault()
    try {
      dispatch(login(username.value, password.value))
      dispatch(setNotification('success', `logged in successfully as ${username.value}`))
    } catch (error) {
      dispatch(setNotification('error', 'Wrong credentials'))
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input
          name='username'
          type={username.type}
          value={username.value}
          onChange={username.onChange}
        />
      </div>
      <div>
        password
        <input
          name='password'
          type={password.type}
          value={password.value}
          onChange={password.onChange}
        />
      </div>
      <button>login</button>
    </form>
  )
}

export default LoginForm
