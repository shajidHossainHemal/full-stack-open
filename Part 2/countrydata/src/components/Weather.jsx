import { useState, useEffect } from 'react'

import getWeather from '../services/weather'

const Weather = ({ name, lat, lon }) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        getWeather(lat, lon).then(weather => {
            setWeather(weather)
        })
    }, [lat, lon])

    if(weather === null){
        return (
            <div>Weather is loading...</div>
        )
    }

    return (
        <div>
            <h2>Weather in {name}</h2>
            <div>
                <p>Temparature {weather.main.temp} Celcius</p>
                <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt={weather.weather[0].description} />
                <p>Wind {weather.wind.speed} m/s</p>
            </div>
        </div>
    )
}

export default Weather