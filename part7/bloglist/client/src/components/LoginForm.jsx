import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { login } from '../reducers/authReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

  const username = useField('text')
  const password = useField('password')

  const handleLogin = e => {
    e.preventDefault()
    console.log('logging in with ', username.value, password.value)
    dispatch(login(username.value, password.value))
    username.reset()
    password.reset()
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input name='username' type={username.type} value={username.value} onChange={username.onChange} />
      </div>
      <div>
        password
        <input name='password' type={password.type} value={password.value} onChange={password.onChange} />
      </div>
      <button>login</button>
    </form>
  )
}

export default LoginForm
