import { Routes, Route, Link } from 'react-router-dom'

import Home from './components/Home'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
  const padding = {
    padding: 5
  }

  return (
    <div>
      <div>
        <Link to='/' style={padding}>home</Link>
        <Link to='/authors' style={padding}>authors</Link>
        <Link to='/books' style={padding}>books</Link>
        <Link to='/new' style={padding}>add book</Link>
      </div>

      <Routes>
        <Route path='/authors' element={<Authors />} />
        <Route path='/books' element={<Books />} />
        <Route path='/new' element={<NewBook />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App