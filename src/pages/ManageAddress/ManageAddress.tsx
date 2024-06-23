import styles from "@/pages/SignUp/SignUp.module.css";
import MapComponent, {
    initialPosition,
    MapPositionType,
} from "@/components/MapComponent/MapComponent.tsx";
import { AddressType } from "@/interfaces.ts";
import React from "react";
import useInputValidator from "@/util/useInputValidator.ts";
import Input from "@/components/Input/Input.tsx";
import TextArea from "@/components/Input/TextArea.tsx";
import { useNavigate, useParams } from "react-router-dom";
import useSendRequest from "@/util/useSendRequest.ts";
import Main from "@/components/Main/Main.tsx";
import Button from "@/components/Button/Button.tsx";

interface SubmitType {
    latitude: number;
    longitude: number;
    title: string;
    description: string;
    mobile: string;
}

export default function ManageAddress() {
    const { addressId } = useParams();

    const sendRequest = useSendRequest();
    const navigate = useNavigate();
    const [address, setAddress] = React.useState<AddressType>();
    const [position, setPosition] = React.useState<MapPositionType | undefined>(
        addressId ? undefined : initialPosition,
    );
    const titleInputState = useInputValidator({});
    const descriptionInputState = useInputValidator({});
    const mobileInputState = useInputValidator({
        minLength: 11,
        maxLength: 11,
    });

    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        if (error) {
            const setErrorToFalseTimeout = setTimeout(() => setError(false), 3000);

            return () => clearTimeout(setErrorToFalseTimeout);
        }
    }, [error]);

    React.useEffect(() => {
        if (addressId) {
            const send = async () => {
                const addressResponse = await sendRequest<AddressType>(`food/address/${addressId}`);

                if (addressResponse.isOK) {
                    setAddress(addressResponse.data);

                    titleInputState.setValue(addressResponse.data.title);
                    descriptionInputState.setValue(addressResponse.data.description);
                    mobileInputState.setValue(addressResponse.data.mobile);
                    setPosition({
                        lat: addressResponse.data.latitude,
                        lng: addressResponse.data.longitude,
                    });
                }
            };

            send();
        }
    }, [addressId]);
    const formSubmitHandler: React.FormEventHandler = (event) => {
        event.preventDefault();

        if (
            !(
                titleInputState.getIsValid() &&
                descriptionInputState.getIsValid() &&
                mobileInputState.getIsValid()
            )
        ) {
            return;
        }

        if (position === initialPosition) {
            setError(true);
            return;
        }

        const body: SubmitType = {
            latitude: position!.lat,
            longitude: position!.lng,
            description: descriptionInputState.value,
            mobile: mobileInputState.value,
            title: titleInputState.value,
        };

        const send = async () => {
            const res = await sendRequest(`food/address/${address ? address.id + "/" : ""}`, {
                body,
                options: { method: address ? "PATCH" : "POST" },
            });

            if (res.isOK) {
                navigate("/addresses");
            }
        };
        send();
    };
    return (
        <Main>
            <form onSubmit={formSubmitHandler} className={styles.container}>
                <MapComponent {...{ position, setPosition }} />
                <Input label={"عنوان آدرس"} {...titleInputState.props} />
                <TextArea label={"توضیحات"} {...descriptionInputState.props} rows={5} />
                <Input
                    label={"شماره موبایل"}
                    {...mobileInputState.props}
                    type={"number"}
                    dir={"ltr"}
                    className={"numberInput"}
                />
                {error && (
                    <p style={{ color: "red", fontWeight: "bold" }}>لطفا لوکیشن را مشخص نمایید</p>
                )}
                <Button
                    type={"submit"}
                    color={"green"}
                    fullWidthOnMobile
                    style={{ padding: "1rem 2rem", margin: "0 auto", display: "block" }}
                >
                    {address ? "ویرایش" : "ثبت آدرس"}
                </Button>
            </form>
        </Main>
    );
}
