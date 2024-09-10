import React, { useState } from "react";
import SearchForm from "./components/SearchForm";
import ResultsContainer from "./components/ResultsContainer";
import { getWeather, WeatherData, WeatherApiError } from "./utils/weatherApi";

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    try {
      const data = await getWeather(query);
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setWeatherData(null);
      if (err instanceof WeatherApiError) {
        setError(`Failed to fetch weather for ${query}. Please try again.`);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-sunny-day bg-center bg-no-repeat bg-fixed">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Get Current Weather Conditions for Your Location Here!
        </h1>
        <SearchForm onSearch={handleSearch} />
        <ResultsContainer weatherData={weatherData} error={error} />
      </div>
    </div>
  );
};

export default App;
