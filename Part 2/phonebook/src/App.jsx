import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [filterPersons, setFilteredPersons] = useState(persons)

  const addNewName = (event) => {
    event.preventDefault()

    const doesNameExist = persons.some(person => person.name === newName)
    if(doesNameExist)
    {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')

    if (searchKeyword === '') {
      console.log('Add new person')
      setFilteredPersons(persons.concat(personObject))
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value)
    console.log(event.target.value)

    if (event.target.value === '')
    {
      console.log('search keyword is empty')
      setFilteredPersons(persons)
    }
    else
    {
      console.log('searching....')
      setFilteredPersons(persons.filter(person =>
        person.name.toLowerCase().includes(event.target.value.toLowerCase())
      ))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onValueChange={handleSearchChange} />
      <h2>add a new</h2>
      <PersonForm name={newName}
                  number={newNumber} 
                  onSubmit={addNewName} 
                  onNameChange={handleNameChange} 
                  onNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons filterPersons={filterPersons}/>
    </div>
  )
}

export default App
