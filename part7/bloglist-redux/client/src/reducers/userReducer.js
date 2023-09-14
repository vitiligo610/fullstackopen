import usersService from '../services/users'

const userReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_USERS':
      return action.payload
    default:
      return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    console.log('users loading', users)
    dispatch({
      type: 'INIT_USERS',
      payload: users
    })
  }
}

export default userReducer