require('dotenv').config()
const express = require('express')
const Person = require('./models/person')
const app = express()

app.use(express.json())

let people = []

app.get('/', (request, response) => {
    response.send('<h1>This is the root directory</h1>')
})

app.get('/api/people', (request, response) => {
  Person.find({}).then(listOfPeople => {
    response.json(listOfPeople)
  })
})

app.get('/api/people/:id', (request, response) => {
  Person.findById(request.params.id).then(personOfInterest => {
    response.json(personOfInterest)
  })
})

app.delete('/api/people/:id', (request, response) => {
    const id = request.params.id
    const updatedPhonebook = people.filter(person => person.id !== id)

    response.json(updatedPhonebook)
    console.log("Person with id " + id + " is deleted from the browser, BUT NOT on the DATABASE YET")
})

app.post('/api/people', (request, response) => {
    console.log("The body of the request object looks like this: ", request.body)

    if (!request.body.name) { //Missing Name
      return response.status(400).json(
        {error: 'name is missing'}
      )
    }
    
    else if (!request.body.number) { //Missing Number
      return response.status(400).json({
        error: 'number is missing'
      })
    }

    else {
      const newPerson = new Person({
        name: request.body.name,
        number: request.body.number
      })
      
      newPerson.save().then(savedPerson => {
        response.json(savedPerson)
      })
    }
     
  })
  
  app.put('/api/people/:id', (request, response) => {
    const id = request.params.id
    const body = request.body

    const person = people.find(p => p.id === id)
    if (!person) {
        return response.status(404).json({
            error: 'person not found'
        })
    }

    const updatedPerson = {
        ...people,
        number: body.number
    }

    persons = people.map(p => p.id === id ? updatedPerson : p)
    response.json(updatedPerson)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
