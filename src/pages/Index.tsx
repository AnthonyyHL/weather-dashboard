
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WeatherDashboard from "../components/weather/WeatherDashboard";

const queryClient = new QueryClient();

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <WeatherDashboard />
    </div>
  );
};

export default Index;
