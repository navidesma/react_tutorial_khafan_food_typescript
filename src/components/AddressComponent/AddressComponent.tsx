import styles from "./AddressComponent.module.css";

import React from "react";
import MapComponent, { MapPositionType } from "@/components/MapComponent/MapComponent.tsx";
import { AddressType } from "@/interfaces.ts";
import { Link } from "react-router-dom";
import Button from "@/components/Button/Button.tsx";

export default function AddressComponent({ address }: { address: AddressType }) {
    const [position, setPosition] = React.useState<MapPositionType | undefined>({
        lat: address.latitude,
        lng: address.longitude,
    });

    return (
        <div className={styles.container}>
            <MapComponent
                {...{
                    position,
                    setPosition,
                    width: "200px",
                    height: "200px",
                    lockedPosition: true,
                }}
            />
            <h3>عنوان آدرس: {address.title}</h3>
            <p>توضیحات: {address.description}</p>
            <p>شماره تماس: {address.mobile}</p>
            <Link to={`/manage-address/${address.id}`}>
                <Button fullWidthOnMobile>ویرایش آدرس</Button>
            </Link>
        </div>
    );
}
