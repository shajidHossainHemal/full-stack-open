const Persons = ({ searchKeyword, allPersons, handleRemove }) => {
  const filteredPersons = () => {
    return allPersons.filter((person) =>
      person.name.toLowerCase().includes(searchKeyword.toLowerCase().trim())
    )
  }

  const persons = searchKeyword.trim().length == 0 ? allPersons : filteredPersons()

  return (
    <li>
      {persons.map(person => (
        <Person key={person.id} person={person} handleRemove={handleRemove} />
      ))}
    </li>
  )
}

const Person = ({ person, handleRemove }) => (
  <div>
    {person.name} {person.number} <button onClick={() => handleRemove(person)}>delete</button>
  </div>
)

export default Persons