import { useState } from 'react'

const Number = ({name,number}) =>{
  return(
    <p>{name} {number}</p>
  )
}

const Filter =({filter,handler,persons}) =>{
  const filtration = (person)=>{
    return person.name===filter ? true : false
  }
  console.log(persons.filter(filtration))
  return(
    <div>
      filter shown with <input value={filter} onChange={handler} />
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-1234567'
    },
    {
      name: 'Ada Lovelace',
      number: '39-44-5323523'
    },
    {
      name: 'Dan Abramov',
      number: '12-43-234345'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleNewFilter = (event) => {
    event.preventDefault()
    setNewFilter(event.target.value)
  }

  const handleNewPerson = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  const addNumber = (event) => {
    event.preventDefault()
    const number = {
      name:newName,
      number:newNumber,
    }
    if (persons.find(person=>person.name===newName)){
      setNewName('')
      return alert(`${newName} already exist`)
    }
    setPersons(persons.concat(number))
    setNewName('')
    setNewNumber('')

  }

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter filter={newFilter} handler={handleNewFilter} persons={persons} />
      
      <h2>add a new</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input value={newName} onChange={handleNewPerson} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person=><Number key={person.name} name={person.name} number={person.number}/>)}
    </div>
  )
}

export default App