import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { login } from '../reducers/userReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

  const username = useField('text')
  const password = useField('password')

  const handleLogin = e => {
    e.preventDefault()
    console.log('logging in with ', username.value, password.value)
    dispatch(login(username.value, password.value))
    // username.reset()
    // password.reset()
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input {...username} />
      </div>
      <div>
        password
        <input {...password} />
      </div>
      <button>login</button>
    </form>
  )
}

export default LoginForm
