import React from "react"
import Person from "./Person"

const Persons = ({ persons, query, del }) => {
    const personFilter = persons.filter(p => p.name.toLowerCase().includes(query))
    return (
        <>
            <h2>
                Numbers
            </h2>
            <table>
                <tbody>
                    <tr>
                        <td><b>Name</b></td>
                        <td><b>Phone</b></td>
                    </tr>
                    {
                        personFilter.map((p, i) => <Person key={i} name={p.name} phone={p.phone} id={p.id} del={del} />)
                    }
                </tbody>
            </table>
        </>
    )
}

export default Persons