import { useState,useEffect } from 'react'

import Filter from './components/Filter'
import Number from './components/Number'
import PersonForm from './components/PersonForm'
import Message from './components/Message'
import numbersService from './services/numbersService'

const App = () => {
  
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState('')
  const [checkerror, setError] = useState(false)

  useEffect(()=>{
    numbersService.getAll()
    .then(numbers=>setPersons(numbers))
    
  },[persons.length])

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
    let persontoupdate=persons.find(person=>person.name===newName)
    if (persontoupdate){
      setNewName('')
      if (window.confirm(`${newName} already exist do you want to update the number?`)){
        numbersService.update(persontoupdate.id,number)
        .then(updated=>{console.log(updated);setNewNumber('')})
        .catch(error=>{
          setError(true)
          setMessage(`${newName} was already deleted`)
          setTimeout(()=>setMessage(''),5000)
          setNewName('')
          setNewNumber('')
        })
        
      }
    }
    else{
    numbersService.create(number)
    .then(returnedNumber=>{
      setPersons(persons.concat(returnedNumber))
      setNewName('')
      setNewNumber('')
    })
    .catch(error=>{
                setError(true)
              setMessage(error.response.data.error)
              setNewName('')
              setNewNumber('')})
    setMessage(`${newName} added`)
    setTimeout(()=>setMessage(''),5000)
  }
  

  }

  const deleteNumber = (id)=>() =>{
   
    let numbertodelete=persons.find(person=>person.id===id)
    let update=persons.filter(person=>person.name!==numbertodelete.name)
    let checkdel=window.confirm(`Do you want delete ${numbertodelete.name}`)
    if (checkdel){
      numbersService.cancel(id)
      .then(deleted=>setPersons(persons.concat(update)))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} error={checkerror} />
      <Filter filter={newFilter} 
              handler={handleNewFilter}   
              persons={persons}
              handlerdelete={deleteNumber} />
      
      <h2>add a new</h2>

      < PersonForm onsubmit={addNumber}
                  name={newName}
                  number={newNumber}
                  handlerperson={handleNewPerson}
                  handlernumber={handleNewNumber} />
      <h2>Numbers</h2>

      <Number persons={persons} handlerdelete={deleteNumber}/>
      
    </div>
  )
}

export default App