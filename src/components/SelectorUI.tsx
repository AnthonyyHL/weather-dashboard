import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';

export default function SelectorUI({ setLatitude, setLongitud }: { setLatitude: (lat: string) => void; setLongitud: (lon: string) => void; }) {
    const [cityInput, setCityInput] = useState<string>("");
    
    const handleChange = (event: SelectChangeEvent<string>) => {
        // setCityInput(event.target.value);
        if (event.target.value === "guayaquil") {
            setCityInput("guayaquil");
            setLatitude("-2.170997");
            setLongitud("-79.922359");
        }
        else if (event.target.value === "quito") {
            setCityInput("quito");
            setLatitude("-0.22985");
            setLongitud("-78.52495");
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