// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Index from "./pages/Index";
// import NotFound from "./pages/NotFound";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Index />} />
//           {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;
import Grid from '@mui/material/Grid'
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';

import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';

import DataFetcher from './components/functions/DataFetcher';
import { Hourly } from '@/types/DashboardTypes';

import { useState } from 'react';

function App() {
    const [latitude, setLatitude] = useState<string>("0");
    const [longitud, setLongitud] = useState<string>("0");
    const dataFetcherOutput = DataFetcher({latitude, longitud});

     return (
      <>
         <Grid>
             <HeaderUI/>
         </Grid>

         <Grid
             container justifyContent="right" alignItems="center">

             <AlertUI description="No se preveen lluvias"/>

             <SelectorUI
                setLatitude={setLatitude}
                setLongitud={setLongitud}
             ></SelectorUI>

             {/* Indicadores */}
             <Grid container size={{ xs: 12, md: 9 }} >

                 {/* Renderizado condicional de los datos obtenidos */}

                 {dataFetcherOutput.loading && <p>Cargando datos...</p>}
                 {dataFetcherOutput.error && <p>Error: {dataFetcherOutput.error}</p>}
                 {dataFetcherOutput.data && (
                 <>

                     {/* Indicadores con datos obtenidos */}

                     <Grid size={{ xs: 12, md: 3 }} >
                         <IndicatorUI
                             title='Temperatura (2m)'
                             description={dataFetcherOutput.data.current.temperature_2m + " " + dataFetcherOutput.data.current_units.temperature_2m} />
                     </Grid>

                     <Grid size={{ xs: 12, md: 3 }}>
                         <IndicatorUI
                             title='Temperatura aparente'
                             description={dataFetcherOutput.data.current.apparent_temperature + " " + dataFetcherOutput.data.current_units.apparent_temperature} />
                     </Grid>

                     <Grid size={{ xs: 12, md: 3 }}>
                         <IndicatorUI
                             title='Velocidad del viento'
                             description={dataFetcherOutput.data.current.wind_speed_10m + " " + dataFetcherOutput.data.current_units.wind_speed_10m} />
                     </Grid>

                     <Grid size={{ xs: 12, md: 3 }}>
                         <IndicatorUI
                             title='Humedad relativa'
                             description={dataFetcherOutput.data.current.relative_humidity_2m + " " + dataFetcherOutput.data.current_units.relative_humidity_2m} />
                     </Grid>

                    {/* Gráfico */}
                    <Grid size={{ xs: 6, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
                        <ChartUI
                            time={dataFetcherOutput.data.hourly.time}
                            temperature_2m={dataFetcherOutput.data.hourly.temperature_2m}
                            wind_speed_10m={dataFetcherOutput.data.hourly.wind_speed_10m}
                        />
                    </Grid>

                    {/* Tabla */}
                    <Grid size={{ xs: 6, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
                        {dataFetcherOutput.data && (<TableUI
                            time={dataFetcherOutput.data.hourly.time}
                            temperature_2m={dataFetcherOutput.data.hourly.temperature_2m}
                            wind_speed_10m={dataFetcherOutput.data.hourly.wind_speed_10m}
                        />)}
                    </Grid>

                 </>
                 )}

             </Grid>

         </Grid>
      </>
     )
 }

 export default App;