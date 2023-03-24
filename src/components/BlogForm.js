const BlogForm = ({ title,author,url,handlerTitle,handlerAuthor,handlerUrl,onCreate }) => {
    return(
        <div>
            <form onSubmit={onCreate} >
                <div>
                title: <input type='text' value={ title } onChange={handlerTitle} />
                </div>
                <div>
                author: <input type='text' value={ author } onChange={handlerAuthor} />
                </div>
                <div>
                url: <input type='text'value={ url } onChange={handlerUrl} />
                </div>
                <div>
                <button type="submit" >create</button>
                </div>
            </form>
        </div>
    )
}

export default BlogForm