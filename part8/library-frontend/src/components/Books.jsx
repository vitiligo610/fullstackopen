import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import Select from 'react-select'

import { ALL_BOOKS } from '../queries'

const Books = () => {
  const [filter, setFilter] = useState('')

  const result = useQuery(ALL_BOOKS, {
    variables: { genre: filter !== null ? filter.value : '' }
  })
  console.log(result)

  const getGenres = (arr) => {
    for (let i = 0; i < arr.length; i++)
      for (let j = 0; j < arr.length; j++)
        if (arr[i] === arr[j]) if (i !== j) arr.splice(i, 1)

    return arr
  }

  const options = []
  if (!result.loading) {
    const allBooks = result.data.allBooks
    const genresWithDuplicates = allBooks.map((b) => b.genres.map((g) => g))
    const genresInASingleArr = [].concat(...genresWithDuplicates)
    const genres = [...getGenres(genresInASingleArr)]
    genres.map((g) => {
      const option = { label: g, value: g }
      options.push(option)
    })
  }

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

  const byGenre = (book) => {
    if (!filter || !filter.value) return book
    if (filter.value !== null)
      if (book.genres.includes(filter.value)) return book
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
