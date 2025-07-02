require('dotenv').config()
const express = require('express')
const Person = require('./models/person')
const app = express()

app.use(express.json())

let people = []

app.get('/', (request, response) => {
  response.send('<h1>This is the root directory</h1>')
})

app.get('/api/people', (request, response, next) => {
  Person.find({})
    .then(listOfPeople => {
      response.json(listOfPeople)
    })
    .catch(error => next(error))
})

app.get('/api/people/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(personOfInterest => {
      if (personOfInterest) {
        response.json(personOfInterest)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/people/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(person => {
      if (person) {
        console.log("Deleting this person: ", person)
        response.status(204).end()
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.post('/api/people', (request, response, next) => {
  console.log("The body of the request object looks like this: ", request.body)

  if (!request.body.name) { 
    return response.status(400).json(
      { error: 'name is missing' }
    )
  }

  else if (!request.body.number) { 
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
    .catch(error => next(error))
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

const unknownEndPoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndPoint)

const errorHandler = (error, request, response, next) => {
  console.log('This is the error', error)
  
  if (error.name === 'CastError') { 
    //CastError could come from the findById() function due to invalid ID format
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    //ValidationError could come from save() function due to data that is being saved not conforming to the rules defined in the Mongoose Schema
    return response.status(400).json({ error: error.message })
  }

  next(error) //Send to Express default error handler
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
