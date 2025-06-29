import Countries from "./Countries"
import Country from "./Country"

const FilterResult = ({ countries, onCountrySelection }) => {
    if (countries.length > 10)
    {
        return <p>Too many matches, specify another filter</p>
    }

    if (countries.length > 1 && countries.length <= 10)
    {
        return <Countries countries={countries} onCountrySelection={onCountrySelection} />
    }

    if(countries.length === 1) {
        return <Country country={countries[0]}/>
    }

    return <p>No matches</p>
}

export default FilterResult