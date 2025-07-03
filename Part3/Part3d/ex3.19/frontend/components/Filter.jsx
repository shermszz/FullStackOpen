const Filter = ({searchName, handleSearchChange}) => {
    return (
        <div>
        <p>filter shown with <input value={searchName} onChange={handleSearchChange} /></p>
        </div>
    )
}

export default Filter