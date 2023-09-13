import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_BLOG':
      return action.payload
    case 'ADD_BLOG':
      return state.concat(action.payload)
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOG',
      payload: [
        ...blogs
      ]
    })
  }
}

export const addBlog = blogToAdd => {
  return async dispatch => {
    const addedBlog = await blogService.create(blogToAdd)
    dispatch({
      type: 'ADD_BLOG',
      payload: addedBlog
    })
  }
}

export default blogReducer