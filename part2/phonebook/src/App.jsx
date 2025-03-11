import { useState, useEffect } from 'react'
import axios from 'axios'
import personServices from './services/person'

const Person = ({ person, deletePerson }) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={deletePerson}>delete</button>
    </div>
  )
}

const Filter = ({filterName, setFilterName}) => {
  return (
    <>
      filter shown with
      <input value={filterName} onChange={(e) => setFilterName(e.target.value)}/>
    </>
  )
}

const PersonForm = ({onSubmit, newName, setNewName, newNumber, setNewNumber}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName} onChange={(e) => setNewName(e.target.value)}/>
        number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}
const Persons = ({ persons, deletePerson }) => {
  return (
    <>
      {persons.map((person) => (<Person key={person.name} person={person} deletePerson={() => deletePerson(person.id)}/>))}
    </>
  )
}
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filterName, setFilterName] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    personServices
      .getAll()
      .then( allPersons => {
        setPersons(allPersons)
      })
  }, [])

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`delete ${person.name}`)){
      personServices
        .remove(id)
        .then(returnedPerson => {
          setPersons(persons.filter(person => person.id !==id))
        })
    }
  }

  const addPerson = (e) => {
    e.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const names = persons.map((person) => person.name)

    if (names.indexOf(newName) === -1){
      personServices
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
    else {
      if (window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)){
        const personToUpdate = persons[names.indexOf(newName)]
        personServices
          .update(personToUpdate.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
      }
    }
  }

  const filterNameLowerCase = filterName.toLowerCase()
  const filteredPersons = persons.filter(({name}) => name.toLowerCase().includes(filterNameLowerCase))

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter filterName={filterName} setFilterName={setFilterName}/>
      <h2>Add a new</h2>
        <PersonForm onSubmit={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber = {setNewNumber} />
      <h2>Numbers</h2>
        <Persons persons={filteredPersons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App