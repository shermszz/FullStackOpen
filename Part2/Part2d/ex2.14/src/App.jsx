import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'
import personServices from './services/persons'
import Filter from '../components/Filter'
import PersonForm from '../components/PersonForm'
import Persons from '../components/Persons'

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

  const removeName = (id, name) => {
    console.log('removing person with id ' + id + '. The person\'s name is ' + name)
    if (window.confirm('Delete ' + name +'?')) {
      personServices
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
        console.log('Successfully removed ' + name)
      })
      //Need to handle errors in case server crashes, or if I forgot to start the npm run server
      .catch(error => {
        console.log('Failed to delete because of --> ', error)
        alert(`${name} could not be deleted`)
      })
    }
    
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter searchName={searchName} handleSearchChange={handleSearchChange} />
      </div>
      <h2>add a new</h2>
      <PersonForm { ...{
           newName, newNumber, handleNameChange, handleNumberChange, addPerson
        }
      } />
      <h2>Numbers</h2>
      <Persons {...{
          persons, findMatch, removeName
        }
      }/>
    </div>
  )
}

export default App