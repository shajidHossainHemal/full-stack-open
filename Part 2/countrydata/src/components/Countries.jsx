const Countries = ({ countries, onCountrySelection }) => {
    return countries.map(country => (
        <div key={country.name.common}>
            {country.name.common} <button
                onClick={() => onCountrySelection(country)}>
                Show
            </button>
        </div>
    ))
}

export default Countries