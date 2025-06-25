
const Persons = ({ persons, findMatch, removeName }) => {
    {/* If input string matches any part of a person's name, show that person's details */ }
    return (
        <>
            {persons.filter(findMatch) // returns the filtered array of persons
                .map(filteredPerson => {
                    return (
                        <p key={filteredPerson.id}>
                            {filteredPerson.name} {filteredPerson.number} <button onClick={() => removeName(filteredPerson.id, filteredPerson.name)}>delete</button>
                        </p>
                    )
                })}
        </>
    )
}


export default Persons