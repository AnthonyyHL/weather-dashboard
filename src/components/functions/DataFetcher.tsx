import { useEffect, useState } from 'react';
import { RootInterface } from '../../types/DashboardTypes';

const DataFetcher = () => {
  const [data, setData] = useState<RootInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America%2FChicago');
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

  return { data, loading, error };
};

export default DataFetcher;
