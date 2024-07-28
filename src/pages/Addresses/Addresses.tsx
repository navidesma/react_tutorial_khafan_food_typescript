import styles from "./Addresses.module.css";
import Main from "@/components/Main/Main.tsx";
import { Link } from "react-router-dom";
import React from "react";
import { AddressType } from "@/interfaces.ts";
import useSendRequest from "@/util/useSendRequest.ts";
import AddressComponent from "@/components/AddressComponent/AddressComponent.tsx";
import Button from "@/components/Button/Button.tsx";

export default function Addresses() {
    const sendRequest = useSendRequest();
    const [addresses, setAddresses] = React.useState<AddressType[]>();

    React.useEffect(() => {
        const send = async () => {
            const res = await sendRequest<AddressType[]>("food/address/");
            if (res.isOK) {
                setAddresses(res.data);
            }
        };
        send();
    }, []);
    if (addresses === undefined) {
        return <></>;
    }
    return (
        <Main>
            <div className={styles.newAddressLinkContainer}>
                <Link to={"/manage-address"} className={styles.newAddressLink}>
                    <Button>ایجاد آدرس جدید</Button>
                </Link>
            </div>

            <div className={styles.addressesContainer}>
                {addresses.map((address) => (
                    <AddressComponent address={address} key={address.id} />
                ))}
            </div>
        </Main>
    );
}
