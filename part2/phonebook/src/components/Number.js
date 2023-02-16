const Number = ({persons, handlerdelete}) =>{
    return(
      <div>
      {persons.map(
        person=>{
        return(
          <div key={person.id}><p >{person.name} {person.number}</p>
          <button onClick={handlerdelete(person.id)}>delete</button></div>
        )}
      )}
      </div>
    )
  }

  export default Number