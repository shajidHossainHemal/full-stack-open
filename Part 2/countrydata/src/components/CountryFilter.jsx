const CountryFilter = ({ filter, onSubmit, handleFilterChange }) => {
    return (
        <div>
            find countries <input value={filter}
                                onChange={handleFilterChange} />
        </div>
    )
}

export default CountryFilter