import styles from "./RestaurantInfo.module.css";
import { RestaurantType } from "@/interfaces.ts";
import Main from "@/components/Main/Main.tsx";
import React from "react";
import useInputValidator from "@/util/useInputValidator.ts";
import Input from "@/components/Input/Input.tsx";
import Button from "@/components/Button/Button.tsx";
import useSendRequest from "@/util/useSendRequest.ts";

export default function RestaurantInfo() {
    const [restaurant, setRestaurant] = React.useState<RestaurantType>();

    const nameInputState = useInputValidator();

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
    };
    return (
        <Main>
            <form className={styles.container} onSubmit={formSubmitHandler}>
                <Input label={"نام رستوران"} {...nameInputState.props} />

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
