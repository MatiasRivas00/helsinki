import { useState, useEffect } from 'react'
import axios from 'axios'

const Person = ({ person }) => {
  return (
    <div>{person.name} {person.number}</div>
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
const Persons = ({ persons }) => {
  return (
    <>
      {persons.map((person) => (<Person key={person.name} person={person}/>))}
    </>
  )
}
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filterName, setFilterName] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (e) => {
    e.preventDefault()
    const personObject = {
      name: newName,
      phone: newNumber
    }

    const names = persons.map((person) => person.name)

    if (names.indexOf(newName) === -1){
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
    else {
      alert(`${newName} is already added to phoneboox`)
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
        <Persons persons={filteredPersons}/>
    </div>
  )
}

export default App