require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

morgan.token('body', (request, response) => {
  JSON.stringify(request.body)
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

app.get('/', (request, response) => {
  response.send('<h1>Phonebook App</h1>')
})

app.get('/info', (request, response) => {
  const date = new Date().toString()
  Person.find({})
    .then((persons) => {
      response.send(`<p>Phonebook has info for ${persons.length} people.<br /> ${date}</p>`)
    })
})

app.get('/api/persons', (request, response) => {
  Person.find({})
    .then((persons) => {
      response.send(persons)
      console.log('-----------------------------------\nPhonebook:\n----------')
      persons.forEach((person) => {
        console.log(`${person.name} ${person.number}`)
      })
      console.log('-----------------------------------')
    })
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)

  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      response.status(404).send({ error: 'malformatted id' })
    })
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  Person.find({})
    .then((persons) => {
      const names = persons.map((person) => person.name)

      if (!body.name || !body.number) {
        return response.status(400).json({
          error: 'Name or phone number is missing',
        })
      }

      if (names.includes(body.name)) {
        return response.status(400).json({
          error: 'Name must be unique',
        })
      }

      const person = new Person({
        name: body.name,
        number: body.number,
      })

      person
        .save()
        .then(savedPerson => {
          response.json(savedPerson)
          console.log('person added', savedPerson)
        })
        .catch((error) => {
          console.log(error)
          response.status(500).end()
        })
    })
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => {next(error);console.log(error)})
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
})

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(404).send({ error: 'malformed id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log('Server is up and running')
})
