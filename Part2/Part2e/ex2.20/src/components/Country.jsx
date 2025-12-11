import Weather from './Weather.jsx'

const Country = ({countries, showCountry}) => { //{countries} is an array of country objects that contain a lot of information
    const n = countries.length
    if (n === 0) {
        return (
            <div> No country found </div>
        )
    }
    else if (n > 10) {
        return (
            <div> Too many matches, specify another filter </div>
        )
    } else if (n <= 10 && n > 1) {
        return (
            <div>
            {countries.map(c => {
                    return <div key={c.name.common}> {c.name.common}
                    <button onClick={() => showCountry(c.name.common)}> Show </button>
                    </div>
                }
            )}
            </div>
        )
    } else {
        //We have found the single matching country
        return (
            //1. Get the name of the country in <h1> tag

            //2. List the basic data of the country, CAPITAL and AREA

            //3. List the languages in <h2> tag, and map() each language out in a <ul> to get the bullet points

            //4. Print out the flag of this country
            <div>
                <h1>{countries[0].name.common} </h1>

                <div>
                    Capital {countries[0].capital.join(', ')}
                    <br />
                    Area {countries[0].area}
                </div>

                <h2> Languages </h2>
                <ul>
                    {Object.values(countries[0].languages).map(language => {
                        return <li key={language}> {language} </li>
                    })}
                </ul>
                
                <img 
                src={countries[0].flags.png}
                alt={countries[0].flags.alt}
                />

                <Weather capital={countries[0].capital[0]}/>

            </div>
            
        )
    }
}


export default Country