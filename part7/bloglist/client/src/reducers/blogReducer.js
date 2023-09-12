import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'

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
    const blog = await blogService.create(blogObject)
    dispatch(append(blog))
  }
}

export const updateLikesOf = blogObject => {
  return async (dispatch, getState) => {
    const { blogs } = getState()
    const blogToUpdate = blogs.find(blog => blog.id === blogObject.id)
    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1
    }
    const updatedBlogFromServer = await blogService.update(updatedBlog)
    dispatch(update(blogs.map(blog => blog.id !== updatedBlogFromServer.id ? blog : updatedBlogFromServer)))
  }
}

export const removeBlog = blogObject => {
  return async (dispatch, getState) => {
    const { blogs } = getState()
    const blogToDelete = blogs.find(blog => blog.id === blogObject.id)
    await blogService.remove(blogObject)
    dispatch(remove(blogs.filter(blog => blog.id !== blogToDelete.id)))
  }
}

export default blogSlice.reducer