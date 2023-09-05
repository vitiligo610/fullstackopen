import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterChange(state, action) {
      return action.payload
    }
  }
})

// const filterReducer = (state = 'ALL', action) => {
//   switch(action.type) {
//     case 'FILTER':
//       return action.payload
//     default:
//       return state
//   }
// }

// export const filterChange = query => {
//   return {
//     type: 'FILTER',
//     payload: query
//   }
// }

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer