import { useState, useEffect } from 'react'
import getAllCountries from './services/countries'
import CountryFilter from './components/CountryFilter'
import FilterResult from './components/FilterResult'

function App() {
  const [filter, setFilter] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    getAllCountries().then(allCountries => {
      setAllCountries(allCountries)
    })
  }, [])

  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    const countries = newFilter.trim().length === 0 ?
      allCountries : allCountries.filter(country =>
        country.name.common
          .toLowerCase()
          .includes(newFilter.trim().toLowerCase())
      )
    setFilter(newFilter)
    setFilteredCountries(countries)
  }

  const onCountrySelection = (country) => {
    setFilteredCountries([country])
  }

  return (
    <div>
      <CountryFilter filter={filter}
        handleFilterChange={handleFilterChange} />
      <FilterResult countries={filteredCountries}
        onCountrySelection={onCountrySelection} />
    </div>
  )
}

export default App
