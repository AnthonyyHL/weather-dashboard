
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Search } from "lucide-react";

interface LocationSelectorProps {
  onLocationChange: (latitude: number, longitude: number, cityName: string) => void;
  currentLocation: {
    latitude: number;
    longitude: number;
    cityName: string;
  };
}

const LocationSelector = ({ onLocationChange, currentLocation }: LocationSelectorProps) => {
  const [selectedCity, setSelectedCity] = useState(currentLocation.cityName);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [useCustomCoordinates, setUseCustomCoordinates] = useState(false);

  // Predefined cities with their coordinates
  const cities = [
    { name: "Quito, Ecuador", lat: -0.1807, lng: -78.4678 },
    { name: "Guayaquil, Ecuador", lat: -2.1894, lng: -79.8890 },
    { name: "Cuenca, Ecuador", lat: -2.9001, lng: -79.0059 },
    { name: "Ambato, Ecuador", lat: -1.2542, lng: -78.6269 },
    { name: "Machala, Ecuador", lat: -3.2581, lng: -79.9553 },
    { name: "Santo Domingo, Ecuador", lat: -0.2500, lng: -79.1750 },
    { name: "Manta, Ecuador", lat: -0.9537, lng: -80.7286 },
    { name: "Portoviejo, Ecuador", lat: -1.0548, lng: -80.4534 },
    { name: "Loja, Ecuador", lat: -3.9928, lng: -79.2042 },
    { name: "Esmeraldas, Ecuador", lat: 0.9592, lng: -79.6566 },
    { name: "Madrid, España", lat: 40.4168, lng: -3.7038 },
    { name: "Barcelona, España", lat: 41.3851, lng: 2.1734 },
    { name: "Valencia, España", lat: 39.4699, lng: -0.3763 },
    { name: "Nueva York, EE.UU.", lat: 40.7128, lng: -74.0060 },
    { name: "Los Ángeles, EE.UU.", lat: 34.0522, lng: -118.2437 },
    { name: "Chicago, EE.UU.", lat: 41.8781, lng: -87.6298 },
    { name: "Londres, Reino Unido", lat: 51.5074, lng: -0.1278 },
    { name: "París, Francia", lat: 48.8566, lng: 2.3522 },
    { name: "Berlín, Alemania", lat: 52.5200, lng: 13.4050 },
    { name: "Roma, Italia", lat: 41.9028, lng: 12.4964 },
    { name: "Tokio, Japón", lat: 35.6762, lng: 139.6503 },
    { name: "Sídney, Australia", lat: -33.8688, lng: 151.2093 },
    { name: "São Paulo, Brasil", lat: -23.5505, lng: -46.6333 },
    { name: "Buenos Aires, Argentina", lat: -34.6118, lng: -58.3960 },
    { name: "Lima, Perú", lat: -12.0464, lng: -77.0428 },
    { name: "Bogotá, Colombia", lat: 4.7110, lng: -74.0721 },
    { name: "Ciudad de México, México", lat: 19.4326, lng: -99.1332 },
  ];

  const handleCitySelection = (cityName: string) => {
    setSelectedCity(cityName);
    const selectedCityData = cities.find(city => city.name === cityName);
    
    if (selectedCityData) {
      if (useCustomCoordinates && latitude && longitude) {
        const lat = parseFloat(latitude);
        const lng = parseFloat(longitude);
        
        if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
          onLocationChange(lat, lng, cityName);
        } else {
          // Use default coordinates if custom ones are invalid
          onLocationChange(selectedCityData.lat, selectedCityData.lng, cityName);
        }
      } else {
        onLocationChange(selectedCityData.lat, selectedCityData.lng, cityName);
      }
    }
  };

  const handleCustomCoordinatesToggle = () => {
    setUseCustomCoordinates(!useCustomCoordinates);
    if (!useCustomCoordinates) {
      setLatitude("");
      setLongitude("");
    }
  };

  const handleApplyCustomCoordinates = () => {
    if (!selectedCity) {
      alert("Por favor, selecciona una ciudad primero");
      return;
    }

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    
    if (isNaN(lat) || isNaN(lng)) {
      alert("Por favor, ingresa coordenadas válidas");
      return;
    }
    
    if (lat < -90 || lat > 90) {
      alert("La latitud debe estar entre -90 y 90");
      return;
    }
    
    if (lng < -180 || lng > 180) {
      alert("La longitud debe estar entre -180 y 180");
      return;
    }

    onLocationChange(lat, lng, selectedCity);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin size={20} />
          <span>Seleccionar Ubicación *</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* City Selection - Mandatory */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Ciudad * (Obligatorio)
          </Label>
          <Select value={selectedCity} onValueChange={handleCitySelection}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona una ciudad..." />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {cities.map((city) => (
                <SelectItem key={city.name} value={city.name}>
                  {city.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Custom Coordinates - Optional */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">
              Coordenadas Personalizadas (Opcional)
            </Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleCustomCoordinatesToggle}
            >
              {useCustomCoordinates ? "Ocultar" : "Personalizar"}
            </Button>
          </div>
          
          {useCustomCoordinates && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="latitude" className="text-xs">
                    Latitud
                  </Label>
                  <Input
                    id="latitude"
                    type="number"
                    step="0.0001"
                    placeholder="-1.25"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    className="text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="longitude" className="text-xs">
                    Longitud
                  </Label>
                  <Input
                    id="longitude"
                    type="number"
                    step="0.0001"
                    placeholder="-78.25"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    className="text-sm"
                  />
                </div>
              </div>
              
              <Button
                type="button"
                onClick={handleApplyCustomCoordinates}
                className="w-full"
                size="sm"
                disabled={!selectedCity || !latitude || !longitude}
              >
                <Search size={16} className="mr-2" />
                Aplicar Coordenadas Personalizadas
              </Button>
            </>
          )}
        </div>

        {!selectedCity && (
          <p className="text-sm text-amber-600 bg-amber-50 p-2 rounded">
            ⚠️ Debes seleccionar una ciudad para continuar
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default LocationSelector;
