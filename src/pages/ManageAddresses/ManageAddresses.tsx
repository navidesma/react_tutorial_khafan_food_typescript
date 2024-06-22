import Main from "@/components/Main/Main.tsx";
import { Link } from "react-router-dom";
import React from "react";
import { AddressType } from "@/interfaces.ts";
import useSendRequest from "@/util/useSendRequest.ts";
import AddressComponent from "@/components/AddressComponent/AddressComponent.tsx";
import Button from "@/components/Button/Button.tsx";

export default function ManageAddresses() {
    const sendRequest = useSendRequest();
    const [addresses, setAddreses] = React.useState<AddressType[]>();

    React.useEffect(() => {
        const send = async () => {
            const res = await sendRequest<AddressType[]>("food/address/");
            if (res.isOK) {
                setAddreses(res.data);
            }
        };
        send();
    }, []);
    if (addresses === undefined) {
        return <></>;
    }
    return (
        <Main>
            <Link to={"/manage-address"}>
                <Button>ایجاد آدرس جدید</Button>
            </Link>

            {addresses.map((address) => (
                <AddressComponent address={address} key={address.id} />
            ))}
        </Main>
    );
}
