import { useState, useEffect } from 'react'
import uuid from 'react-uuid'
import axios from 'axios'
import Input from './components/Input'
import CountriesData from './components/CountriesData'

function App({ data }) {
  const [input, setInput] = useState('')
  const [countriesData, setCountriesData] = useState([])
  const [names, setNames] = useState([])

  function handleChange (e) {
    setInput(e.target.value)
  }

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      console.log(response)
      setCountriesData(response.data)
    })
    .catch(error => console.log(error))
  }, [input])
  
  useEffect(() => {
    if (input !== '') {
      const matchedNames = countriesData
        .filter(c => c.name.common.toLowerCase().includes(input))
        .map(c => c.name.common);
      setNames(matchedNames);
    } else {
      setNames([]);
    }
  }, [input, countriesData])
  console.log(names)
  

  return (
    <div className='container'>
      <Input handleChange={handleChange} />
      {
        countriesData.length > 0 && 
        countriesData.map((c, i) => {
          if (c.name.common.toLowerCase().includes(input)) {
            return <CountriesData key={uuid()} data={c} />
        } else {
          return null
        }
        })
      }
    </div>
  )
}

export default App;
