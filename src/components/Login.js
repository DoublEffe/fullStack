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

export default Login