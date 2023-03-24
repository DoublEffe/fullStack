const Message = ({ success,error }) => {
    return(
        <div>
            { success !=null && <p className="message" >{ success }</p> }
            { error !=null && <p className="messagerror" >{ error }</p> }
        </div>
    )
}

export default Message