import { useDispatch } from "react-redux"
import { filterChange } from "../reducers/filterReducer"

const Filter = () => {
  const dispatch = useDispatch()
  const handleChange = e => {
    // input-field value is in variable event.target.value
    const query = e.target.value
    dispatch(filterChange(query))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input name="search" onChange={e => handleChange(e)} />
    </div>
  )
}

export default Filter