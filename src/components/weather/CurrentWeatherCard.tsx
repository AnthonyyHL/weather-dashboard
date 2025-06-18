
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import WeatherIcon from "./WeatherIcon";
import { Thermometer, Droplets } from "lucide-react";

interface CurrentWeatherCardProps {
  data?: any;
}

const CurrentWeatherCard = ({ data }: CurrentWeatherCardProps) => {
  if (!data) return null;

  const currentTemp = data.current?.temperature_2m || 0;
  const humidity = data.current?.relative_humidity_2m || 0;
  const weatherCode = data.current?.weathercode || 0;
  const maxTemp = data.daily?.temperature_2m_max?.[0] || 0;
  const minTemp = data.daily?.temperature_2m_min?.[0] || 0;

  const getWeatherDescription = (code: number) => {
    const descriptions: { [key: number]: string } = {
      0: "Despejado",
      1: "Mayormente despejado",
      2: "Parcialmente nublado",
      3: "Nublado",
      45: "Niebla",
      48: "Niebla con escarcha",
      51: "Llovizna ligera",
      53: "Llovizna moderada",
      55: "Llovizna intensa",
      61: "Lluvia ligera",
      63: "Lluvia moderada",
      65: "Lluvia intensa",
      80: "Chubascos ligeros",
      81: "Chubascos moderados",
      82: "Chubascos intensos"
    };
    return descriptions[code] || "Desconocido";
  };

  return (
    <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium opacity-90">
          Clima Actual
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Temperature Display */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-5xl font-bold mb-1">
              {Math.round(currentTemp)}°
            </div>
            <div className="text-blue-100 text-sm">
              {getWeatherDescription(weatherCode)}
            </div>
          </div>
          <div className="text-right">
            <WeatherIcon code={weatherCode} size={64} className="text-white" />
          </div>
        </div>

        {/* Temperature Range */}
        <div className="flex items-center justify-between bg-white/10 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Thermometer size={16} />
            <span className="text-sm">Máx/Mín</span>
          </div>
          <div className="text-sm font-medium">
            {Math.round(maxTemp)}° / {Math.round(minTemp)}°
          </div>
        </div>

        {/* Humidity */}
        <div className="flex items-center justify-between bg-white/10 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Droplets size={16} />
            <span className="text-sm">Humedad</span>
          </div>
          <div className="text-sm font-medium">{humidity}%</div>
        </div>

        {/* Weather Status Badge */}
        <div className="flex justify-center">
          <Badge variant="secondary" className="bg-white/20 text-white border-0">
            Actualizado • {new Date().toLocaleTimeString('es-ES', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentWeatherCard;
