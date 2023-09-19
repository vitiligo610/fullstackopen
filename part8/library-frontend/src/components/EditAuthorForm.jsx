import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'

import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

import Select from 'react-select'

const EditAuthorForm = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors } )=> {
        return {
          allAuthors: allAuthors.map(a => a.id !== response.data.editAuthor.id ? a : response.data.editAuthor)
        }
      })
    }
  })

  const result = useQuery(ALL_AUTHORS)
  
  let options = []
  if (!result.loading) {
    result.data.allAuthors.map((a) => {
      const option = { label: a.name, value: a.name }
      options = options.concat(option)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    editAuthor({ variables: { name: String(name.value), setBornTo: born } })
    console.log('nameValue', name)
    setName('')
    setBorn('')
  }

  const customStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: '#fff',
      width: '300px',
      height: '1px',
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
      <h2>set birthyear</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <Select
            styles={customStyles}
            defaultValue={name}
            onChange={setName}
            options={options}
          />
        </div>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button>update author</button>
      </form>
    </div>
  )
}

export default EditAuthorForm
