import { useState } from 'react'
import Heading from './components/Heading'
import WeatherSearch from './components/WeatherSearch'
import WeatherDisplay from './components/WeatherDisplay'
import './App.css'

export default function App() {
    const [weather, setWeather] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    return (
        <div className="app">
            <div className="container">
                <div className="r">
                    <Heading />
                    <WeatherSearch
                        setWeather={setWeather}
                        setLoading={setLoading}
                        setError={setError}
                    />
                    <WeatherDisplay weather={weather} loading={loading} error={error} />
                </div>
            </div>
        </div>
    )
}
