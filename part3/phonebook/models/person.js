require('dotenv').config()
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// mongoose-unique-validator is not compatible with mongoose 7.x yet. It is expected to update soon.

mongoose.set('strictQuery', false)

const url = 'mongodb+srv://softwareguild:softwareguild@cluster0.mczfbrg.mongodb.net/?retryWrites=true&w=majority'

console.log('Connecting to', url)

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(result => {
        console.log('Connected to MongoDB')
    })
    .catch(error => {
        console.log('Error connecting to MongoDB: ', error)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLenght: 3,
        required: true,
        unique: true
    },
    number: {
        type: String,
        minLenght: 8,
        required: true
    }
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
