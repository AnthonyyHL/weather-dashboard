
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface WeatherChartsProps {
  data?: any;
}

const WeatherCharts = ({ data }: WeatherChartsProps) => {
  if (!data?.hourly) return null;

  // Prepare hourly temperature data (next 24 hours)
  const hourlyTempData = data.hourly.time.slice(0, 24).map((time: string, index: number) => ({
    time: new Date(time).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
    temperature: data.hourly.temperature_2m[index],
    humidity: data.hourly.relative_humidity_2m[index]
  }));

  // Prepare daily precipitation data (next 7 days)
  const dailyPrecipData = data.daily.time.map((time: string, index: number) => ({
    day: new Date(time).toLocaleDateString('es-ES', { weekday: 'short' }),
    precipitation: data.daily.precipitation_sum[index],
    maxTemp: data.daily.temperature_2m_max[index],
    minTemp: data.daily.temperature_2m_min[index]
  }));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">
        Evolución del Clima
      </h2>
      
      <Tabs defaultValue="temperature" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="temperature">Temperatura (24h)</TabsTrigger>
          <TabsTrigger value="precipitation">Precipitación (7d)</TabsTrigger>
          <TabsTrigger value="weekly">Resumen Semanal</TabsTrigger>
        </TabsList>

        <TabsContent value="temperature">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>Temperatura y Humedad - Próximas 24 horas</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={hourlyTempData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis 
                      dataKey="time" 
                      tick={{ fontSize: 12 }}
                      interval="preserveStartEnd"
                    />
                    <YAxis 
                      yAxisId="temp"
                      tick={{ fontSize: 12 }}
                      label={{ value: 'Temperatura (°C)', angle: -90, position: 'insideLeft' }}
                    />
                    <YAxis 
                      yAxisId="humidity"
                      orientation="right"
                      tick={{ fontSize: 12 }}
                      label={{ value: 'Humedad (%)', angle: 90, position: 'insideRight' }}
                    />
                    <Tooltip 
                      labelFormatter={(label) => `Hora: ${label}`}
                      formatter={(value, name) => [
                        `${value}${name === 'temperature' ? '°C' : '%'}`,
                        name === 'temperature' ? 'Temperatura' : 'Humedad'
                      ]}
                    />
                    <Line 
                      yAxisId="temp"
                      type="monotone" 
                      dataKey="temperature" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: '#1d4ed8' }}
                    />
                    <Line 
                      yAxisId="humidity"
                      type="monotone" 
                      dataKey="humidity" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ fill: '#10b981', strokeWidth: 2, r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="precipitation">
          <Card>
            <CardHeader>
              <CardTitle>Precipitación - Próximos 7 días</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyPrecipData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      label={{ value: 'Precipitación (mm)', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip 
                      formatter={(value) => [`${value} mm`, 'Precipitación']}
                    />
                    <Bar 
                      dataKey="precipitation" 
                      fill="#06b6d4"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly">
          <Card>
            <CardHeader>
              <CardTitle>Temperaturas Máximas y Mínimas - 7 días</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyPrecipData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      label={{ value: 'Temperatura (°C)', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip 
                      formatter={(value, name) => [
                        `${value}°C`,
                        name === 'maxTemp' ? 'Máxima' : 'Mínima'
                      ]}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="maxTemp" 
                      stroke="#ef4444" 
                      strokeWidth={3}
                      dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="minTemp" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WeatherCharts;
