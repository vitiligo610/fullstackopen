import { useState, useEffect } from "react"
import axios from 'axios'

function CountriesData ({ data, single }) {
    // data.name.common == 'Palestine' && console.log(data)
    const [visible, setVisible] = useState(false)
    const [coordinates, setCoordinates] = useState({
        lat: null,
        lon: null
    })
    const [weatherData, setWeatherData] = useState(null)
    const [loadingWeather, setLoadingWeather] = useState(true)

    const appId = 'e012c27ed355e7aa7790ae554ce61d93'
    const cityName = data.capital[0]

    const geoDataUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${appId}`


    useEffect(() => {
        axios
            .get(geoDataUrl)
            .then(response => {
                setCoordinates({
                    lat: response.data[0].lat,
                    lon: response.data[0].lon
                })
            })
    }, [])
        
    // data.name.common == 'Palestine' && console.log(coordinates)
    
    
    
    useEffect(() => {
        if (coordinates.lat !== null && coordinates.lon !== null){
            const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=hourly,daily&units=metric&appid=${appId}`
        
        axios
            .get(url)
            .then(response => {
                setWeatherData(
                    {
                        temp: response.data.current.temp,
                        description: response.data.current.weather[0].description,
                        icon: response.data.current.weather[0].icon,
                        wind_speed: response.data.current.wind_speed
                    }
                )
                setLoadingWeather(!loadingWeather)
            })
        }
    }, [coordinates])
    // data.name.common === 'Palestine' && console.log(weatherData)



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
                    <img className="flag" src={data.flags.png} /><br /><br />
                    {data.flags.alt && <><b>Flag Alt:</b> {data.flags.alt}</>}<br />
                    {loadingWeather && <h2>Loading weather data...</h2>}
                    {
                        weatherData !== null &&
                        <div className="weather">
                            <h2>Weather in {data.capital[0]}</h2>
                            <b>Temperature:</b> {weatherData.temp} °C<br />
                            <img src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} alt={weatherData.description} /><br />
                            <b>Wind Speed:</b> {weatherData.wind_speed} ms⁻¹<br /><br />
                        </div>
                    }
                    <div className="border"></div>
                </>
            }
            
        </div>
    )
}

export default CountriesData
