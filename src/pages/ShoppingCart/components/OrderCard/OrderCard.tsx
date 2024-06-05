// import React from "react";
import styles from "./OrderCard.module.css";
// import AddAndRemoveItemButton from "@/components/AddAndRemoveItemButton/AddAndRemoveItemButton.tsx";
import formatMoney from "@/util/formatMoney.ts";
import { CartType } from "@/interfaces.ts";
import { useContext } from "react";
import { AppContext, AppContextType } from "@/appContext.tsx";
import AddAndRemoveItemButton from "@/components/AddAndRemoveItemButton/AddAndRemoveItemButton.tsx";

export default function OrderCard({ item, count }: CartType) {
    const { addItemToCart, removeItemFromCart } = useContext(AppContext) as AppContextType;

    return (
        <div className={styles.orderCard}>
            <p className={styles.orderItemName}>{item.name}</p>
            <p className={styles.orderItemPrice}>{formatMoney(item.price * count)}</p>
            <AddAndRemoveItemButton {...{ count, item, removeItemFromCart, addItemToCart }} />
        </div>
    );
}
