import { WeatherData } from "../utils/weatherApi";

interface ResultsContainerProps {
  weatherData: WeatherData | null;
  error: string | null;
}

const ResultsContainer: React.FC<ResultsContainerProps> = ({
  weatherData,
  error,
}) => {
  if (error) {
    return (
      <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        Error: {error}
      </div>
    );
  }

  return (
    weatherData && (
      <div className="mt-4 p-4 bg-white border border-gray-300 rounded shadow">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              {weatherData.location.name}, {weatherData.location.region},{" "}
              {weatherData.location.country}
            </h2>
            <p className="text-sm text-gray-600">
              Observed at: {weatherData.current.observation_time}
            </p>
          </div>
          {weatherData.current.weather_icons &&
            weatherData.current.weather_icons.length > 0 && (
              <img
                src={weatherData.current.weather_icons[0]}
                alt={
                  weatherData.current.weather_descriptions[0] || "Weather icon"
                }
                className="w-16 h-16"
              />
            )}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p className="font-semibold">Temperature:</p>
            <p>
              {weatherData.current.temperature}°F (Feels like:{" "}
              {weatherData.current.feelslike}°F)
            </p>
          </div>
          <div>
            <p className="font-semibold">Conditions:</p>
            <p>{weatherData.current.weather_descriptions.join(", ")}</p>
          </div>
          <div>
            <p className="font-semibold">Wind:</p>
            <p>
              {weatherData.current.wind_speed} km/h,{" "}
              {weatherData.current.wind_dir}
            </p>
          </div>
          <div>
            <p className="font-semibold">Humidity:</p>
            <p>{weatherData.current.humidity}%</p>
          </div>
          <div>
            <p className="font-semibold">Visibility:</p>
            <p>{weatherData.current.visibility} km</p>
          </div>
        </div>
      </div>
    )
  );
};

export default ResultsContainer;
