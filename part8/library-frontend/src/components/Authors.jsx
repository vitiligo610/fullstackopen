import { useQuery } from '@apollo/client'

import EditAuthorForm from './EditAuthorForm'

import { ALL_AUTHORS } from '../queries'


const Authors = ({ token }) => {
  const result = useQuery(ALL_AUTHORS)

  console.log('result', result)

  return (
    <div>
      <h2>Authors</h2>
      {result.loading ? (
        <h2>
          <em>Loading data...</em>
        </h2>
      ) : (
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {result.data.allAuthors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {token && <EditAuthorForm />}
    </div>
  )
}

export default Authors
