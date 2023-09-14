import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, useMatch } from 'react-router-dom'

import './index.css'
import LoginForm from './components/LoginForm'
import Header from './components/Header'
import Home from './components/Home'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import BlogInfo from './components/BlogInfo'
import UserList from './components/UserList'
import UserInfo from './components/UserInfo'

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
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)

  const userMatch = useMatch('/users/:id')
  const matchedUser = userMatch
    ? users.find(user => String(user.id) === String(userMatch.params.id))
    : null

  const blogMatch = useMatch('/blogs/:id')
  const matchedBlog = blogMatch
    ? blogs.find(blog => String(blog.id) === String(blogMatch.params.id))
    : null
  
  return (
    <div className='container'>
      {!user && <LoginForm />}
      {
        user &&
        <>
        <Header />
        <h2>Blog App</h2>
        <Notification />

        <Routes>
          <Route path='/blogs/:id' element={<BlogInfo blog={matchedBlog} />} />
          <Route path='/blogs' element={<BlogList />} />
          <Route path='/users/:id' element={<UserInfo user={matchedUser} />} />
          <Route path='/users' element={<UserList />} />
          <Route path='/' element={<Home />} />
        </Routes>
        </>
      }
    </div>
  )
}

export default App