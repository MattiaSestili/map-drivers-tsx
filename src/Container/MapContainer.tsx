import React, { useCallback, useEffect, useState } from 'react';
import { GoogleMap, LoadScript } from "@react-google-maps/api"
import { DriverSlider } from '../Components/DriverSlider';
import { MapMarkers } from '../Components/MapMarkers';
import { CSSProperties } from '@material-ui/styles';

type Locations = {
  latitude: number
  longitude: number,
  bearing: number
}

export interface Drivers {
  driver_id: string,
  location: Locations;
}

export interface DriversInfo {
  drivers: Drivers[];
  pickup_eta: number
}

const API_KEY = process.env.REACT_APP_API_KEY as string;

export const defaultCenter = {
  lat: 51.5049375, lng: -0.0964509
}

export const MapContainer = () => {
  const [drivers, setDrivers] = useState<DriversInfo>(null);
  const [visibleDrivers, setVisibleDrivers] = useState(10);

  const mapStyles: CSSProperties = {
    height: "100vh",
    width: "100%"
  };

  const _fetchLocations = useCallback(async () => {
    const response = await fetch(`http://localhost:8080/https://qa-interview-test.splytech.dev/api/drivers?latitude=51.5049375&longitude=-0.0964509&count=${visibleDrivers}`)
    const drivers = await response.json();
    setDrivers(drivers)
  }, [visibleDrivers]);

  useEffect(() => {
    _fetchLocations()
  }, [_fetchLocations])

  const _updateSlider = (value: number) => {
    setVisibleDrivers(value)
  }

  return (
    <LoadScript
      googleMapsApiKey={API_KEY}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={defaultCenter}
      >
        <MapMarkers Items={drivers} />
        <DriverSlider UpdateSlider={_updateSlider} VisibleDrivers={visibleDrivers} />
      </GoogleMap>
    </LoadScript>
  )
}