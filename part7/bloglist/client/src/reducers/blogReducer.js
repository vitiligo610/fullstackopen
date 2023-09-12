import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    update: (state, action) => {
      return action.payload
    },
    append: (state, action) => {
      state.push(action.payload)
    },
    remove: (state, action) => {
      return action.payload
    },
    setAllBlogs: (state, action) => {
      return action.payload
    }
  }
})

export const { setAllBlogs, append, update, remove } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setAllBlogs(blogs))
  }
}

export const createBlog = blogObject => {
  return async dispatch => {
    try {
      const blog = await blogService.create(blogObject)
      dispatch(append(blog))
    } catch (error) {
      dispatch(setNotification('error', `Cannot add blog '${blogObject.title}'`))
    }
  }
}

export const updateLikesOf = blogObject => {
  return async (dispatch, getState) => {
    try {
      const { blogs } = getState()
      const blogToUpdate = blogs.find(blog => blog.id === blogObject.id)
      const updatedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1
      }
      const updatedBlogFromServer = await blogService.update(updatedBlog)
      dispatch(update(blogs.map(blog => blog.id !== updatedBlogFromServer.id ? blog : updatedBlogFromServer)))
    } catch (error) {
      dispatch(setNotification('error', `Cannot update blog '${blogToUpdate.title}'`))
    }
  }
}

export const removeBlog = blogObject => {
  return async (dispatch, getState) => {
    try {
      const { blogs } = getState()
      const blogToDelete = blogs.find(blog => blog.id === blogObject.id)
      await blogService.remove(blogObject)
      dispatch(remove(blogs.filter(blog => blog.id !== blogToDelete.id)))
    } catch (error) {
      dispatch(setNotification('error', `Cannot remove blog '${blogToDelete.title}'`))
    }
  }
}

export default blogSlice.reducer