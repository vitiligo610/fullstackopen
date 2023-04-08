const AddPerson = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
    return (
        <>
            <h2>add a new</h2>
            <form onSubmit={addPerson}>
                <div>
                name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                phone: <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                <button type="submit">add</button>
                </div>
            </form>
        </>
    )
}

export default AddPerson
