import React from "react";
import styles from "./OrderCard.module.css";
import AddAndRemoveItemButton from "@/components/AddAndRemoveItemButton/AddAndRemoveItemButton.tsx";

export default function OrderCard() {
    const [itemCount, setItemCount] = React.useState(0);

    return (
        <div className={styles.orderCard}>
            <p className={styles.orderItemName}>ساندویچ ویژه</p>
            <p className={styles.orderItemPrice}>200,000 تومان</p>
            <AddAndRemoveItemButton {...{ itemCount, setItemCount }} />
        </div>
    );
}
