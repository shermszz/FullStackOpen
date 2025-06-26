const express = require('express')
const app = express()

app.use(express.json())

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


app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
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


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
