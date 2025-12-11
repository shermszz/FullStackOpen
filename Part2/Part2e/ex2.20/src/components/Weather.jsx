import axios from 'axios'
import {useState, useEffect} from 'react'


const Weather = ({capital}) => {
    const [weather, setWeather] = useState(null)
    const api_key = import.meta.env.VITE_WEATHER_KEY

    useEffect(() => {
        if (api_key && capital) { //Only fetch the api call if the city and api_key are valid
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&APPID=${api_key}&units=metric`)
            .then(response =>{
                console.log("API call response object", response)
                setWeather(response.data)
            })
            .catch(error => {
                console.log("Crashed because", error)
            })
        }
    }, [capital, api_key])

    if (!weather) return null //If weather has not yet been fetched, we just return null first

    return (
        <div>
            <h2>Weather in {capital}</h2>
            <p> Temperature {weather.main.temp} Celsius </p>

            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />

            <p> Wind {weather.wind.speed} m/s</p>
        </div>
    )

}

export default Weather