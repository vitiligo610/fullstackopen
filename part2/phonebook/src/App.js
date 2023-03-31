import React from 'react'
import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import Persons from './components/Persons'
import AddPerson from './components/AddPerson'
import Message from './components/Message'

const App = () => {
  const [persons, setPersons] = useState([])
      
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterQuery, setFilterQuery] = useState('')
  const [message, setMessage] = useState(null)

  const hook = () => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }

  useEffect(hook, [])

  const handleChange = changeValue => e => changeValue(e.target.value)

  const addPerson = e => {
    e.preventDefault()
    
    const nameObject = {
      name: newName,
      phone: newPhone
    }
    const names = persons.map(p => p.name)
    if (names.includes(newName)) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      personService
        .createPerson(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewPhone('')
          setMessage(`${newName} was successfully added.`)
          setTimeout(() => setMessage(null), 5000)
        })
        .catch(error => {
          setMessage(`[ERROR] ${error.response.data.error}`)
          setTimeout(() => setMessage(null), 5000)
          console.log(error.response.data)
        })
      }
    }
  

  const deletePerson = id => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete "${person.name}"?`)) {
      personService
        .deletePerson(id)
        .then(() => setPersons(persons.filter(p => p.id !== id)))
      setMessage(`${person.name} was successfully deleted.`)
      setTimeout(() => setMessage(null), 5000)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} />
      <Filter value={filterQuery} onChange={handleChange(setFilterQuery)} />
      <AddPerson
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleChange(setNewName)}
        newPhone={newPhone}
        handlePhoneChange={handleChange(setNewPhone)}
      />
      <Persons persons={persons} query={filterQuery} del={deletePerson} />
    </div>
  )
}

export default App
