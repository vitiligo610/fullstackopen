import React from "react"

const AddPerson = ({ addPerson, newName, handleNameChange, newPhone, handlePhoneChange }) => {
    return (
        <>
            <h2>add a new</h2>
            <form onSubmit={addPerson}>
                <div>
                name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                phone: <input value={newPhone} onChange={handlePhoneChange} />
                </div>
                <div>
                <button type="submit">add</button>
                </div>
            </form>
        </>
    )
}

export default AddPerson