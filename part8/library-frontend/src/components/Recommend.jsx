import { useQuery } from '@apollo/client'
import { ALL_BOOKS, CURRENT_USER } from '../queries'

const Recommend = () => {
  const result = useQuery(CURRENT_USER)
  const booksResult = useQuery(ALL_BOOKS)

  const byGenre = (book) => {
    if (book.genres.includes(result.data.me.favoriteGenre)) return book
  }

  return (
    <div>
      <h2>Recommendations</h2>

      {result.loading ? (
        <h2>
          <em>Loading data...</em>
        </h2>
      ) : (
        <>
          <p>
            books in your favorite genre <b>{result.data.me.favoriteGenre}</b>
          </p>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
              </tr>
              {!booksResult.loading &&
                booksResult.data.allBooks.filter(byGenre).map((b) => (
                  <tr key={b.title}>
                    <td>{b.title}</td>
                    <td>{b.author.name}</td>
                    <td>{b.published}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}

export default Recommend
