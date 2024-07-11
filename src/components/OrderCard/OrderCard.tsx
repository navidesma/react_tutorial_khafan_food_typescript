import styles from "./OrderCard.module.css";
import { OrderType, UserTypeEnum } from "@/interfaces.ts";
import formatMoney from "@/util/formatMoney.ts";
import { formatDate, formatTime } from "@/util/formatTime.ts";
import { useContext } from "react";
import { AppContext, AppContextType } from "@/appContext.tsx";
import Button from "@/components/Button/Button.tsx";
import useSendRequest from "@/util/useSendRequest.ts";

export default function OrderCard({ order }: { order: OrderType }) {
    const sendRequest = useSendRequest();
    const { userInfo, toggleNotification } = useContext(AppContext) as AppContextType;

    const submitDelivery = async () => {
        const res = await sendRequest(`food/order/deliver/${order.id}/`, {
            options: { method: "PUT" },
        });

        if (res.isOK) {
            toggleNotification({ message: "سفارش به عنوان تحول داده شده ثبت شد", type: "info" });
        }
    };

    return (
        <div className={styles.container}>
            {order.items.map((item) => (
                <div>
                    <p>
                        {item.food.name} <span style={{ fontWeight: "bold" }}>x{item.count}</span>
                    </p>
                </div>
            ))}
            <p>{formatMoney(order.total_cost)}</p>
            <p>وضعیت سفارش: {order.is_finished ? "تحویل شده" : "در حال پردازش"}</p>
            <p>تاریخ ثبت: {formatDate(order.created_at)}</p>
            <p>زمان ثبت: {formatTime(order.created_at)}</p>
            {order.deliver_time && <p>زمان تحویل: {formatTime(order.deliver_time)}</p>}
            {userInfo?.type === UserTypeEnum.RESTAURANT_OWNER && !order.is_finished && (
                <Button color={"blue"} onClick={submitDelivery}>
                    ثبت به عنوان تحویل شده
                </Button>
            )}
        </div>
    );
}
