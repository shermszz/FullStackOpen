import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'
import personServices from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    personServices.getAll()
                .then(initialData => {
                  console.log(initialData)
                  setPersons(initialData)
                })
  }, []) //this runs only after the first mount
    
  const personExists = (name) => persons.some(person => person.name === name)

  const addPerson = (event) => { 
    event.preventDefault()
    if (personExists(newName)) {
      alert(`${newName} is already added to phonebook`)
      return // Exit the function if the name already exists
    }
    const personObject = {
      name: newName,
      number: newNumber
    }
    personServices.create(personObject)
                .then(data => {
                  console.log(data)
                  setPersons(persons.concat(data))
                  setNewName('')
                  setNewNumber('')
                })
        
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
        <p>filter shown with <input value={searchName} onChange={handleSearchChange}/></p>
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {/* If input string matches any part of a person's name, show that person's details */}
        {persons.filter(findMatch) // returns the filtered array of persons
          .map(filteredPerson => {
            return (
              <p key={filteredPerson.id}>
               {filteredPerson.name} {filteredPerson.number}
              </p>
            )
         })}
    </div>
  )
}

export default App