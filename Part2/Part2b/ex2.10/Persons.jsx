
const Persons = ({ persons, findMatch }) => {
    {/* If input string matches any part of a person's name, show that person's details */ }
    return (
        <>
            {persons.filter(findMatch) // returns the filtered array of persons
                .map(filteredPerson => {
                    return (
                        <p key={filteredPerson.id}>
                            {filteredPerson.name} {filteredPerson.number}
                        </p>
                    )
                })}
        </>
    )
}


export default Persons