import {useState, useEffect} from 'react'
import Country from './components/Country.jsx'
import countryServices from './services/listOfCountries.js'

const App = () => {
  
  const [query, setQuery] = useState('')
  const [allCountries, setAllCountries] = useState([])

  useEffect(() => {
    countryServices 
      .getAll()
      .then(initialFetch => {
        console.log("first fetch returns", initialFetch)
        setAllCountries(initialFetch)
      })
  }, []) //Will only fetch on the first render

  const handleChange = (event) => {
    setQuery(event.target.value)
  }

  const handleShow = (name) => { //when clicked, force the query to be the name of that country
    setQuery(name)
  }

  const filteredCountries = allCountries.filter(c => {
    console.log("This is what the country object c contains for ALL countries:", c)
    return c.name.common.toLowerCase().includes(query.toLowerCase())
  })

  return (
    <div>
      find countries <input value={query} onChange={handleChange}/>
      <Country countries={filteredCountries} showCountry={handleShow} />
    </div>
  )
}

export default App