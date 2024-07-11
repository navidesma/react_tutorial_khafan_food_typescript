import styles from "./Orders.module.css";
import React from "react";
import Main from "@/components/Main/Main.tsx";
import useSendRequest from "@/util/useSendRequest.ts";
import { OrderType, PaginatedListType } from "@/interfaces.ts";
import OrderCard from "@/components/OrderCard/OrderCard.tsx";

export default function Orders() {
    const sendRequest = useSendRequest();
    const [orders, setOrders] = React.useState<OrderType[]>([]);

    React.useEffect(() => {
        const send = async () => {
            const res = await sendRequest<PaginatedListType<OrderType>>("food/order/list/");
            if (res.isOK) {
                setOrders(res.data.results);
            }
        };
        send();
    }, []);

    if (!orders) {
        return <></>;
    }

    return (
        <Main>
            <div className={styles.orderCardList}>
                {orders.map((order) => (
                    <div className={styles.orderCardItem}>
                        <OrderCard order={order} />
                    </div>
                ))}
            </div>
        </Main>
    );
}
