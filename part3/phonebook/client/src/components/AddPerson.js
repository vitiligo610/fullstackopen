const AddPerson = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
    return (
        <>
            <h2>add a new</h2>
            <form onSubmit={addPerson}>
                <div className="name">
                name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div className="wrapper">
                    <div className="phone">
                    phone: <input value={newNumber} onChange={handleNumberChange} />
                    </div>
                    <div className="format">
                        <pre>format: 09-1234556 or 040-22334455</pre>
                    </div>
                </div>
                <div>
                <button type="submit">add</button>
                </div>
            </form>
        </>
    )
}

export default AddPerson
