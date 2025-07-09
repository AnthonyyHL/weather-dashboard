import { Hourly } from '@/types/DashboardTypes';
import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';

const arrValues1 = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const arrValues2 = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const arrLabels = ['A','B','C','D','E','F','G'];


export default function ChartUI({time, temperature_2m, wind_speed_10m}: Hourly) {
    return (
        <>
            <Typography variant="h5" component="div">
                Chart arrLabels vs arrValues1 & arrValues2
            </Typography>
            <LineChart
                height={300}
                series={[
                { data: temperature_2m, label: 'value1'},
                { data: wind_speed_10m, label: 'value2'},
                ]}
                xAxis={[{ scaleType: 'point', data: time }]}
            />
        </>
    );
}