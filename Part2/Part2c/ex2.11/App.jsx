import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'


const App =() => {
    const [persons, setPersons] = useState([])

    useEffect(() => {
        console.log("useEffect processed")
        axios
            .get('http://localhost:3001/persons') //fetching the persons data from an "external" source  
            .then(response => {
                console.log("then() method processed")
                console.log(response.data)
                setPersons(response.data) // update the state of persons on local memory
            })
    }, [])

    console.log("rendered", persons.length, "people")

    return (
        <ul>
            {persons.map(person => 
                <li key={person.id}> 
                 {person.name} {person.number}
                </li>
            )}
        </ul>
   
    )
    

}

export default App 
