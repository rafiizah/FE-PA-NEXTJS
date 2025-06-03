// src/components/MapOne.tsx

import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { FeatureCollection, Point } from "geojson";
import { MapDataService } from "@/services/MapDataInstance";
import { Location } from "@/types/map";

const MapOne: React.FC = () => {
  const mapRef = useRef<any>(null);
  const center: LatLngExpression = [-7.6145, 112.7138];
  const [locations, setLocations] = useState<Location[]>([]);
  const customIconUrl =
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png";

  useEffect(() => {
    const mapDataService = MapDataService.getInstance();
    mapDataService.fetchMapData().then((data) => {
      setLocations(data);
    });
  }, []);

  // Define custom icon
  const customIcon = L.icon({
    iconUrl: customIconUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
  });

  // Generate GeoJSON data
  const geojsonData: FeatureCollection<Point, any> = {
    type: "FeatureCollection",
    features: locations.map((location) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [location.longitude, location.latitude],
      },
      properties: {
        name: location.name,
        umkm_count: location.umkm_count,
      },
    })),
  };

  return (
    <div>
      <MapContainer
        ref={mapRef}
        center={center}
        zoom={8}
        scrollWheelZoom={false}
        style={{ height: "80vh", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {Array.isArray(locations) && locations.length > 0 && (
          <GeoJSON
            data={geojsonData}
            pointToLayer={(geoJsonPoint, latlng) =>
              L.marker(latlng, { icon: customIcon }).bindPopup(
                `<strong>${geoJsonPoint.properties.name}</strong><br />UMKM Count: ${geoJsonPoint.properties.umkm_count}`
              )
            }
          />
        )}
      </MapContainer>
    </div>
  );
};

export default MapOne;
