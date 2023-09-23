import { useQuery } from '@apollo/client'
import Select from 'react-select'
import { selectStyles } from './EditAuthorForm'

import { ALL_BOOKS } from '../queries'

const GenreFilter = ({ setFilter }) => {
  const { loading, error, data } = useQuery(ALL_BOOKS, {})

  let options = []
  if (!loading) {
    const genresWithDuplicates = data.allBooks.map((b) =>
      b.genres.map((g) => g)
    )
    const genresResult = [...new Set(genresWithDuplicates.flat())]
    options = genresResult.map((g) => ({ label: g, value: g }))
  }

  return (
    <div>
      <p>Filter by genre:</p>
      <Select
        styles={selectStyles}
        isClearable
        defaultValue={null}
        options={options}
        onChange={setFilter}
      />
    </div>
  )
}

export default GenreFilter
