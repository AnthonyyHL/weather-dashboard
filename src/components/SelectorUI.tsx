import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';

export default function SelectorUI({ setLatitude, setLongitud }: { setLatitude: (lat: string) => void; setLongitud: (lon: string) => void; }) {
    const [cityInput, setCityInput] = useState<string>("");
    
    const handleChange = (event: SelectChangeEvent<string>) => {
        const selectedCity = event.target.value;
        setCityInput(selectedCity);
        
        // Definir las coordenadas para cada ciudad
        switch (selectedCity) {
            case "guayaquil":
                setLatitude("-2.170997");
                setLongitud("-79.922359");
                break;
            case "quito":
                setLatitude("-0.22985");
                setLongitud("-78.52495");
                break;
            case "manta":
                setLatitude("-0.9677");
                setLongitud("-80.7089");
                break;
            case "cuenca":
                setLatitude("-2.9001");
                setLongitud("-79.0059");
                break;
            default:
                setLatitude("0");
                setLongitud("0");
                break;
        }
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="city-select-label">Ciudad</InputLabel>
            <Select
                labelId="city-select-label"
                id="city-simple-select"
                label="Ciudad"
                onChange={handleChange}
                value={cityInput}>
                <MenuItem disabled><em>Seleccione una ciudad</em></MenuItem>
                <MenuItem value={"guayaquil"}>Guayaquil</MenuItem>
                <MenuItem value={"quito"}>Quito</MenuItem>
                <MenuItem value={"manta"}>Manta</MenuItem>
                <MenuItem value={"cuenca"}>Cuenca</MenuItem>
            </Select>

            {cityInput && (
                <p>
                    Información del clima en <span style={{textTransform: 'capitalize', fontWeight: 'bold'}}>{cityInput}</span>
                </p>
            )}

        </FormControl>
    )
}