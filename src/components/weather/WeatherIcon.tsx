
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning,
  CloudDrizzle,
  CloudFog
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WeatherIconProps {
  code: number;
  size?: number;
  className?: string;
}

const WeatherIcon = ({ code, size = 24, className }: WeatherIconProps) => {
  const getIcon = (weatherCode: number) => {
    // Based on WMO Weather interpretation codes
    if (weatherCode === 0) return Sun; // Clear sky
    if (weatherCode >= 1 && weatherCode <= 3) return Cloud; // Partly cloudy to overcast
    if (weatherCode >= 45 && weatherCode <= 48) return CloudFog; // Fog
    if (weatherCode >= 51 && weatherCode <= 57) return CloudDrizzle; // Drizzle
    if (weatherCode >= 61 && weatherCode <= 67) return CloudRain; // Rain
    if (weatherCode >= 71 && weatherCode <= 77) return CloudSnow; // Snow
    if (weatherCode >= 80 && weatherCode <= 82) return CloudRain; // Rain showers
    if (weatherCode >= 85 && weatherCode <= 86) return CloudSnow; // Snow showers
    if (weatherCode >= 95 && weatherCode <= 99) return CloudLightning; // Thunderstorm
    
    return Cloud; // Default
  };

  const IconComponent = getIcon(code);

  return (
    <IconComponent 
      size={size} 
      className={cn("flex-shrink-0", className)} 
    />
  );
};

export default WeatherIcon;
