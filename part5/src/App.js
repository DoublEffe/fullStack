import { useState, useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Toggable'
import Message from './components/Message'
import blogService from './services/blogs'
import userServices from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUserName] = useState('')
  const [password, setPassWord] = useState('')
  const [user, setUser] = useState(null)
  const [success, setSucces] = useState(null)
  const [error, setError] = useState(null)
  const blogFormRef = useRef()

  const orderBlogs = (a,b) => b.likes - a.likes

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort(orderBlogs) )
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

  const handleNewBlog = async (blog) => {
    blogFormRef.current.toggleVisibility()
    try{
      const returnedBlog = await blogService.newBlog(blog,user.token)
      setBlogs(blogs.concat(returnedBlog))
      setSucces(`a new blog ${blog.title} by ${blog.author}`)
      setTimeout(() => {
        setSucces(null)
      }, 5000)
    }catch(e){
      setError('must provide title,author and url')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  const handleUpdatingLikes = async (blog,id) => {
    try{
      await blogService.updateBlog(blog,id)
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs.sort(orderBlogs))
    }
    catch(e){
      console.log(e)
    }
  }

  const handleBlogDelete = async (id) => {
    try{
      await blogService.deleteBlog(id,user.token)
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs.sort(orderBlogs))
    }
    catch(e){
      console.log(e)
    }
  }

  return (
    <div>
      <div><Message success={ success } error={ error } /></div>
      { user === null && <Login handlerName={ handleUserName } handlerPwd={ handlePwd } onLogin={ handleLogin } username={ username } password={ password } /> }
      { user !== null &&
      <div>
        <p>{ user.username } logged in</p>
        <button onClick={ handleLogOut }>Log out</button>
        <h2>create new</h2>
        <Togglable buttonLabel="new blog" ref={ blogFormRef } >
          <BlogForm onCreate={handleNewBlog} />
        </Togglable>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <BlogList key={blog.id} blog={blog} onUpdate={ handleUpdatingLikes } user={ user } onDelete={ handleBlogDelete } />
        )}
      </div>}
    </div>
  )
}

export default App