import { useState, useEffect } from 'react'
import countryServices from './services/country'

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name.official}</h1>
      <div>
        <p>Capital {country.capital[0]}</p>
        <p>Area {country.area} </p>
      </div>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`${country.name.official} flag`} />
    </div>
  )
}

const Countries = ({ countries, handleShow }) => {
  const countriesLength = countries.length
  if (countriesLength > 10){
    return <div>Too many matches, specify another filter</div>
  }

  else if (countriesLength === 1) {
    return <Country country={countries[0]} />
  }

  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name.official}>
          {country.name.official}
          <button onClick={handleShow(country)}> show </button>
        </li>
      )
      )}
    </ul>
  )
}

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    countryServices
      .getAll()
      .then((countries) => {
        setCountries(countries)
      })
  }, [])

  useEffect(() => {
    if (filter === '') {
      setFilteredCountries([])
    }
    else {
      const lowerCaseFilter = filter.toLowerCase()
      setFilteredCountries(countries.filter(country => country.name.official.toLowerCase().includes(lowerCaseFilter)))
    }
  }, [filter])

  const handleShowOf = (country) => {
    return () => setFilteredCountries([country])
  }

  return (
    <div>
      <div>
        find countries
        <input value={filter} onChange={(e) => setFilter(e.target.value)}/>
        <Countries countries={filteredCountries} handleShow={handleShowOf}/>
        </div>
    </div>
  )
}

export default App
