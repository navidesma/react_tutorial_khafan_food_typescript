import styles from "./MapComponent.module.css";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";

export interface MapPositionType {
    lat: number;
    lng: number;
}

interface PropType {
    position: MapPositionType | undefined;
    setPosition: React.Dispatch<React.SetStateAction<MapPositionType | undefined>>;
}

const LocationMarker: React.FC<{
    setPosition: React.Dispatch<React.SetStateAction<MapPositionType | undefined>>;
}> = ({ setPosition }) => {
    useMapEvents({
        click(e) {
            setPosition(e.latlng);
        },
    });

    return null;
};

const initialPosition = { lat: 35.69967758850624, lng: 51.337997205555446 };

export default function MapComponent({ position, setPosition }: PropType) {
    React.useEffect(() => {
        if (!position) {
            setPosition(initialPosition);
        }
    }, [position]);

    if (!position) {
        return <></>;
    }
    return (
        <>
            <MapContainer center={position} zoom={13} className={styles.container}>
                <TileLayer
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                    <Popup>لوکیشن شما</Popup>
                </Marker>
                <LocationMarker setPosition={setPosition} />
            </MapContainer>
            <h3>Current Position:</h3>
            <p>Latitude: {position.lat}</p>
            <p>Longitude: {position.lng}</p>
        </>
    );
}
