import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { FeatureCollection, Point } from "geojson";
import { jawaTimurData } from "@/types/jawatimur";

// Define interface Location
interface Location {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  umkm_count: number;
}

const MapOne: React.FC = () => {
  const mapRef = useRef<any>(null); // useRef with null type
  const center: LatLngExpression = [-7.6145, 112.7138];
  const [locations, setLocations] = useState<Location[]>([]);
  const customIconUrl =
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png";

  useEffect(() => {
    fetch("http://localhost:8000/api/chart-data")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data && Array.isArray(data.labels) && Array.isArray(data.values)) {
          const mappedData = data.labels.map(
            (label: string, index: number) => ({
              id: index, // or a more appropriate unique id
              name: label,
              latitude:
                jawaTimurData.find((item) => item.name === label)?.latitude ||
                0,
              longitude:
                jawaTimurData.find((item) => item.name === label)?.longitude ||
                0,
              umkm_count: data.values[index],
            })
          );
          setLocations(mappedData);
        } else {
          console.error("Unexpected data structure from API");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Optionally, setLocations([]); or handle error state
      });
  }, []);

  useEffect(() => {
  }, [locations]);

  // Define custom icon from web URL
  const customIcon = L.icon({
    iconUrl: customIconUrl,
    iconSize: [25, 41], // size of the icon
    iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
    popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
    tooltipAnchor: [16, -28], // point from which the tooltip should open relative to the iconAnchor
  });

  // Example GeoJSON data (replace with your actual GeoJSON data)
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

        {/* Render GeoJSON layer */}
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
