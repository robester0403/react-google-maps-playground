import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import bus from "../assets/bus.png";
import SmartInfoWindow from "./SmartInfoWindow";
//  center on current location onload
//v 1. make a map with a marker
//  3. make a map with a marker and a info window and a button
//  4. import polyline
//  5. we are the bus so load the bus marker and have it move on the map when the lat long coords change

const containerStyle = {
  width: "100vw",
  height: "100vh",
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
    lat: 43.64928,
    lng: -79.371398,
  },
  { lat: 43.651454, lng: -79.372342 },
  { lat: 43.657266, lng: -79.353385 },
  { lat: 43.669869, lng: -79.357719 },
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



export default function SimpleMap() {
  const [currentLocation, setCurrentLocation] = useState({});
  const [open, setOpen] = useState(false);

  const success = (position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    setCurrentLocation({ id: 1, position: { lat, lng } });
  };
  console.log(open);
  const error = () => {
    console.log("error");
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  const handleClick = () => {
    for (let i = 0; i < polylinePath.length; i++) {
      setTimeout(() => {
        setCurrentLocation(polylinePath[i]);
      }, 1500 * i);
    }
  };

  return (
    <>
      <button onClick={handleClick}>Click to start</button>
      <LoadScript googleMapsApiKey={YOUR_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentLocation.position}
          zoom={10}
        >
          {currentLocation && (
            <Marker
              position={currentLocation.position}
              icon={bus}
              onClick={() => setOpen(true)}
            >
              {currentLocation && (
                <SmartInfoWindow
                  open={open}
                  position={currentLocation}
                  onCloseClick={() => setOpen(false)}
                >
                  <div>Hello</div>
                </SmartInfoWindow>
              )}
            </Marker>
          )}

          {markerMap &&
            markerMap.map((marker, _) => {
              return <Marker position={marker} clickable />;
            })}

          {polylinePath && (
            <Polyline path={polylinePath} options={polylineOptions} />
          )}
        </GoogleMap>
      </LoadScript>
    </>
  );
}
