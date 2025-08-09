import { useState } from 'react'

export default function WeatherSearch({ setWeather, setLoading, setError }) {
    const [city, setCity] = useState('')

    const fetchWeather = async (q) => {
        try {
            setError(null)
            setLoading(true)
            const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
            if (!apiKey) throw new Error('API key is not set. Put VITE_OPENWEATHER_API_KEY into .env')

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
                q
            )}&appid=${apiKey}&units=metric&lang=ru`

            const res = await fetch(url)
            const data = await res.json()
            if (!res.ok) {
                setWeather(null)
                setError(data.message || 'Ошибка получения данных')
            } else {
                setWeather(data)
            }
        } catch (err) {
            setWeather(null)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = () => {
        if (!city.trim()) return
        fetchWeather(city.trim())
    }

    const handleKey = (e) => {
        if (e.key === 'Enter') handleSearch()
    }

    return (
        <div className="input-group mb-3" style={{maxWidth: "400px"}}>
            <input
                type="text"
                className="form-control"
                placeholder="Введите город"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={handleKey}
            />
            <button
                className="btn btn-primary"
                type="button"
                onClick={handleSearch}
            >
                <i className="bi bi-search"></i> Поиск
            </button>
        </div>
    )
};