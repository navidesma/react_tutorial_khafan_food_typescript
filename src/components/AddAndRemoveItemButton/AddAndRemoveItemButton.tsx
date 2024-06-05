import styles from "./AddAndRemoveItemButton.module.css";
import Button from "@/components/Button/Button.tsx";
import trashCan from "@/resources/images/trashcan.svg";
import { FoodItemType } from "@/interfaces.ts";

export default function AddAndRemoveItemButton({
    count,
    item,
    addItemToCart,
    removeItemFromCart,
}: {
    count: number;
    item: FoodItemType;
    addItemToCart: (item: FoodItemType) => void;
    removeItemFromCart: (id: number) => void;
}) {
    return (
        <div className={styles.action}>
            <Button style={{ padding: "0.5rem 1rem" }} onClick={() => addItemToCart(item)}>
                +
            </Button>
            <p className={styles.actionNumberOfItems}>{count}</p>
            <Button style={{ padding: "0.5rem 1rem" }} onClick={() => removeItemFromCart(item.id)}>
                {count > 1 ? "-" : <img src={trashCan} alt='' width={"15px"} height={"15apx"} />}
            </Button>
        </div>
    );
}
