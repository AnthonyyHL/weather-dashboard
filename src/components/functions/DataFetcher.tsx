import { useEffect, useState } from 'react';
import { OpenMeteoResponse } from '../../types/DashboardTypes';

const CACHE_DURATION_MINUTES = 10;
const getCacheKey = (lat: string, lon: string) => `open-meteo-${lat}-${lon}`;


const DataFetcher = ({latitude, longitude}:{latitude: string, longitude: string}) => {
  const [data, setData] = useState<OpenMeteoResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {

      if (latitude === "0" && longitude === "0") {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      const cacheKey = getCacheKey(latitude, longitude);
      const cached = localStorage.getItem(cacheKey);

      if (cached) {
        try {
          const { timestamp, data } = JSON.parse(cached);
          const age = (Date.now() - timestamp) / 1000 / 60; // minutos
          if (age < CACHE_DURATION_MINUTES) {
            setData(data);
            setLoading(false);
            return;
          }
        } catch (e) {
          // Si hay error en el parseo, ignora el cache
        }
      }

//      try {
//         const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America%2FChicago`);
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const result: any = await response.json();

//         setData(result);
//       } catch  (err) {
//         setError(err instanceof Error ? err.message : 'An error occurred');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [latitude, longitude]);

//   return { data, loading, error };
// };

// export default DataFetcher;
      try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America%2FChicago`);
        if (!response.ok) throw new Error('Network response was not ok');
        const result: any = await response.json();
        setData(result);
        localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), data: result }));
      } catch (err) {
        // Si hay error y hay cache, úsalo
        if (cached) {
          try {
            const { data } = JSON.parse(cached);
            setData(data);
          } catch (e) {
            setError(err instanceof Error ? err.message : 'An error occurred');
          }
        } else {
          setError(err instanceof Error ? err.message : 'An error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [latitude, longitude]);

  return { data, loading, error };
};

export default DataFetcher;