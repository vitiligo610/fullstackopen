import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './index.css'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Header from './components/Header'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import { Routes, Route } from 'react-router-dom'

import { initializeUser } from './reducers/authReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [])

  const user = useSelector(state => state.user)

  return (
    <div>
      {!user && <LoginForm />}
      {
        user &&
        <>
        <Header />
          <Routes>
            <Route path='/users' element={<UserList />} />
            <Route path='/' element={<BlogList />} />
          </Routes>
        </>
      }
    </div>
  )
}

export default App