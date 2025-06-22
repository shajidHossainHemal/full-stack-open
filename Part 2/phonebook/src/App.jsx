import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [filterPersons, setFilteredPersons] = useState(persons)

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
        setFilteredPersons(response.data)
      })
  }

  useEffect(hook, [])
  console.log('render', persons.length, 'notes')

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
