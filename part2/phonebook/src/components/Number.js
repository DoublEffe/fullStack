const Number = ({persons, handlerdelete}) =>{
    return(
      <div>
      {persons.map(
        person=>{
        return(
          <><p key={person.name}>{person.name} {person.number}</p>
          <button key={person.id} onClick={handlerdelete(person.id)}>delete</button></>
        )}
      )}
      </div>
    )
  }

  export default Number