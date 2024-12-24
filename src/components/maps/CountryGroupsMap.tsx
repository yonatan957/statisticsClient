import 'ol/ol.css';
import { useRef, useState } from "react";
import { Box, List, ListItem, Paper, Typography } from '@mui/material';
import OpenLayersMapV2 from './OpenLayersMapV2';

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
    const [item, setItem] = useState<ICountries[]| null>(null);
    return (
      <Box sx={{gap: 2, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          לחץ על המיקום כדי לראות פרטים.
        </Typography>
              <Box ref={mapRef} sx={{ width: '150vh', height: '50vh', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',filter:mode === 'light' ? '' : 'brightness(0.5)'}} >
        {<Box sx={{ width: '100%', height: '100%' }}>
            <OpenLayersMapV2 mode={mode} setEvent={setItem} markers={[{location: [longitude, latitude], info: data}]} />
        </Box>}
      </Box>
        {item && (
        <Box sx={{ height: "50vh", overflow: 'auto' }}>
          <Paper className="ltr-box" elevation={3} sx={{ width: {md:'1000px' , xs: '100%'}, padding: 2, maxWidth: 400, marginTop: '10px', maxHeight: '40vh', overflowY: 'auto' }}>
            <Typography variant="h5" gutterBottom>{countryName}</Typography>
            <List>
                <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1" color="textSecondary">Group</Typography>
                  <Typography variant="body1">amount of casualties</Typography>
                </ListItem>
              {item.map((item, index) => (
                <ListItem key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1" color="textSecondary">{index + 1}. {item.gname}</Typography>
                  <Typography variant="body1">{item.count}</Typography>
                </ListItem>
              ))}
            </List>
          </Paper>
          </Box>
        )}
    </Box>
    );
}
