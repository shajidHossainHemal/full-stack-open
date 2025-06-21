const Persons = ({ filterPersons }) => {
  return(
    <li>
      {filterPersons.map(person => <Person key={person.id} person={person}/>)}
    </li>
  )
}

const Person = ({ person }) => <p>{person.name} {person.number}</p>

export default Persons