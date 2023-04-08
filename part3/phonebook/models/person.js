require('dotenv').config()
const mongoose = require('mongoose')

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
    name: String,
    number: String
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject._v
    }
})

module.exports = mongoose.model('Person', personSchema)
