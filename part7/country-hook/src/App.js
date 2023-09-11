import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  
  useEffect(() => {
    if (name)
      axios
          .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
          .then(response => {
            console.log(response)
            setCountry(response.data)
          })
          .catch(error => {
            setCountry(null)
          })
        }, [name])
        
        console.log(country)
  return country
}

const Country = ({ country }) => {
  // if (!country) {
  //   return null
  // }

  if (!country) {
    return (
      <div>
        not found...
      </div>
    )
  }

  const countryObject = country[0]

  return (
    <div>
      <h3>{countryObject.name.common} </h3>
      <div>capital {countryObject.capital[0]} </div>
      <div>population {countryObject.population}</div> 
      <img src={countryObject.flags.png} height='100' alt={`flag of ${countryObject.name.common}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App