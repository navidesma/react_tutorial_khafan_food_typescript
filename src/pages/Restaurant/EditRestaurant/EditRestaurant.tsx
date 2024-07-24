import styles from "./EditRestaurant.module.css";
import { AddressType, RestaurantType } from "@/interfaces.ts";
import Main from "@/components/Main/Main.tsx";
import React from "react";
import useInputValidator from "@/util/useInputValidator.ts";
import Input from "@/components/Input/Input.tsx";
import Button from "@/components/Button/Button.tsx";
import useSendRequest from "@/util/useSendRequest.ts";
import Select from "@/components/Select/Select.tsx";
import { Link, useNavigate } from "react-router-dom";
import SelectOption from "@/components/Select/SelectOption.tsx";
import useError from "@/util/useError.ts";

interface SubmitType {
    name: string;
    address: number;
}

export default function EditRestaurant() {
    const [restaurant, setRestaurant] = React.useState<RestaurantType>();
    const [addresses, setAddress] = React.useState<AddressType[]>();
    const [selectedAddress, setSelectedAddress] = React.useState("");

    const nameInputState = useInputValidator();

    const sendRequest = useSendRequest();

    const navigate = useNavigate();

    const [addressError, setAddressError] = useError();

    React.useEffect(() => {
        const send = async () => {
            const restaurantRes = await sendRequest<RestaurantType>("food/restaurant/");

            const addressRes = await sendRequest<AddressType[]>("food/address/");

            if (restaurantRes.isOK && addressRes.isOK) {
                setRestaurant(restaurantRes.data);
                if (restaurantRes.data.address) {
                    setSelectedAddress(restaurantRes.data.address.toString());
                }
                setAddress(addressRes.data);
            }
        };

        send();
    }, []);

    React.useEffect(() => {
        if (restaurant) {
            nameInputState.setValue(restaurant.name || "");
        }
    }, [restaurant]);

    if (!restaurant) {
        return <></>;
    }

    const formSubmitHandler: React.FormEventHandler = async (event) => {
        event.preventDefault();

        if (!nameInputState.getIsValid()) return;

        if (!selectedAddress) {
            setAddressError(true);
            return;
        }

        const body: SubmitType = { name: nameInputState.value, address: +selectedAddress };

        const send = async () => {
            const restaurantRes = await sendRequest<RestaurantType>("food/restaurant/", {
                body,
                options: { method: "PATCH" },
            });
            if (restaurantRes.isOK) {
                navigate("/restaurant");
            }
        };
        send();
    };

    if (!addresses || addresses.length === 0) {
        return (
            <Main>
                <div className={styles.noAddressContainer}>
                    <h1>هیچ آدرسی تعریف نشده، حداقل یک آدرس تعریف کنید</h1>
                    <Link to={"/addresses"}>
                        <Button>مدیریت آدرس ها</Button>
                    </Link>
                </div>
            </Main>
        );
    }
    return (
        <Main>
            <form className={styles.container} onSubmit={formSubmitHandler}>
                <Input label={"نام رستوران"} {...nameInputState.props} />
                <Select
                    label={"آدرس"}
                    selectedValue={selectedAddress}
                    setValue={setSelectedAddress}
                >
                    <SelectOption value={""}>------</SelectOption>
                    {addresses.map((address) => (
                        <SelectOption value={address.id} key={address.id}>
                            {address.title}
                        </SelectOption>
                    ))}
                </Select>

                {addressError && <p style={{ color: "red" }}>آدرس را مشخص کنید</p>}

                <Button
                    type={"submit"}
                    color={"green"}
                    fullWidthOnMobile
                    style={{ padding: "1rem 2rem", margin: "0 auto", display: "block" }}
                >
                    ویرایش
                </Button>
            </form>
        </Main>
    );
}
