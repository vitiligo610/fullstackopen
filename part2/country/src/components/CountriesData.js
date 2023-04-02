import { useState } from "react"

function CountriesData ({ data }) {
    // console.log(data)
    const [visible, setVisible] = useState(false)

    function loopObject (object) {
        const values = []
        for (let key in object)
            values.push(object[key])

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

    function handleChange () {
        setVisible(!visible)
    }

    return (
        <div>
            <p>{data.name.common} <button onChange={handleChange}>{visible ? "Show" : "Hide"}</button></p>
            {
                visible && 
                <>
                    <h1>{data.name.common}</h1>
                    <b>Continent:</b> {data.continents}<br />
                    <b>Capital:</b> {data.capital}<br />
                    <b>Area:</b> {data.area} km²<br /><br />
                    <b>Languages:</b> <ul>{loopObject(data.languages)}</ul>
                    <img src={data.flags.png} /><br /><br />
                    {data.flags.alt && <><b>Flag Alt:</b> data.flags.alt</>}
                </>
            }
            
        </div>
    )
}

export default CountriesData