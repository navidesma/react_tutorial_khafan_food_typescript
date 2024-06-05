import styles from "./ShoppingCart.module.css";
import Main from "@/components/Main/Main.tsx";
import OrderCard from "@/pages/ShoppingCart/components/OrderCard/OrderCard.tsx";
import Button from "@/components/Button/Button.tsx";
import formatMoney from "@/util/formatMoney.ts";
import { useContext } from "react";
import { AppContext, AppContextType } from "@/appContext.tsx";

export default function ShoppingCart() {
    const { cart } = useContext(AppContext) as AppContextType;

    let totalCost = 0;
    let totalItemCount = 0;
    cart.forEach((cart) => {
        totalCost += cart.item.price * cart.count;
        totalItemCount += cart.count;
    });

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
                            <h3>{formatMoney(totalCost)}</h3>
                            <h3>هزینه پیک:</h3>
                            <h3>{formatMoney(15000)}</h3>
                        </div>
                        <div>
                            <h3>قابل پرداخت:</h3>
                            <h3>{formatMoney(totalCost + 15000)}</h3>
                        </div>
                        <div>
                            <h3>تعداد اقلام:</h3>
                            <h3>{`${totalItemCount} عدد`}</h3>
                        </div>
                    </div>
                    <Button
                        color={"green"}
                        fullWidthOnMobile
                        style={{ display: "block", padding: "1rem 3rem", marginTop: "1rem" }}
                    >
                        پرداخت
                    </Button>
                </>
            ) : (
                <h1 style={{ textAlign: "center" }}>هیج سفارشی ثبت نشده</h1>
            )}
        </Main>
    );
}
