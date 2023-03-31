import React from "react"

const Person = ({ name, phone, id, del }) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{phone}</td>
            <td><button onClick={() => del(id)}>Delete</button></td>
        </tr>
    )
}

export default Person
