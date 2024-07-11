import styles from "./ShoppingCart.module.css";
import Main from "@/components/Main/Main.tsx";
import OrderCard from "@/pages/ShoppingCart/components/OrderCard/OrderCard.tsx";
import Button from "@/components/Button/Button.tsx";
import formatMoney from "@/util/formatMoney.ts";
import React, { useContext } from "react";
import { AppContext, AppContextType } from "@/appContext.tsx";
// import { Link } from "react-router-dom";
import useSendRequest from "@/util/useSendRequest.ts";
import SelectOption from "@/components/Select/SelectOption.tsx";
import Select from "@/components/Select/Select.tsx";
import { AddressType } from "@/interfaces.ts";
import { Link, useNavigate } from "react-router-dom";
import AddressComponent from "@/components/AddressComponent/AddressComponent.tsx";
import useError from "@/util/useError.ts";

interface SubmitType {
    order_items: { food: number; count: number }[];
    address: number;
}

export default function ShoppingCart() {
    const { cart } = useContext(AppContext) as AppContextType;

    const sendRequest = useSendRequest();
    const navigate = useNavigate();
    const [addresses, setAddress] = React.useState<AddressType[]>();
    const [selectedAddress, setSelectedAddress] = React.useState("");
    const [addressError, setAddressError] = useError();

    React.useEffect(() => {
        const send = async () => {
            const res = await sendRequest<AddressType[]>("food/address/");

            if (res.isOK) {
                setAddress(res.data);
            }
        };
        send();
    }, []);

    let totalCostFromCart = 0;
    let totalItemCount = 0;
    cart.forEach((cart) => {
        totalCostFromCart += cart.item.price * cart.count;
        totalItemCount += cart.count;
    });

    const totalCost = totalCostFromCart + 15000;

    const submitOrder = () => {
        if (!selectedAddress) {
            setAddressError(true);
            return;
        }

        const body: SubmitType = {
            order_items: cart.map((cart_item) => ({
                food: cart_item.item.id,
                count: cart_item.count,
            })),
            address: +selectedAddress,
        };
        const send = async () => {
            const res = await sendRequest("food/order/submit/", {
                body,
                options: { method: "POST" },
            });

            if (res.isOK) {
                navigate("/home");
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
            {cart.length > 0 ? (
                <>
                    <div className={styles.main}>
                        {cart.map((cart) => (
                            <OrderCard {...cart} />
                        ))}
                    </div>
                    <div className={styles.totalCost}>
                        <div>
                            <h3>جمع سفارش:</h3>
                            <h3>{formatMoney(totalCostFromCart)}</h3>
                            <h3>هزینه پیک:</h3>
                            <h3>{formatMoney(15000)}</h3>
                        </div>
                        <div>
                            <h3>قابل پرداخت:</h3>
                            <h3>{formatMoney(totalCost)}</h3>
                        </div>
                        <div>
                            <h3>تعداد اقلام:</h3>
                            <h3>{`${totalItemCount} عدد`}</h3>
                        </div>
                    </div>
                    {/*<Link to={`/payment?amount=${totalCost}`}>*/}
                    {/*    <Button*/}
                    {/*        color={"green"}*/}
                    {/*        fullWidthOnMobile*/}
                    {/*        style={{ display: "block", padding: "1rem 3rem", marginTop: "1rem" }}*/}
                    {/*    >*/}
                    {/*        پرداخت*/}
                    {/*    </Button>*/}
                    {/*</Link>*/}
                    {selectedAddress && (
                        <AddressComponent
                            address={addresses.find((address) => address.id === +selectedAddress)!}
                        />
                    )}
                    <Select
                        label={"آدرس"}
                        selectValue={selectedAddress}
                        setValue={setSelectedAddress}
                        style={{ marginTop: "1rem" }}
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
                        onClick={submitOrder}
                        fullWidthOnMobile
                        style={{ display: "block", padding: "1rem 3rem", marginTop: "1rem" }}
                    >
                        ثبت سفارش
                    </Button>
                </>
            ) : (
                <h1 style={{ textAlign: "center" }}>هیج سفارشی ثبت نشده</h1>
            )}
        </Main>
    );
}
