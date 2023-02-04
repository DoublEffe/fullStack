import Number from "./components/Number"

const Filter =({filter,handler,persons}) =>{
    let filtration = (person)=>{
      return person.name===filter ? true : false
    }
    let filtered=persons.filter(filtration)
    if (filtered[0]){
      return <Number persons={filtered} />
    }
    return(
      <div>
        filter shown with <input value={filter} onChange={handler} />
        
      </div>
    )
  }

  export default Filter