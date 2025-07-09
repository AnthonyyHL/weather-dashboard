import { useEffect, useState } from 'react';
import { OpenMeteoResponse } from '../../types/DashboardTypes';

const DataFetcher = ({latitude, longitud}:{latitude: string, longitud: string}) => {
  const [data, setData] = useState<OpenMeteoResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitud}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America%2FChicago`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result: any = await response.json();

        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log("DataFetcher - data:", data);

  return { data, loading, error };
};

export default DataFetcher;
