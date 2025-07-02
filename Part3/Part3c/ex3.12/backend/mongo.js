require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URL

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 4) { //if format is [node, mongo.js, {name}, {number}]
    const newPerson = new Person({
        name: process.argv[2],
        number: process.argv[3]
    })
    newPerson.save().then(result => {
        console.log(`added ${newPerson.name} with phonenumber ${newPerson.number} to phonebook`)
        mongoose.connection.close()
    })
}
else if (process.argv.length === 2)  { //format is [node, mongo.js]
    //List out everyone in the phonebook 
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
}
else {
    console.log('You did not key in valid arguments')
    console.log("To see the entire phonebook list, enter 'node mongo.js'")
    console.log("To add a new person, enter 'node mongo.js {name} {number}'. If {name} has a whitespace character, it must be enclosed in double quotes")
    mongoose.connection.close()
}
