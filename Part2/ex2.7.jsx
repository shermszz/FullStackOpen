import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      id: 1,
      name: 'Arto Hellas'
    }
  ])
  const [newName, setNewName] = useState('')
    
  const personExists = (name) => persons.some(person => person.name === name)

  const addName = (event) => { // Takes in an event because we are handling a form submissio
    event.preventDefault()
    if (personExists(newName)) {
      alert(`${newName} is already added to phonebook`)
      return // Exit the function if the name already exists
    }
    const nameObject = {
      name: newName,
      id: persons.length + 1
    }
    setPersons(persons.concat(nameObject)) //Creating a new array and adding this new nameObject to it
    setNewName('') // Resetting the input field after submission
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        <p key={person.id}>
          {person.name}
        </p>
      )}
    </div>
  )
}

export default App