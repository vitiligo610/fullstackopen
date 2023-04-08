const Person = ({ name, number, id, del }) => {
    return (
      <tr>
        <td>{name}</td>
        <td>{number}</td>
        <td>
          <button onClick={() => del(id)}>Delete</button>
        </td>
      </tr>
    )
}
  
export default Person
  
