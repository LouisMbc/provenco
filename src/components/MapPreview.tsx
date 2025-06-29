'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Ville } from '@/types/database';

// Configuration des icônes Leaflet (nécessaire pour Next.js)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Icône plus petite pour l'aperçu
const previewIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [20, 33],
  iconAnchor: [10, 33],
  popupAnchor: [1, -34],
  shadowSize: [33, 33]
});

interface MapPreviewProps {
  villes: Ville[];
}

// Composant pour ajuster la vue de la carte d'aperçu
const PreviewMapUpdater = ({ villes }: { villes: Ville[] }) => {
  const map = useMap();

  useEffect(() => {
    // Désactiver toutes les interactions pour l'aperçu
    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((map as any).tap) (map as any).tap.disable();

    if (villes.length > 0) {
      const validVilles = villes.filter(ville => 
        ville.latitude !== null && ville.longitude !== null
      );

      if (validVilles.length > 1) {
        // Plusieurs villes : ajuster la vue pour toutes les inclure
        const bounds = L.latLngBounds(
          validVilles.map(ville => [ville.latitude!, ville.longitude!])
        );
        map.fitBounds(bounds, { padding: [10, 10] });
      } else if (validVilles.length === 1) {
        // Une seule ville : centrer dessus
        const ville = validVilles[0];
        map.setView([ville.latitude!, ville.longitude!], 10);
      }
    } else {
      // Aucune ville : vue par défaut sur la Provence
      map.setView([43.8, 6.0], 8);
    }
  }, [map, villes]);

  return null;
};

export default function MapPreview({ villes }: MapPreviewProps) {
  // Position par défaut : centre de la Provence
  const defaultCenter: [number, number] = [43.8, 6.0];
  const defaultZoom = 8;

  return (
    <div className="h-full w-full relative">
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <PreviewMapUpdater villes={villes} />

        {villes.map((ville) => {
          if (ville.latitude === null || ville.longitude === null) {
            return null;
          }

          return (
            <Marker
              key={ville.id}
              position={[ville.latitude!, ville.longitude!]}
              icon={previewIcon}
            />
          );
        })}
      </MapContainer>
      
      {/* Overlay pour indiquer que c'est cliquable */}
      <div className="absolute inset-0 bg-transparent cursor-pointer"></div>
    </div>
  );
}
