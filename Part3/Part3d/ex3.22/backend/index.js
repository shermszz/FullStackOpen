require('dotenv').config()
const express = require('express')
const Person = require('./models/person')
const app = express()

// Immediate MongoDB connection verification
console.log('Starting application...')
console.log('NODE_ENV:', process.env.NODE_ENV)
console.log('MONGODB_URL:', process.env.MONGODB_URL ? 'is set' : 'is NOT set')
if (!process.env.MONGODB_URL) {
  console.error('MONGODB_URL is not set! Application will not work correctly.')
}

// Middleware order is important!
app.use(express.static('dist'))  // Serve static files first
app.use(express.json())          // Then parse JSON

// requestLogger middleware
app.use((request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
})

app.get('/', (request, response) => {
  response.send('<h1>This is the root directory</h1>')
})

app.get('/api/persons', (request, response, next) => {
  console.log('Fetching all persons...')
  Person.find({})
    .then(listOfPeople => {
      console.log('Found persons:', listOfPeople)
      response.json(listOfPeople)
    })
    .catch(error => {
      console.error('Error fetching persons:', error)
      next(error)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
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

app.get('/info', (request, response, next) => {
  const time = new Date()
  Person.countDocuments({}).then(count => {
    response.send(
      `<p>Phonebook has info for ${count} people</p>
      <p>${time}</p>`
    )
  })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(person => {
      if (person) {
        console.log('Deleting this person: ', person)
        response.status(204).end()
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  console.log('The body of the request object looks like this: ', request.body)

  if (!request.body.name) {
    return response.status(400).json(
      { error: 'Name is missing' }
    )
  }

  else if (!request.body.number) {
    return response.status(400).json({
      error: 'Phone number is missing'
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

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body
  //findByIdAndUpdate(id, updateObject, options)
  //new: true returns the updated document instead of the original one
  //runValidators: true runs the validators after the update operation
  Person.findByIdAndUpdate(request.params.id, { name, number },{ new: true, runValidators: true })
    .then(person => {
      if (!person) {
        return response.status(404).send({ error: 'person not found' })
      }
      response.json(person)  // Return the MongoDB document directly
    })
    .catch(error => next(error))
})

const unknownEndPoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndPoint)

const errorHandler = (error, request, response, next) => {
  console.log('This is the error', error)

  if (error.name === 'CastError') {
    //CastError could come from the findById() / findByIdAndDelete() / findByIdAndUpdate() function due to invalid ID format
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    //ValidationError could come from save() function due to data that is being saved not conforming to the rules defined in the Mongoose Schema'
    //ValidationError could also come from the validator failure in the personSchema.
    return response.status(400).json({ error: error.message })
  }

  next(error) //Send to Express default error handler
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log('Environment:', process.env.NODE_ENV || 'development')
  console.log('MongoDB URL status:', process.env.MONGODB_URL ? 'is set' : 'is NOT set')
})
