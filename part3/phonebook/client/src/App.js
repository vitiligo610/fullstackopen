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
  const [newNumber, setNewNumber] = useState('')
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
    
    const personObject = {
      name: newName,
      number: newNumber
    }

    const names = persons.map(p => p.name)
    const existingPerson = persons.find(p => p.name === newName)
    if (names.includes(newName)) {
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with the new one?`)) {
        const changedPerson = { ...existingPerson, number: newNumber }
        personService
          .updatePerson(existingPerson.id, changedPerson)
          .then(updatedPerson => {
            setPersons(persons.map(p => (p.id !== existingPerson.id ? p : updatedPerson)))
            setNewName('')
            setNewNumber('')
            setMessage(`${newName} was successfully updated.`)
            setTimeout(() => setMessage(null), 5000)
          })
      }
    } else {
      personService
        .createPerson(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage(`${newName} was successfully added.`)
          setTimeout(() => setMessage(null), 5000)
        })
        .catch(error => {
          setMessage(`[ERROR] ${error.response.data.error}`)
          setTimeout(() => setMessage(null), 5000)
          console.log(error.response.data.error)
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
        newNumber={newNumber}
        handleNameChange={handleChange(setNewName)}
        handleNumberChange={handleChange(setNewNumber)}
      />
      <Persons persons={persons} query={filterQuery} del={deletePerson} />
    </div>
  )
}

export default App
