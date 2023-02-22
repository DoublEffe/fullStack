const Message = ({message,error}) =>{
    if (message===''){
        return null
    }
    console.log(error)
    if (error){
        return <p className="messagerror">{message}</p>
    }

    return(
        <p className="message">{message}</p>
    )
}

export default Message