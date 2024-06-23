import Main from "@/components/Main/Main.tsx";
import useSendRequest from "@/util/useSendRequest.ts";
import React from "react";
import { AddressType, RestaurantType } from "@/interfaces.ts";
import { Link } from "react-router-dom";
import Button from "@/components/Button/Button.tsx";
import AddressComponent from "@/components/AddressComponent/AddressComponent.tsx";

export default function Restaurant() {
    const [restaurant, setRestaurant] = React.useState<RestaurantType>();
    const [address, setAddress] = React.useState<AddressType>();

    const sendRequest = useSendRequest();

    React.useEffect(() => {
        const send = async () => {
            const res = await sendRequest<RestaurantType>("food/restaurant/");

            if (res.isOK) {
                setRestaurant(res.data);
                if (res.data.address) {
                    const addressRes = await sendRequest<AddressType>(
                        `food/address/${res.data.address}/`,
                    );
                    if (addressRes.isOK) {
                        setAddress(addressRes.data);
                    }
                }
            }
        };

        send();
    }, []);

    if (!restaurant) {
        return <></>;
    }

    return (
        <Main>
            <Link to={"/restaurant/edit-restaurant"}>
                <Button>ویرایش اطلاعات رستوران</Button>
            </Link>
            {restaurant.is_creation_completed ? (
                <div>
                    <h1>نام رستوران: {restaurant.name}</h1>
                    <h2>آدرس:</h2>
                    {address && <AddressComponent address={address} />}
                </div>
            ) : (
                <h1>اطلاعات رستوران کامل نشده است، در بخش ویرایش دستوران آنرا کامل کنید. </h1>
            )}
        </Main>
    );
}
