import { useState, useEffect } from "react"
import axios from 'axios'

function CountriesData ({ data, single }) {
    data.name.common == 'Palestine' && console.log(data)
    const [visible, setVisible] = useState(false)

    function loopLanguages (languages) {
        const values = []
        for (let language in languages)
            values.push(languages[language])

        return (
            <>
                {
                    values.map(value => (
                        <li key={value}>{value}</li>
                    ))
                }
            </>
        )
    }

    function loopCapitals (capital) {
        const values = []
        for (let key in capital)
            values.push(capital[key])
        return (
            <>
               {
                values.map((value, id) => (
                    <span key={id}>{value}{id !== values.length - 1 && ", "} </span>
                ))
               } 
            </>
        )
    }

    function handleChange () {
        setVisible(!visible)
    }

    return (
        <div>
            {
                !single && 
                <p>
                    {data.name.common} <button onClick={handleChange}>{visible ? "hide" : "show"}</button>
                </p>
            }
            {
                (single || visible) &&
                <>
                    <h1>{data.name.common}</h1>
                    <b>Continent:</b> {data.continents}<br />
                    <b>Capital:</b> {loopCapitals(data.capital)}<br />
                    <b>Area:</b> {data.area} km²<br /><br />
                    <b>Languages:</b> <ul>{loopLanguages(data.languages)}</ul>
                    <img src={data.flags.png} /><br /><br />
                    {data.flags.alt && <><b>Flag Alt:</b> {data.flags.alt}</>}
                    <div className="border"></div>
                </>
            }
            
        </div>
    )
}

export default CountriesData
