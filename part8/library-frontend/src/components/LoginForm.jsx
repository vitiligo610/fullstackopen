import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { LOGIN } from '../queries'
import { useNavigate } from 'react-router-dom'

const LoginForm = ({ setToken, setNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setNotification(`ERROR ${error.graphQLErrors[0].message}`)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      console.error('token halp pls', token)
      setToken(token)
      window.localStorage.setItem('library-user-token', token)
      navigate('/books')
    }
  }, [result.data])

  const handleSubmit = (e) => {
    e.preventDefault()
    login({ variables: { username, password } })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm
