import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_BLOG':
      return action.payload
    case 'ADD_BLOG':
      return state.concat(action.payload)
    case 'UPDATE_BLOG':
      return state.map(blog => blog.id !== action.payload.id ? blog : action.payload)
    case 'DELETE_BLOG':
      return state.filter(blog => blog.id !== action.payload)
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOG',
      payload: blogs
    })
  }
}

export const addBlog = blogObject => {
    return {
      type: 'ADD_BLOG',
      payload: blogObject
    }
}

export const updateBlog = blogObject => {
    return {
      type: 'UPDATE_BLOG',
      payload: blogObject
    }
}

export const deleteBlog = blogId => {
    return {
      type: 'DELETE_BLOG',
      payload: blogId
    }
}

export default blogReducer