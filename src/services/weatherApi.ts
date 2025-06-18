
// Simulated weather data based on Open-Meteo API format
export const getWeatherData = async (latitude: number, longitude: number) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log(`Fetching weather data for coordinates: ${latitude}, ${longitude}`);
  
  // Generate realistic weather data based on location
  const generateDailyData = () => {
    const data = {
      time: [] as string[],
      temperature_2m_max: [] as number[],
      temperature_2m_min: [] as number[],
      precipitation_sum: [] as number[],
      weathercode: [] as number[],
      uv_index_max: [] as number[],
      sunshine_duration: [] as number[],
      precipitation_hours: [] as number[]
    };

    // Different base temperatures for different latitudes
    const getBaseTemp = (lat: number) => {
      if (Math.abs(lat) < 10) return 25; // Tropical
      if (Math.abs(lat) < 30) return 20; // Subtropical
      if (Math.abs(lat) < 50) return 15; // Temperate
      return 5; // Cold regions
    };

    const baseTemp = getBaseTemp(latitude);

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      
      data.time.push(date.toISOString().split('T')[0]);
      data.temperature_2m_max.push(Math.round((Math.random() * 8 + baseTemp) * 10) / 10);
      data.temperature_2m_min.push(Math.round((Math.random() * 6 + (baseTemp - 10)) * 10) / 10);
      data.precipitation_sum.push(Math.round((Math.random() * 15) * 10) / 10);
      
      // Weather codes: 0=clear, 1-3=partly cloudy, 45-48=fog, 51-67=rain, 80-99=showers/storms
      const weatherCodes = [0, 1, 2, 3, 51, 61, 80];
      data.weathercode.push(weatherCodes[Math.floor(Math.random() * weatherCodes.length)]);
      
      // UV index varies by latitude (higher near equator)
      const uvBase = Math.max(1, 12 - Math.abs(latitude) * 0.2);
      data.uv_index_max.push(Math.round(Math.random() * uvBase + 2));
      data.sunshine_duration.push(Math.round(Math.random() * 10 + 4));
      data.precipitation_hours.push(Math.round(Math.random() * 8));
    }

    return data;
  };

  const generateHourlyData = () => {
    const data = {
      time: [] as string[],
      temperature_2m: [] as number[],
      relative_humidity_2m: [] as number[],
      precipitation: [] as number[],
      weathercode: [] as number[],
      uv_index: [] as number[]
    };

    const getBaseTemp = (lat: number) => {
      if (Math.abs(lat) < 10) return 25;
      if (Math.abs(lat) < 30) return 20;
      if (Math.abs(lat) < 50) return 15;
      return 5;
    };

    const baseTemp = getBaseTemp(latitude);
    const now = new Date();
    
    for (let i = 0; i < 24; i++) {
      const hourTime = new Date(now.getTime() + i * 60 * 60 * 1000);
      data.time.push(hourTime.toISOString());
      
      // Temperature variation throughout the day
      const tempVariation = 8 * Math.sin((i - 6) * Math.PI / 12);
      data.temperature_2m.push(Math.round((baseTemp + tempVariation) * 10) / 10);
      
      data.relative_humidity_2m.push(Math.round(Math.random() * 30 + 60));
      data.precipitation.push(Math.round(Math.random() * 2 * 10) / 10);
      
      const weatherCodes = [0, 1, 2, 3];
      data.weathercode.push(weatherCodes[Math.floor(Math.random() * weatherCodes.length)]);
      
      // UV index higher during day hours, varies by latitude
      const uvBase = Math.max(0, 8 - Math.abs(latitude) * 0.1);
      const uvValue = i >= 6 && i <= 18 ? Math.max(0, uvBase * Math.sin((i - 6) * Math.PI / 12)) : 0;
      data.uv_index.push(Math.round(uvValue));
    }

    return data;
  };

  return {
    latitude,
    longitude,
    timezone: "auto",
    current: {
      time: new Date().toISOString(),
      temperature_2m: Math.round((Math.random() * 8 + (Math.abs(latitude) < 10 ? 25 : Math.abs(latitude) < 30 ? 20 : 15)) * 10) / 10,
      relative_humidity_2m: Math.round(Math.random() * 30 + 60),
      weathercode: [0, 1, 2, 3][Math.floor(Math.random() * 4)]
    },
    daily: generateDailyData(),
    daily_units: {
      temperature_2m_max: "°C",
      temperature_2m_min: "°C",
      precipitation_sum: "mm",
      weathercode: "WMO code",
      uv_index_max: "Index"
    },
    hourly: generateHourlyData(),
    hourly_units: {
      temperature_2m: "°C",
      relative_humidity_2m: "%",
      precipitation: "mm",
      weathercode: "WMO code",
      uv_index: "Index"
    }
  };
};
