import styles from "./ShoppingCart.module.css";
import Main from "@/components/Main/Main.tsx";
import OrderCard from "@/pages/ShoppingCart/components/OrderCard/OrderCard.tsx";
import Button from "@/components/Button/Button.tsx";

export default function ShoppingCart() {
    return (
        <Main>
            <div className={styles.main}>
                <OrderCard />
                <OrderCard />
                <OrderCard />
                <OrderCard />
            </div>
            <div className={styles.totalCost}>
                <div>
                    <h3>جمع سفارش:</h3>
                    <h3>500,000 تومان</h3>
                    <h3>هزینه پیک:</h3>
                    <h3>15,000 تومان</h3>
                </div>
                <div>
                    <h3>قابل پرداخت:</h3>
                    <h3>515,000 تومان</h3>
                </div>
                <div>
                    <h3>تعداد اقلام:</h3>
                    <h3>6 عدد</h3>
                </div>
            </div>
            <Button color={"green"} fullWidthOnMobile mt={1}>
                پرداخت
            </Button>
        </Main>
    );
}
