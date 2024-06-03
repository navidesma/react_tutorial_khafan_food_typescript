import styles from "./OrderCard.module.css";
import Button from "@/components/Button/Button.tsx";

export default function OrderCard() {
    return (
        <div className={styles.orderCard}>
            <p className={styles.orderItemName}>ساندویچ ویژه</p>
            <p className={styles.orderItemPrice}>200,000 تومان</p>
            <div className={styles.action}>
                <Button size={"small"}>+</Button>
                <p className={styles.actionNumberOfItems}>2</p>
                <Button size={"small"}>-</Button>
            </div>
        </div>
    );
}
