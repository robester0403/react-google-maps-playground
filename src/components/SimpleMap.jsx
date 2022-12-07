import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import React, { useEffect, useState } from "react";

//  center on current location onload
//v 1. make a map with a marker
//  3. make a map with a marker and a info window and a button
//  4. import polyline
//  5. we are the bus so load the bus marker and have it move on the map when the lat long coords change

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 43.6532,
  lng: -79.3832,
};

const markerMap = [
  {
    lat: 43.6532,
    lng: -79.3832,
  },
  { lat: 43.32, lng: -79.332 },
  { lat: 43.532, lng: -79.3532 },
  { lat: 43.12, lng: -79.42 },
];

const polylinePath = [
  {
    lat: 43.6532,
    lng: -79.3832,
  },
  { lat: 43.32, lng: -79 },
  { lat: 43.532, lng: -79.3532 },
  { lat: 43.12, lng: -79.42 },
];

const polylineOptions = {
  strokeColor: "#FF0000",
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: "#FF0000",
  fillOpacity: 0.35,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 30000,
  zIndex: 1,
};

const YOUR_API_KEY = "enter API key here";

export default function SimpleMap() {
  const [currentLocation, setCurrentLocation] = useState(null);
  console.log(currentLocation);
  const success = (position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    console.log(lat, lng);
    setCurrentLocation({ lat, lng });
  };

  const error = () => {
    console.log("error");
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  return (
    <LoadScript googleMapsApiKey={YOUR_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentLocation}
        zoom={10}
      >
        {markerMap &&
          markerMap.map((marker, _) => {
            return <Marker position={marker} clickable />;
          })}

        {polylinePath && (
          <Polyline path={polylinePath} options={polylineOptions} />
        )}
      </GoogleMap>
    </LoadScript>
  );
}
