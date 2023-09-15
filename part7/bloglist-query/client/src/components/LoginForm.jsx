const LoginForm = ({ username, password, handleUsernameChange, handlePasswordChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={handlePasswordChange}
        />
      </div>
      <button>login</button>
    </form>
  )
}

export default LoginForm
