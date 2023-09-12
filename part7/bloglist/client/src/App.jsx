import { useEffect, useState } from 'react'
import './index.css'
import Header from './components/Header'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import UserInfo from './components/UserInfo'
import BlogInfo from './components/BlogInfo'

import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/authReducer'
import { initializeUsers } from './reducers/usersReducer'

import { Routes, Route } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  
  console.log('rerendering App')
  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const user = useSelector(state => state.user)

  return (
    <div>
      {!user && (
        <>
          <h2>Log in to application</h2>
          <Notification />
          <LoginForm />
        </>
      )}
      {user && (
        <>
          <Header />
          <Notification />
          <Routes>
            <Route path='/blogs/:id' element={<BlogInfo />} />
            <Route path='/users/:id' element={<UserInfo />} />
            <Route path='/users' element={<UserList />} />
            <Route path='/' element={<BlogList />} />
          </Routes>
        </>
      )}
    </div>
  )
}

export default App
