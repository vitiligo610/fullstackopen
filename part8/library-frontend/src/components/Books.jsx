import { useState } from 'react'
import { useQuery } from '@apollo/client'
import Select from 'react-select'

import { ALL_BOOKS } from '../queries'
import { ALL_GENRES } from '../queries'

const Books = () => {
  const [filter, setFilter] = useState('')

  const queryVariables = filter ? { variables: { genre: filter.value }} : {}

  const result = useQuery(ALL_BOOKS, queryVariables)

  const genresResult = useQuery(ALL_GENRES)
  console.log(result)

  let options = []
  if (!genresResult.loading)
    options = genresResult.data.allGenres.map((g) => ({ label: g, value: g }))

  const customStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: '#fff',
      width: '300px',
      marginBottom: '20px'
    }),
    menu: (baseStyles, state) => ({
      ...baseStyles,
      width: '300px',
      border: '1px solid #f3f3f3'
    })
  }

  return (
    <div>
      <h2>Books</h2>
      <p>Filter by genre:</p>
      <Select
        styles={customStyles}
        isClearable
        defaultValue={null}
        options={options}
        onChange={setFilter}
      />
      {result.loading ? (
        <h2>
          <em>Loading data...</em>
        </h2>
      ) : (
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {result.data.allBooks.map((b) => (
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Books
