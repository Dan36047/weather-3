import { useState } from 'react';
import Heading from './components/Heading.jsx';
import WeatherSearch from './components/WeatherSearch.jsx';
import WeatherDisplay from './components/WeatherDisplay.jsx'; // Создадим этот компонент

function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = async (city) => {
        try {
            setError(null);
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b60cfa1c2d358af6d9941fc94bbe690b&units=metric&lang=ru`
            );
            const data = await response.json();

            if (data.cod !== 200) {
                throw new Error(data.message || "Город не найден");
            }

            setWeatherData({
                location: {
                    name: data.name,
                    country: data.sys.country,
                },
                current: {
                    temp_c: Math.round(data.main.temp),
                    humidity: data.main.humidity,
                    wind: data.wind.speed,
                    condition: {
                        text: data.weather[0].description,
                        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
                    },
                },
            });
        } catch (err) {
            setError(err.message);
            setWeatherData(null);
        }
    };

    return (
        <div className="min-h-screen bg-[url('/images/w.png')] bg-cover bg-center bg-fixed ">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <Heading />
                <WeatherSearch onSearch={handleSearch} />
                {error && (
                    <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                        Ошибка: {error}
                    </div>
                )}
                {weatherData && <WeatherDisplay data={weatherData} />}
            </div>
        </div>
    );
}

export default App;
