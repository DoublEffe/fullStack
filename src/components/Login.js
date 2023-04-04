import  PropTypes  from 'prop-types'

const Login = ({ handlerName,handlerPwd,onLogin,username,password }) => {
  return (
    <form onSubmit={ onLogin }>
      <div>
        Username: <input type='text' value={ username } onChange={ handlerName } />
      </div>
      <div>
        Password: <input type='password' value={ password } onChange={ handlerPwd } />
      </div>
      <div>
        <button type='submit'>Login</button>
      </div>
    </form>
  )
}

Login.propTypes = {
  handlerName: PropTypes.func.isRequired,
  handlerPwd: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default Login