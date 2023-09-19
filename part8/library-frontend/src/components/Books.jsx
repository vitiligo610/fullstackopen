import { useQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'

const Books = () => {
  const result = useQuery(ALL_BOOKS)
  console.log(result)

  return (
    <div>
      <h2>Books</h2>
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
