import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchKeyword, setSearchKeyword] = useState('')

  const hook = () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }
  useEffect(hook, [])

  const addNewName = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    const result = persons.find(person =>
      person.name === personObject.name.trim()
    )

    if (result)
    {
      if(window.confirm(
        `${personObject.name} is already added to phonebook, replace the old number with a new one?`
      )) {
        personService
          .update(result.id, personObject)
          .then(updatedPerson => {
            setPersons(prevPersons => 
              prevPersons.map(person => 
                person.id !== updatedPerson.id ? person : updatedPerson
              )
            )
            setNewName('')
            setNewNumber('')
          })
      }
      else {
        return
      }
    }
    else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
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
  }

  const handleDeleteOperation = (person) => {
    console.log(`Delete ${person.name} from phonebook records.`)
    if(window.confirm(`Delete ${person.name}`))
    {
      console.log(`Delete confirmed.`)
      personService
        .remove(person.id)
        .then(removedPerson => {
          setPersons(persons.filter(person => person.id !== removedPerson.id))
        })
    }
    else
    {
      console.log(`Delete operation aborted.`)
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
      <Persons searchKeyword={searchKeyword}
               allPersons={persons}
               handleRemove={handleDeleteOperation} />
    </div>
  )
}

export default App
