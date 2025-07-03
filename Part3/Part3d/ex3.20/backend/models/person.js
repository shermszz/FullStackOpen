const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URL

console.log('connecting to url')
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String, 
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    //This is the Custom Validator, it uses regular expressions 
    validate: {
      validator: function(value) {
        //Check 2 things about value, return true if both things are fulfilled, otherwise false
        //1st: In a regex, determine if the value has the correct format of XX-XXXXXX or XXX-XXXXXx
        //2nd: Determine if value without hypens is 8 digits or more
        return /\d{2,3}-\d+/.test(value) && value.replace('-', '').length >= 8;
        //\d{2, 3} means a digit from (0-9) that can appear 2 times or 3 times
        //- is a literal hypen dash
        //\d+ just means one or more of the digits from (0-9)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: true   
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)