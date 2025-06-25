import axios from 'axios'
import {useState, useEffect} from 'react'

const DisplayCountry = ({ foundCountry }) => {

    const [weather, setWeather] = useState(null)

    //I am using hardcoded API Key from London that is given from the example API response from this link: 
    //https://api.openweathermap.org/data/2.5/weather?q=London
    //No matter what country I am searching for, it will always be showing this London weather data

    const api_key = import.meta.env.VITE_SOME_KEY
    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Helsinki&appid=${api_key}&units=metric`)
             .then(response => {
                console.log('The response data looks like this: ', response.data)
                setWeather(response.data)
            })
        }, [foundCountry])

    if (foundCountry === null) {
        return null
    } 
    return (
        <div>
            <h1>{foundCountry.name.common}</h1>
            <p>Capital {foundCountry.capital}</p>
            <p>Area {foundCountry.area}</p>

            <h1>Languages</h1>
            <ul>
                {Object.values(foundCountry.languages).map(languages => <li>{languages}</li>)}
            </ul>
            <img src={foundCountry.flags.png} alt={foundCountry.flags.alt}/>
           
            <h1>Weather in {foundCountry.name.common}</h1>

            <h4>(Technically always showing London data)</h4>
            <p>Temperature {weather.main.temp} Celsius</p>

            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon"/>

            <p> Wind {weather.wind.speed}m/s </p>
         </div>
    )
}

export default DisplayCountry