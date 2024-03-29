import { useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useApolloClient, useSubscription } from '@apollo/client'

import Home from './components/Home'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'

import { ALL_BOOKS, BOOK_ADDED } from './queries'

export const updateCache = (cache, query, addedBook) => {
  const uniqueByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqueByTitle(allBooks.concat(addedBook))
    }
  })
}

const App = () => {
  const [notification, setNotification] = useState(null)
  const [token, setToken] = useState(null)

  const client = useApolloClient()
  const navigate = useNavigate()

  useEffect(() => {
    const token = window.localStorage.getItem('library-user-token')
    if (token)
      setToken(token)
  }, [])

  const logout = () => {
    window.localStorage.clear('library-user-token')
    setToken(null)
    navigate('/login')
    client.clearStore()
  }

  const notify = message => {
    setNotification(message)
    setTimeout(() => setNotification(null), 2000)
  }

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
      notify(`SUCCESS '${addedBook.title}' by '${addedBook.author.name}' added`)
    }
  })

  return (
    <div>
      <nav>
        <Link to='/'>home</Link>
        <Link to='/authors'>authors</Link>
        <Link to='/books'>books</Link>
        {token && <Link to='/new'>add book</Link>}
        {token && <Link to='/recommend'>recommend</Link>}
        {token && <a onClick={logout}>logout</a>}
        {!token && <Link to='/login'>login</Link>}
      </nav>

      <Notification message={notification} />

      <Routes>
        <Route path='/recommend' element={<Recommend />} />
        <Route path='/authors' element={<Authors token={token} />} />
        <Route path='/books' element={<Books />} />
        <Route path='/login' element={<LoginForm setToken={setToken} setNotification={notify} />} />
        <Route path='/new' element={<NewBook setNotification={notify} />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
