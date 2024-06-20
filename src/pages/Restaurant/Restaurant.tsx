import Main from "@/components/Main/Main.tsx";
import useSendRequest from "@/util/useSendRequest.ts";
import React from "react";
import { RestaurantType } from "@/interfaces.ts";

export default function Restaurant() {
    const [restaurant, setRestaurant] = React.useState<RestaurantType>();

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
            <h1>رستوران: {restaurant.name}</h1>
        </Main>
    );
}
