import { useState } from 'react'

const BlogList = ({ blog,onUpdate,user,onDelete }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const handleLikes = (event) => {
    event.preventDefault()
    onUpdate({
      title:blog.title,
      url:blog.url,
      author:blog.author,
      likes:blog.likes+1
    },blog.id)
  }

  let showDelete = { display:'none' }


/*
  if( user.username === blog.user.username){
    console.log('pp')
    showDelete = { dispaly: '' }
  }
*/
  const handleDelete = (event) => {
    event.preventDefault()
    if(window.confirm(`Remove blog ${ blog.title } by ${ blog.author }`)){
      onDelete(blog.id)
    }
  }


  return(
    <div className="list" >
      <div className="blog-list" style={ hideWhenVisible }>
        {blog.title} by {blog.author}
        <button onClick={ toggleVisibility } id='show' >show</button>
      </div>
      <div className="blog-list-visible" style={ showWhenVisible } >
        <p>Title: {blog.title}</p>
        <p>{ blog.url }</p>
        <p>Likes: { blog.likes }<button onClick={ handleLikes }>like</button></p>
        <p>Written by: { blog.author }</p>
        <button onClick={ toggleVisibility } >hide</button>
        <button style={ showDelete } onClick={ handleDelete } >delete</button>
      </div>
    </div>
  )
}

export default BlogList