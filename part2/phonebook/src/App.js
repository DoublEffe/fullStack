import { useState } from 'react'
import Filter from './components/Filter'
import Number from './components/Number'
import PersonForm from './components/PersonForm'

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
      
      <Filter filter={newFilter} 
              handler={handleNewFilter}   
              persons={persons} />
      
      <h2>add a new</h2>

      < PersonForm onsubmit={addNumber}
                  name={newName}
                  number={newNumber}
                  handlerperson={handleNewPerson}
                  handlernumber={handleNewNumber} />
      <h2>Numbers</h2>

      <Number persons={persons}/>
    </div>
  )
}

export default App