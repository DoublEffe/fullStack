import { useState } from "react"

const BlogForm = ({ onCreate }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        onCreate({
            title: title,
            author: author,
            url: url 
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return(
        <div>
            <form onSubmit={ addBlog } >
                <div>
                title: <input type='text' value={ title } onChange={ event => setTitle(event.target.value) } />
                </div>
                <div>
                author: <input type='text' value={ author } onChange={ event => setAuthor(event.target.value) } />
                </div>
                <div>
                url: <input type='text'value={ url } onChange={ event => setUrl(event.target.value) } />
                </div>
                <div>
                <button type="submit" >create</button>
                </div>
            </form>
        </div>
    )
}

export default BlogForm