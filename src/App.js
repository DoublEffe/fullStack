import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Message from './components/Message'
import blogService from './services/blogs'
import userServices from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUserName] = useState('')
  const [password, setPassWord] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [success, setSucces] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if(loggedUser){
      const user = JSON.parse(loggedUser)
      setUser(user)
    }
  },[])

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
    try{
      const user = await userServices.login({ username,password })
      window.localStorage.setItem('loggedUser',JSON.stringify(user))
      setUser(user)
      setSucces('succesfully logged in')
      setTimeout(() => {
        setSucces(null)
      }, 5000)
    }catch(e){
      setError('wrong credentials')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
    setUserName('')
    setPassWord('')
  }

  const handleLogOut = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    setSucces('succesfully logged out')
    setTimeout(() => {
      setSucces(null)
    }, 5000)
  }

  const handleTitle = (event) => {
    event.preventDefault()
    setTitle(event.target.value)
  }

  const handleAuthor = (event) => {
    event.preventDefault()
    setAuthor(event.target.value)
  }

  const handleUrl = (event) => {
    event.preventDefault()
    setUrl(event.target.value)
  }
  
  const handleNewBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url 
    }
    try{
      await blogService.newBlog(newBlog,user.token)
    }catch(e){
      setError('must provide title,author and url')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
    setTitle('')
    setAuthor('')
    setUrl('')
    setSucces(`a new blog ${title} by ${author}`)
    setTimeout(() => {
      setSucces(null)
    }, 5000)
  }

  return (
    <div>
      <div><Message success={ success } error={ error } /></div>
      { user === null && <Login handlerName={ handleUserName } handlerPwd={ handlePwd } onLogin={ handleLogin } username={ username } password={ password } /> }
      { user != null && 
      <div>
        
        <p>{ user.username } logged in</p>
        <button onClick={ handleLogOut }>Log out</button>
        <h2>create new</h2>
        <BlogForm title={ title } author={ author } url={ url } handlerTitle={handleTitle} handlerAuthor={handleAuthor} handlerUrl={handleUrl} onCreate={handleNewBlog} />
        <h2>blogs</h2>
        {blogs.map(blog =>
          <BlogList key={blog.id} blog={blog}/>
        )}
      </div>}
      
    </div>
  )
}

export default App