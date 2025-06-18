
import { Card, CardContent } from "@/components/ui/card";
import WeatherIcon from "./WeatherIcon";
import { Badge } from "@/components/ui/badge";
import { Droplets } from "lucide-react";

interface ForecastCardsProps {
  data?: any;
}

const ForecastCards = ({ data }: ForecastCardsProps) => {
  if (!data?.daily) return null;

  const forecastDays = data.daily.time.map((time: string, index: number) => ({
    date: new Date(time),
    maxTemp: data.daily.temperature_2m_max[index],
    minTemp: data.daily.temperature_2m_min[index],
    precipitation: data.daily.precipitation_sum[index],
    weatherCode: data.daily.weathercode[index],
    uvIndex: data.daily.uv_index_max[index]
  }));

  const getUVColor = (uvIndex: number) => {
    if (uvIndex <= 2) return "bg-green-500";
    if (uvIndex <= 5) return "bg-yellow-500";
    if (uvIndex <= 7) return "bg-orange-500";
    if (uvIndex <= 10) return "bg-red-500";
    return "bg-purple-500";
  };

  const getUVText = (uvIndex: number) => {
    if (uvIndex <= 2) return "Bajo";
    if (uvIndex <= 5) return "Moderado";
    if (uvIndex <= 7) return "Alto";
    if (uvIndex <= 10) return "Muy Alto";
    return "Extremo";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {forecastDays.map((day, index) => (
        <Card 
          key={index} 
          className={`transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
            index === 0 ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
          }`}
        >
          <CardContent className="p-4">
            {/* Date Header */}
            <div className="text-center mb-3">
              <div className="font-semibold text-gray-800">
                {index === 0 ? 'Hoy' : day.date.toLocaleDateString('es-ES', { weekday: 'short' })}
              </div>
              <div className="text-xs text-gray-500">
                {day.date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
              </div>
            </div>

            {/* Weather Icon */}
            <div className="flex justify-center mb-3">
              <WeatherIcon 
                code={day.weatherCode} 
                size={48} 
                className="text-gray-600"
              />
            </div>

            {/* Temperature */}
            <div className="text-center mb-3">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-xl font-bold text-gray-800">
                  {Math.round(day.maxTemp)}°
                </span>
                <span className="text-sm text-gray-500">
                  {Math.round(day.minTemp)}°
                </span>
              </div>
            </div>

            {/* Precipitation */}
            {day.precipitation > 0 && (
              <div className="flex items-center justify-center space-x-1 mb-2">
                <Droplets size={14} className="text-blue-500" />
                <span className="text-xs text-gray-600">
                  {day.precipitation} mm
                </span>
              </div>
            )}

            {/* UV Index */}
            <div className="flex justify-center">
              <Badge 
                variant="secondary" 
                className={`text-white text-xs ${getUVColor(day.uvIndex)}`}
              >
                UV {day.uvIndex} • {getUVText(day.uvIndex)}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ForecastCards;
