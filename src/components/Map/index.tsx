import mapboxgl from 'mapbox-gl';
import { useEffect, useState } from 'react';

function useMap() {
  const [map, setMap] = useState(null);

  useEffect(() => {
    // TO MAKE THE MAP APPEAR YOU MUST
    // ADD YOUR ACCESS TOKEN FROM
    // https://account.mapbox.com
  }, []);

  return {
    createMap: (ref: any, params: { latitude: string; longitude: string }) => {
      const { latitude, longitude } = params;
      return new Promise((resolve) => {
        mapboxgl.accessToken =
          'pk.eyJ1IjoiZDNwb3J0aWxsbyIsImEiOiJja3ljam5qN24wcTBvMzBueGNtZ25mdXh0In0.KYOQ-CJFDcaEpyH-Ebe8iQ';
        const map = new mapboxgl.Map({
          container: ref, // container ID
          style: 'mapbox://styles/mapbox/streets-v11', // style URL
          center: [longitude, latitude], // starting position [lng, lat]
          zoom: 15, // starting zoom
        });
        setMap(map);
        resolve(map);
      });
    },
    addMarker: () => {
      if (!map) {
        alert('Map is not initialized!');
        return;
      }

      map.addControl(
        new mapboxgl.AttributionControl({
          customAttribution: 'Map design by me',
        })
      );
    },
  };
}

export default useMap;
