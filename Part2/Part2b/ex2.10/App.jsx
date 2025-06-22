import {useState} from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

    
  const personExists = (name) => persons.some(person => person.name === name)

  const addPerson = (event) => { // Takes in an event because we are handling a form submissio
    event.preventDefault()
    if (personExists(newName)) {
      alert(`${newName} is already added to phonebook`)
      return // Exit the function if the name already exists
    }
    const nameObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(nameObject)) //Creating a new array and adding this new nameObject to it
    setNewName('') // Resetting the input field after submission
    setNewNumber('') // Resetting the input field after submission
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (e) => {
    console.log(e.target.value)
    setNewNumber(e.target.value)
  }

  const handleSearchChange = (e) => {
    console.log(e.target.value)
    setSearchName(e.target.value.toLowerCase())
  }

  const findMatch = (person) => person.name.toLowerCase().includes(searchName)
  

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter searchName={searchName} handleSearchChange={handleSearchChange} />
      </div>
      <h2>Add a new</h2>
      <PersonForm 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange} 
        addPerson={addPerson}
        />
      <h2>Numbers</h2>
        <Persons persons={persons} findMatch={findMatch} />
    </div>
  )
}

export default App