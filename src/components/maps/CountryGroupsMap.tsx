import 'ol/ol.css';
import OpenLayersMap from "./OpenLayersMap";
import { useRef } from "react";
import { Box } from '@mui/material';

interface ICountries{
    gname: string;
    count: number
}

interface props{
    mode: "light" | "dark";
    data: ICountries[];
    latitude: number;
    longitude: number;
    countryName: string;
}
  
export default function CountryGroups({data, mode, latitude, longitude, countryName}:props) {
    const mapRef = useRef<HTMLDivElement | null>(null);
    return (
      <Box ref={mapRef} sx={{ width: '150vh', height: '50vh', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',filter:mode === 'light' ? '' : 'brightness(0.5)'}} >
        {<Box sx={{ width: '100%', height: '100%' }}>
            <OpenLayersMap markers={[{location: [longitude, latitude], info: [{name: "Coutry:", value: countryName}, ...data.map((group, index) => ({name: `Group ${index + 1}:`, value: group.gname}))]}]} />
        </Box>}
      </Box>
    );
}
