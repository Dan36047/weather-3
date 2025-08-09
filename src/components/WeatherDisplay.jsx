import './WeatherDisplay.css'

export default function WeatherDisplay({ weather, loading, error }) {
    if (loading) return <p className="small">Загрузка...</p>
    if (error) return <p className="small">Ошибка: {error}</p>
    if (!weather) return <p className="small">Введите город и нажмите «Поиск»</p>

    // Защита от неожиданных ответов
    const cod = weather.cod
    if (cod && Number(cod) !== 200) {
        return <p className="small">Город не найден</p>
    }

    const icon = weather.weather?.[0]?.icon
    const desc = weather.weather?.[0]?.description
    const temp = weather.main?.temp
    const feels = weather.main?.feels_like
    const humidity = weather.main?.humidity
    const wind = weather.wind?.speed

    return (
        <div className="weather-container">
            <div className="weather-card-expanded">
                <div className="weather-main-info">
                    <div className="location-block">
                        <h1 className="expanded-location">
                            {weather.name}, {weather.sys?.country}
                            <span className="weather-desc-expanded">{desc}</span>
                        </h1>
                        <div className="current-date">
                            {new Date().toLocaleDateString('ru-RU', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long'
                            })}
                        </div>
                    </div>

                    <div className="weather-icon-expanded">
                        {icon && (
                            <img
                                src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
                                alt={desc}
                                className="weather-icon-img-expanded"
                            />
                        )}
                        <div className="temperature-main">
                            <span className="current-temp-expanded">{Math.round(temp)}°C</span>
                            <span className="temp-variation">
              Ощущается как {Math.round(feels)}°C
            </span>
                        </div>
                    </div>
                </div>

                <div className="weather-details-expanded">
                    <div className="detail-card">
                        <i className="bi bi-droplet-fill"></i>
                        <div>
                            <div className="detail-label">Влажность</div>
                            <div className="detail-value">{humidity}%</div>
                        </div>
                    </div>

                    <div className="detail-card">
                        <i className="bi bi-wind"></i>
                        <div>
                            <div className="detail-label">Ветер</div>
                            <div className="detail-value">{wind} м/с</div>
                        </div>
                    </div>

                    <div className="detail-card">
                        <i className="bi bi-speedometer2"></i>
                        <div>
                            <div className="detail-label">Давление</div>
                            <div className="detail-value">
                                {weather.main?.pressure ? Math.round(weather.main.pressure/1.333) : '-'} мм рт.ст.
                            </div>
                        </div>
                    </div>

                    <div className="detail-card">
                        <i className="bi bi-eye-fill"></i>
                        <div>
                            <div className="detail-label">Видимость</div>
                            <div className="detail-value">
                                {weather.visibility ? weather.visibility/1000 : '-'} км
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}