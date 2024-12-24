import { useEffect, useState } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';
import 'ol/ol.css';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from '@mui/material';

interface CasualtyRegion {
  _id: string;
  country_txt: string;
  count: number;
  countKill: number;
  countWound: number;
  latitude: number;
  longitude: number;
  averageCasualties: number;
}

interface props{
  mode: "light" | "dark";
}

const CountryAttacks = ({mode}:props) => {
  const [data, setData] = useState<CasualtyRegion[]>([]);
  const [map, setMap] = useState<Map | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const[country_txt, setCountry] = useState("");
  const[countKill, setKill] = useState(0);
  const[countWound, setWound] = useState(0);
  const[averageCasualties, setAvarage] = useState(0);
  const[display, setDisplay] = useState<"none"| "block">("none");
  const [left, setLeft] = useState('');
  const [top, setTop] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/analysis/highest-casualty-regions`);
        const data: CasualtyRegion[] = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!map && data.length > 0) {
      const initialMap = new Map({
        target: 'map',
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: fromLonLat([0, 0]),
          zoom: 2,
        }),
      });

      const vectorSource = new VectorSource();
      data.forEach((item) => {
        const feature = new Feature({
          geometry: new Point(fromLonLat([item.longitude, item.latitude])),
          details: item,
        });
        feature.setStyle(
          new Style({
            image: new Icon({
              src: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
              scale: 0.05,
            }),
          })
        );
        vectorSource.addFeature(feature);
      });

      const vectorLayer = new VectorLayer({
        source: vectorSource,
      });

      initialMap.addLayer(vectorLayer);

      initialMap.on('pointermove', (event) => {
        const pixel = initialMap.getEventPixel(event.originalEvent);
        const hit = initialMap.hasFeatureAtPixel(pixel);
        if (hit) {
          const feature = initialMap.getFeaturesAtPixel(pixel)[0];
          const details: CasualtyRegion = feature.get('details');
          setCountry(details.country_txt);
          setKill(details.countKill);
          setWound(details.countWound);
          setAvarage(details.averageCasualties);
          setDisplay("block");
          setLeft(`${event.pixel[0] + 10}px`);
          setTop(`${event.pixel[1] + 10}px`);
        } else {
          setDisplay("none");}
      });

      setMap(initialMap);
    }
  }, [map, data]);

  return (
    <Box sx={{ width: '80%', height: '80vh', position: 'relative',marginBottom: 10 }}>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',height: '100vh',}}>
          <CircularProgress />
        </Box>)}
        <Box sx={{ marginBottom: 4 }}>
          <Typography variant="h3" gutterBottom>
            סטטיסטיקות אזורי פגיעות גבוהות
          </Typography>
          <Typography variant="body1" paragraph>
            בדף זה מוצגים נתונים חשובים אודות אזורים עם פגיעות רבות בעולם. כאן תוכלו
            לראות את מספר ההרוגים והפצועים בכל אזור, ולהשוות את האזורים השונים לפי
            קריטריונים כמו מספר הקורבנות הממוצע והפצועים. השתמשו במפה כדי לקבל תובנות
            מעמיקות לגבי הפגיעות ברחבי הגלובוס.
          </Typography>
        </Box>
      <Box id="map" sx={{ width: '100%', height: '90%', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',filter:mode === 'light' ? '' : 'brightness(0.5)'}} >
        <Box id = "tooltip"
          sx={{zIndex: 9999,
          direction: 'ltr',
          backgroundColor: 'primary.main',
          display: display, 
          position: 'absolute', 
          top: top, 
          left: left, 
          width: 'auto', 
          height: 'auto', 
          fontSize: '15px', 
          borderRadius: '5px', 
          padding: '5px', 
          color: 'text.primary' }}>
            <strong>Country:</strong> {country_txt}<br />
            <strong>Kills:</strong> {countKill}<br />
            <strong>Wounded:</strong> {countWound}<br />
            <strong>Average Casualties:</strong> {averageCasualties}
        </Box>
      </Box>
    </Box>
  );
};

export default CountryAttacks;