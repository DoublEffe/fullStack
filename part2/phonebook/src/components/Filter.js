import Number from "./Number"

const Filter =({filter,handler,persons,handlerdelete}) =>{
    let filtration = (person)=>{
      return person.name===filter ? true : false
    }
    let filtered=persons.filter(filtration)
    if (filtered[0]){
      return <Number key={filtered[0].id} persons={filtered} handlerdelete={handlerdelete}/>
    }
    return(
      <div>
        filter shown with <input value={filter} onChange={handler} />
        
      </div>
    )
  }

  export default Filter