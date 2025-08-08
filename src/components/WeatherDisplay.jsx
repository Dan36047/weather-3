const WeatherDisplay = ({ data }) => {
    return (
        <div className="mt-8 bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">
                        {data.location.name}, {data.location.country}
                    </h2>
                    <p className="text-gray-600">
                        {new Date().toLocaleDateString('ru-RU', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long'
                        })}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-4xl font-bold">{data.current.temp_c}°C</p>
                    <p className="text-gray-600 capitalize">
                        {data.current.condition.text}
                    </p>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
                <img
                    src={data.current.condition.icon}
                    alt={data.current.condition.text}
                    className="h-16 w-16"
                />
                <div className="text-gray-700">
                    <p>Влажность: {data.current.humidity}%</p>
                    <p>Ветер: {data.current.wind} м/с</p>
                </div>
            </div>
        </div>
    );
};

export default WeatherDisplay;