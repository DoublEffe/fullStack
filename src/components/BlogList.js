import { useState } from "react"

const BlogList = ({blog}) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  //console.log(blog.id)
  //
  return(<p>{blog.title} {blog.author}</p>)
  /*
  return(
    <div className="list" >
      <div className="blog-list" style={ hideWhenVisible }>
        {blog.title} {blog.author}
        <button onClick={ toggleVisibility }>show</button>
      </div>
      <div className="blog-list" style={ showWhenVisible } >
        <p>Title: {blog.title}</p>
        <p>{ blog.url }</p>
        <p>Likes: { blog.likes }<button>like</button></p>
        <p>Written by: { blog.author }</p>
        <button onClick={ toggleVisibility } >hide</button>
      </div>
    </div>  
  )*/
}

export default BlogList