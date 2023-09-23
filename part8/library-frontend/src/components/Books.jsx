import { useState } from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'

import GenreFilter from './GenreFilter'

const Books = () => {
  const [filter, setFilter] = useState('')

  const queryVariables = filter ? { variables: { genre: filter.value }} : {}

  const result = useQuery(ALL_BOOKS, queryVariables)

  return (
    <div>
      <h2>Books</h2>
      <GenreFilter setFilter={setFilter} />
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
