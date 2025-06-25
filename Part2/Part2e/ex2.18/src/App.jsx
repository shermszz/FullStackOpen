import {useState, useEffect} from 'react'
import axios from 'axios'
import DisplayCountry from './components/DisplayCountry'

const App = () => {
    const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

    const [countryName, setCountryName] = useState('')
    const [filteredCountries, setFilteredCountries] = useState([])
    const [message, setMessage] = useState('')
    const [foundCountry, setFoundCountry] = useState(null)

    useEffect(() => {
        console.log("useEffect triggered")
        axios.get(baseUrl)
         .then(response => {
            console.log('This is what response.data contains', response.data)

            const countryData = response.data

            const possibleCountryDataMatches = countryData.filter(countryInfo => countryInfo.name.common.toLowerCase().includes(countryName))
            console.log('this is the array of possible countryData matches', possibleCountryDataMatches)


            //If there are more than 10 country matches, set this specific message
            if (possibleCountryDataMatches.length > 10) {
                setFoundCountry(null)
                setFilteredCountries([])
                setMessage('Too many matches, specify another filter')
            }

            //Else if there are fewer than 10, but not exactly that one country yet, show all their names
            else if (possibleCountryDataMatches.length <= 10 && possibleCountryDataMatches.length !== 1) {
                setFoundCountry(null)
                setFilteredCountries(possibleCountryDataMatches)
                setMessage('')
            }

            //Else, this is the country we are searching for, so we display the captial, area, flag and languages spoken
            else {
                console.log('Info of the country found', possibleCountryDataMatches)
                setFoundCountry(possibleCountryDataMatches[0])
                setFilteredCountries([])
                setMessage('')
            }
        
         })
    }, [countryName]) //Everytime the countryName changes, useEffect is re-triggered

    const handleSearchChange = (event) => {
        console.log(event.target.value)
        setCountryName(event.target.value.toLowerCase())
    }

    return (
        <div>
            <form>
            find countries <input value={countryName} onChange={handleSearchChange}/>
            </form>
            <p>
                {message}
                {filteredCountries.map(country => 
                    <p key={country.name.common}>{country.name.common}</p>
                )}
                <DisplayCountry foundCountry={foundCountry} />
            </p>
        </div>
    )
}


export default App