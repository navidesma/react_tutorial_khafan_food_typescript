import styles from "./Orders.module.css";
import React from "react";
import Main from "@/components/Main/Main.tsx";
import useSendRequest from "@/util/useSendRequest.ts";
import { OrderType, PaginatedListType } from "@/interfaces.ts";
import OrderCard from "@/components/OrderCard/OrderCard.tsx";
import usePagination from "@/util/usePagination";
import Pagination from "@/components/Pagination/Pagination";

export default function Orders() {
    const sendRequest = useSendRequest();
    const [orders, setOrders] = React.useState<OrderType[]>([]);

    const { count, currentPage, setCount, setCurrentPage } = usePagination();

    React.useEffect(() => {
        const send = async () => {
            const res = await sendRequest<PaginatedListType<OrderType>>(
                `food/order/list/?page=${currentPage}`,
            );
            if (res.isOK) {
                setCount(res.data.count);
                setOrders(res.data.results);
            }
        };
        send();
    }, [currentPage]);

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
            <Pagination {...{ count, currentPage, setCurrentPage }} />
        </Main>
    );
}
