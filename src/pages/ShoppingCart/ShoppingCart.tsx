import styles from "./ShoppingCart.module.css";
import Main from "@/components/Main/Main.tsx";
import OrderCard from "@/pages/ShoppingCart/components/OrderCard/OrderCard.tsx";
import Button from "@/components/Button/Button.tsx";
import formatMoney from "@/util/formatMoney.ts";
import { useContext } from "react";
import { AppContext, AppContextType } from "@/appContext.tsx";
import { Link } from "react-router-dom";

export default function ShoppingCart() {
    const { cart } = useContext(AppContext) as AppContextType;

    let totalCostFromCart = 0;
    let totalItemCount = 0;
    cart.forEach((cart) => {
        totalCostFromCart += cart.item.price * cart.count;
        totalItemCount += cart.count;
    });

    const totalCost = totalCostFromCart + 15000;

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
                            <h3>{formatMoney(totalCostFromCart)}</h3>
                            <h3>هزینه پیک:</h3>
                            <h3>{formatMoney(15000)}</h3>
                        </div>
                        <div>
                            <h3>قابل پرداخت:</h3>
                            <h3>{formatMoney(totalCost)}</h3>
                        </div>
                        <div>
                            <h3>تعداد اقلام:</h3>
                            <h3>{`${totalItemCount} عدد`}</h3>
                        </div>
                    </div>
                    <Link to={`/payment?amount=${totalCost}`}>
                        <Button
                            color={"green"}
                            fullWidthOnMobile
                            style={{ display: "block", padding: "1rem 3rem", marginTop: "1rem" }}
                        >
                            پرداخت
                        </Button>
                    </Link>
                </>
            ) : (
                <h1 style={{ textAlign: "center" }}>هیج سفارشی ثبت نشده</h1>
            )}
        </Main>
    );
}
