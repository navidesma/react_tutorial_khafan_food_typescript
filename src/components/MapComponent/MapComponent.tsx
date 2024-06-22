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
    width?: string;
    height?: string;
    lockedPosition?: boolean;
}

const LocationMarker: React.FC<{
    setPosition: React.Dispatch<React.SetStateAction<MapPositionType | undefined>> | undefined;
}> = ({ setPosition }) => {
    useMapEvents({
        click(e) {
            if (!setPosition) return;

            setPosition(e.latlng);
        },
    });

    return null;
};

export const initialPosition = { lat: 35.69967758850624, lng: 51.337997205555446 };

export default function MapComponent({
    position,
    setPosition,
    width,
    height,
    lockedPosition,
}: PropType) {
    if (!position) {
        return <></>;
    }
    return (
        <>
            <MapContainer
                center={position}
                zoom={13}
                className={styles.container}
                style={{ width: width || undefined, height: height || undefined }}
            >
                <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                <Marker position={position}>
                    <Popup>لوکیشن شما</Popup>
                </Marker>
                <LocationMarker setPosition={lockedPosition ? undefined : setPosition} />
            </MapContainer>
        </>
    );
}
