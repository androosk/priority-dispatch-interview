const API_KEY = import.meta.env.VITE_WEATHERSTACK_API_KEY;
const BASE_URL = "http://api.weatherstack.com/current";

export interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
  };
  current: {
    temperature: number;
    weather_descriptions: string[];
    weather_icons: string[];
    wind_speed: number;
    humidity: number;
    observation_time: string;
    weather_code: number;
    wind_degree: number;
    wind_dir: string;
    pressure: number;
    precip: number;
    cloudcover: number;
    feelslike: number;
    uv_index: number;
    visibility: number;
    is_day: string;
  };
}

interface WeatherApiResponse {
  success: boolean;
  error?: {
    code: number;
    type: string;
    info: string;
  };
}

export class WeatherApiError extends Error {
  code: number;
  type: string;

  constructor(message: string, code: number, type: string) {
    super(message);
    this.name = "WeatherApiError";
    this.code = code;
    this.type = type;
  }
}

export async function getWeather(city: string): Promise<WeatherData> {
  const url = `${BASE_URL}?access_key=${API_KEY}&query=${encodeURIComponent(
    city
  )}&units=f`;

  try {
    const response = await fetch(url);
    const data: WeatherApiResponse & WeatherData = await response.json();

    if (!data.success && data.error) {
      throw new WeatherApiError(
        data.error.info,
        data.error.code,
        data.error.type
      );
    }

    if (!data.location || !data.current) {
      throw new Error("Invalid data structure received from the API");
    }

    return data;
  } catch (error) {
    if (error instanceof WeatherApiError) {
      throw error;
    }
    console.error("There was a problem fetching the weather data:", error);
    throw new Error("Failed to fetch weather data. Please try again.");
  }
}
