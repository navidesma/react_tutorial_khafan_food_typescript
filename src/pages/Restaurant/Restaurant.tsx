import Main from "@/components/Main/Main.tsx";
import useSendRequest from "@/util/useSendRequest.ts";
import React, { useState } from "react";
import { RestaurantType } from "@/interfaces.ts";
import { Link } from "react-router-dom";
import Button from "@/components/Button/Button.tsx";
import MapComponent, { MapPositionType } from "@/components/MapComponent/MapComponent.tsx";

export default function Restaurant() {
    const [restaurant, setRestaurant] = React.useState<RestaurantType>();
    const [position, setPosition] = useState<MapPositionType>();

    const sendRequest = useSendRequest();

    React.useEffect(() => {
        const send = async () => {
            const res = await sendRequest<RestaurantType>("food/restaurant/");

            if (res.isOK) {
                setRestaurant(res.data);
            }
        };

        send();
    }, []);

    if (!restaurant) {
        return <></>;
    }

    return (
        <Main>
            {!restaurant.is_creation_completed && (
                <Link to={"/restaurant/edit-restaurant"}>
                    <Button>ویرایش اطلاعات رستوران</Button>
                </Link>
            )}
            <MapComponent {...{ position, setPosition }} />
        </Main>
    );
}
