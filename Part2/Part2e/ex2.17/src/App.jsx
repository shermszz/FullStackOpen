import React from 'react'
import axios from 'axios'
import './index.css'
import {useState, useEffect} from 'react'
import personServices from './services/persons'
import Filter from '../components/Filter'
import PersonForm from '../components/PersonForm'
import Persons from '../components/Persons'
import Notification from "../components/Notification"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [notification, setNotification] = useState(null)
  const [error, setErrorMessage] = useState(null)

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
    //If person exists and input Number also exists, alert the user 
    const existingPerson = persons.find(person => person.name === newName)
    if (personExists(newName) && newNumber === existingPerson.number) {
      alert(`${newName} already exists in the phonebook with exactly the same credentials`)
      setNewName('')
      setNewNumber('')
    }
    //Else if the person exists BUT number is different, allow user to change the number
    else if (personExists(newName) && newNumber !== existingPerson.number) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        console.log('The old number was: ' + existingPerson.number)
        const updatePersonNumber = {
          name: newName,
          number: newNumber
        }
        personServices
          .update(existingPerson.id, updatePersonNumber)
          .then(newData => {
            console.log('The new number is now: ' + newData.number)
            setPersons(persons.map(person => person.id === existingPerson.id ? newData : person))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            console.log("An error occured when you tried to add something")
            setErrorMessage('Information of ' + `${newName}` + ' has already been removed from server')
            setTimeout(() => setErrorMessage(null), 3000)
            setPersons(persons.filter(p => p.id !== existingPerson.id))
          })
      }
      return // Exit the function if the name already exists
    } 
    //Otherwise, the person does not exist in phonebook, so we add them in
    else {
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
                      setNotification('Added ' + newName) //once added, display a notification in green of the person's name
                      setTimeout(() => setNotification(null), 3000) //The message will last for 3 seconds
        })
        
      }
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
      <Notification message={notification} type="ok" />
      <Notification message={error} type="error" />
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