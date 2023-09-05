const filterReducer = (state = 'ALL', action) => {
  switch(action.type) {
    case 'FILTER':
      return action.payload
    default:
      return state
  }
}

export const filterChange = query => {
  return {
    type: 'FILTER',
    payload: query
  }
}

export default filterReducer