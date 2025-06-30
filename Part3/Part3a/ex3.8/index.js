const express = require('express')

var morgan = require('morgan')

const app = express()

app.use(express.json())

//Create a new token of type 'info', so that we can log this as a middleware to display the body of the request object 
// if the method is a POST, otherwise the info body returns an empty string
morgan.token('info', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : '' //'POST' must be a string in quotes
})

//This is essentially morgan('tiny' + ':info'), but cannot concatenate like that.
//For custom display of logs, must write out the whole thing. 
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :info'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
  ]

const generateId = () => {
  const id = persons.length === 0 
    ? 0
    : String(Math.floor(Math.random() * 10000) + 1)

  return id;
}


app.get('/', (request, response) => {
    response.send('<h1>This is the root directory</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
  const time = new Date()
  console.log(time)
  const countPeople = persons.length

  response.send(
    `<p>Phonebook has info for ${countPeople} people </p>
     <p> ${time} </p>` 
  )
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const personOfInterest = persons.find(person => person.id === id)

  //If id of person does not exist, exit with status 404 Not Found 
  if (!personOfInterest) {
    response.status(404).end()
  } else {
    console.log("This is the person of interest: ", personOfInterest)
    response.json(personOfInterest)
  }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const updatedPhonebook = persons.filter(person => person.id !== id)

    response.json(updatedPhonebook)
    console.log("Person with id " + id + " is deleted")
})

app.post('/api/persons', (request, response) => {
    console.log("The body of the request object looks like this: ", request.body)

    const doesPersonExist = persons.find(person => person.name === request.body.name)

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

    else if (doesPersonExist) { //Person name alrd exists
      return response.status(400).json({
        error: "name must be unique"
      })
    }

    else {
      const newPerson = {
        id: generateId(),
        name: request.body.name,
        number: request.body.number
      }
      
      persons = persons.concat(newPerson)  // Update the persons array
      response.json(persons) 
    }
     
  })


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
