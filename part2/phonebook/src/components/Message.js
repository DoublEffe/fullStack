const Message = ({message,error}) =>{
    if (message===''){
        return null
    }
    
    if (error){
        return <p className="messagerror">{message}</p>
    }

    return(
        <p className="message">{message}</p>
    )
}

export default Message