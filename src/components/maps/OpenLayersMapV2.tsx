import { useRef, useEffect, useState } from 'react';
import 'ol/ol.css'; 
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat, toLonLat} from 'ol/proj';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style, Icon } from 'ol/style';
import { Box } from '@mui/material';
export interface Marker<T> {
  location: [number, number];
  info: T
}
export interface MapComponentProps<T> {
  mode: "light" | "dark"
  markers: Marker<T>[];
  setEvent: (event: T)=> void
  setLat?: (lat: number) => void | null;
  setLng?: (lng: number) => void | null;
}

export default function OpenLayersMapV2<T>({ markers, setEvent, setLat, setLng,mode }: MapComponentProps<T>) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<Map | null>(null);
  const vectorSource = useRef<VectorSource>(new VectorSource());
  const featureArray = useRef<Feature[]>([]);
  useEffect(() => {
    const initialMap = new Map({
      target: mapRef.current!,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: vectorSource.current,
        }),
      ],
      view: new View({
        center: fromLonLat([35.2137, 31.7683]),
        zoom: 1,
      }),
    });
  
    initialMap.on('click', (event) => {
      const feature = initialMap.forEachFeatureAtPixel(event.pixel, (feat) => feat);
      if (feature) {
        const coordinate = (feature.getGeometry() as Point).getCoordinates();
        const info = feature.get('info');
        if (info && coordinate) {
            setEvent(info);
        }
      } else {
        popupRef.current!.style.display = 'none';
      }
      const [lon, lat] = initialMap.getCoordinateFromPixel(event.pixel);
      if (lat !== undefined && lon !== undefined) {
        const [geoLon, geoLat] = toLonLat([lon, lat]);
        if (setLat) setLat(geoLat);
        if (setLng) setLng(geoLon);
      }
    });
    
    setMap(initialMap);
  }, []);
  
  useEffect(() => {
    vectorSource.current.clear();
    markers.forEach((marker) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat(marker.location)),
        info: marker.info,
      });
      feature.setStyle(
        new Style({
          image: new Icon({
            src: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
            scale: 0.05,
            anchor: [0.5, 1],
          }),
        })
      );
      vectorSource.current.addFeature(feature);
      featureArray.current.push(feature); 
    });
  }, [markers]);
  return (
    <Box className="map-container" sx={{filter:mode === 'light' ? '' : 'brightness(0.5)' , position: 'relative', width: '100%', height: '100%' }}>
      <Box
        ref={mapRef}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
      <Box
        ref={popupRef}
        sx={{
          display: 'none',
          backgroundColor: 'white',
          border: '1px solid black',
          padding: '5px',
          borderRadius: '5px',
          position: 'absolute',
          zIndex: 10000,
          pointerEvents: 'none',
          fontSize: '12px',
        }}
      >
        <p>פרטים על המיקום</p>
      </Box>
    </Box>
  );
}