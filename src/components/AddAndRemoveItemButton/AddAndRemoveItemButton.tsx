import React from "react";
import styles from "./AddAndRemoveItemButton.module.css";
import Button from "@/components/Button/Button.tsx";
import trashCan from "@/resources/images/trashcan.svg";

export default function AddAndRemoveItemButton({
    itemCount,
    setItemCount,
}: {
    itemCount: number;
    setItemCount: React.Dispatch<React.SetStateAction<number>>;
}) {
    return (
        <div className={styles.action}>
            <Button
                style={{ padding: "0.5rem 1rem" }}
                onClick={() => setItemCount((prevState) => prevState + 1)}
            >
                +
            </Button>
            <p className={styles.actionNumberOfItems}>{itemCount}</p>
            <Button
                style={{ padding: "0.5rem 1rem" }}
                onClick={() => setItemCount((prevState) => prevState - 1)}
            >
                {itemCount > 1 ? (
                    "-"
                ) : (
                    <img src={trashCan} alt='' width={"15px"} height={"15apx"} />
                )}
            </Button>
        </div>
    );
}
