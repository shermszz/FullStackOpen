const DisplayCountry = ({ foundCountry }) => {
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
                {Object.values(foundCountry.languages).map(languages => <li key={languages}>{languages}</li>)}
            </ul>
            <img src={foundCountry.flags.png} alt={foundCountry.flags.alt}/>
            
         </div>
    )
}

export default DisplayCountry