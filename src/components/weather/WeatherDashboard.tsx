
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CurrentWeatherCard from "./CurrentWeatherCard";
import WeatherCharts from "./WeatherCharts";
import ForecastCards from "./ForecastCards";
import UVAlert from "./UVAlert";
import LocationSelector from "./LocationSelector";
import { getWeatherData } from "../../services/weatherApi";
import { Loader2 } from "lucide-react";

const WeatherDashboard = () => {
  const [location, setLocation] = useState({
    latitude: -0.1807,
    longitude: -78.4678,
    cityName: "Quito, Ecuador"
  });

  const { data: weatherData, isLoading, error } = useQuery({
    queryKey: ['weather', location.latitude, location.longitude],
    queryFn: () => getWeatherData(location.latitude, location.longitude),
    refetchInterval: 300000, // Refetch every 5 minutes
  });

  const handleLocationChange = (latitude: number, longitude: number, cityName: string) => {
    setLocation({ latitude, longitude, cityName });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-lg text-gray-600">Cargando datos del clima...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-600">Error al cargar los datos del clima</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Dashboard Meteorológico
        </h1>
        <p className="text-gray-600">
          {location.cityName} • {new Date().toLocaleDateString('es-ES', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Location Selector */}
      <LocationSelector 
        onLocationChange={handleLocationChange}
        currentLocation={location}
      />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Current Weather - Takes full width on mobile, 1 column on desktop */}
        <div className="lg:col-span-1">
          <CurrentWeatherCard data={weatherData} />
        </div>
        
        {/* UV Alert - Takes remaining space */}
        <div className="lg:col-span-2">
          <UVAlert uvIndex={weatherData?.daily?.uv_index_max?.[0] || 0} />
        </div>
      </div>

      {/* Charts Section */}
      <div className="mb-8">
        <WeatherCharts data={weatherData} />
      </div>

      {/* Forecast Section */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Pronóstico de 7 días
        </h2>
        <ForecastCards data={weatherData} />
      </div>
    </div>
  );
};

export default WeatherDashboard;
