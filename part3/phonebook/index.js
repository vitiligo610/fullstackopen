const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

morgan.token('body', (request, response) => {
  return JSON.stringify(request.body)
})

app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      JSON.stringify(req.body),
    ].join(' ')
  })
)

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

app.get('/', (request, response) => {
  response.send('<h1>Phonebook App</h1>')
})

app.get('/info', (request, response) => {
  Person.find({}).then((persons) => {
    response.send(
      `Phonebook has info for ${
        persons.length
      } people.<br /> ${new Date().toString()}`
    )
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  Person.findById(id).then((person) => {
    response.json(person)
  })
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'Name or number is missing',
    })
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then((savedPerson) => {
      response.json(savedPerson)
      console.log('person saved')
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const { name, number } = request.body
  const person = {
    name: name,
    number: number,
  }
  Person.findByIdAndUpdate(id, { name, number }, { new: true, runValidators: true, context: 'query' })
    .then((updatedPerson) => {
      response.json(updatedPerson)
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  Person.findByIdAndRemove(id).then((person) => {
    console.log('person deleted')
    response.status(204).end()
  })
  persons = persons.filter((person) => person.id !== id)

  response.status(204).end()
})

const unknownEndpoint = (request, response) => {
  console.log('unknownEndpoint middlware')
  response.status(404).send({
    error: 'unknown endpoint',
  })
}
// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.log('errorHanlder middlware')
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({
      error: 'malformatted id',
    })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({
      error: error.message
    })
  }

  next(error)
}
// handler of requests with wrong id
app.use(errorHandler)

const PORT = 3001
app.listen(PORT, () => {
  console.log('server is up and running on port', PORT)
})
