import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import userServices from './services/login'
import Login from './components/Login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUserName] = useState('')
  const [password, setPassWord] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleUserName = (event) => {
    event.preventDefault()
    setUserName(event.target.value)
  }

  const handlePwd = (event) => {
    event.preventDefault()
    setPassWord(event.target.value)
  }
  
  const handleLogin =async (event) => {
    event.preventDefault()
    const user = await userServices.login({ username,password })
    setUser(user)
    setUserName('')
    setPassWord('')
  }

  return (
    <div>
      { user === null && <Login handlerName={ handleUserName } handlerPwd={ handlePwd } onLogin={ handleLogin } username={ username } password={ password } /> }
      { user != null && 
      <div>
        <h2>blogs</h2>
        <p>{ user.username } logged in</p>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog}/>
        )}
      </div>}
      
    </div>
  )
}

export default App