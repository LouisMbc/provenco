'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Ville } from '@/types/database';
import { useRouter } from 'next/navigation';

// Configuration des icônes Leaflet (nécessaire pour Next.js)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Icône personnalisée pour les villes de Provence
const provenceIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface ProvencoMapProps {
  villes: Ville[];
}

// Composant pour ajuster la vue de la carte en fonction des marqueurs
const MapViewUpdater = ({ villes }: { villes: Ville[] }) => {
  const map = useMap();

  useEffect(() => {
    if (villes.length > 0) {
      const validVilles = villes.filter(ville => 
        ville.latitude !== null && ville.longitude !== null
      );

      if (validVilles.length === 1) {
        // Une seule ville : centrer dessus
        const ville = validVilles[0];
        map.setView([ville.latitude!, ville.longitude!], 12);
      } else if (validVilles.length > 1) {
        // Plusieurs villes : ajuster la vue pour toutes les inclure
        const bounds = L.latLngBounds(
          validVilles.map(ville => [ville.latitude!, ville.longitude!])
        );
        map.fitBounds(bounds, { padding: [20, 20] });
      }
    } else {
      // Aucune ville : vue par défaut sur la Provence
      map.setView([43.8, 6.0], 8);
    }
  }, [map, villes]);

  return null;
};

export default function ProvencoMap({ villes }: ProvencoMapProps) {
  const router = useRouter();

  // Position par défaut : centre de la Provence
  const defaultCenter: [number, number] = [43.8, 6.0];
  const defaultZoom = 8;

  const handleVilleClick = (ville: Ville) => {
    router.push(`/villes/${ville.id}`);
  };

  return (
    <MapContainer
      center={defaultCenter}
      zoom={defaultZoom}
      style={{ height: '100%', width: '100%' }}
      className="rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <MapViewUpdater villes={villes} />

      {villes.map((ville) => {
        if (ville.latitude === null || ville.longitude === null) {
          return null;
        }

        return (
          <Marker
            key={ville.id}
            position={[ville.latitude!, ville.longitude!]}
            icon={provenceIcon}
            eventHandlers={{
              click: () => handleVilleClick(ville),
            }}
          >
            <Popup>
              <div className="text-center p-2">
                <h3 className="font-semibold text-amber-900 text-lg">
                  {ville.nom}
                </h3>
                {ville.region && (
                  <p className="text-amber-600 text-sm mb-2">{ville.region}</p>
                )}
                <button
                  onClick={() => handleVilleClick(ville)}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                >
                  Découvrir →
                </button>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

// Export nommé pour la compatibilité
export { ProvencoMap };
