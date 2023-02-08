import { useState,useEffect } from 'react'

import Filter from './components/Filter'
import Number from './components/Number'
import PersonForm from './components/PersonForm'
import Message from './components/Message'
import numbersService from './services/numbersService'

const App = () => {
  let error=false
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState('')

  useEffect(()=>{
    numbersService.getAll()
    .then(numbers=>setPersons(numbers))
  },[persons])

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
          error=true
          setMessage(`${newName} was already deleted`)
          setTimeout(()=>setMessage(''),5000)
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
    setMessage(`${newName} added`)
    setTimeout(()=>setMessage(''),5000)
  }
  

  }

  const deleteNumber = (id)=>() =>{
   
    let numbertodelete=persons.find(person=>person.id===id)
    
    let checkdel=window.confirm(`Do you want delete ${numbertodelete.name}`)
    if (checkdel){
      numbersService.cancel(id)
      .then(deleted=>console.log(deleted))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} error={error} />
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

      <Number persons={persons} handlerdelete={deleteNumber}/>
      
    </div>
  )
}

export default App