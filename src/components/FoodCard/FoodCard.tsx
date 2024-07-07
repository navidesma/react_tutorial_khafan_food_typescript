import { useContext } from "react";
import styles from "./FoodCard.module.css";
import Button from "@/components/Button/Button.tsx";
import AddAndRemoveItemButton from "@/components/AddAndRemoveItemButton/AddAndRemoveItemButton.tsx";
import formatMoney from "@/util/formatMoney.ts";
import { FoodType, UserTypeEnum } from "@/interfaces.ts";
import { AppContext, AppContextType } from "@/appContext.tsx";
import { Link } from "react-router-dom";

export default function FoodCard(item: FoodType) {
    const { image, price, restaurant_name, name, id } = item;
    const { addItemToCart, cart, removeItemFromCart, userInfo } = useContext(
        AppContext,
    ) as AppContextType;
    const itemCart = cart.find((cart) => cart.item.id === id);
    const itemCount = itemCart ? itemCart.count : 0;

    return (
        <div className={styles.foodCardContainer}>
            <img className={styles.image} src={image} alt='' />
            <div className={styles.content}>
                <h3>{name}</h3>
                <p>{restaurant_name}</p>
                {userInfo?.type === UserTypeEnum.RESTAURANT_OWNER ? (
                    <Link
                        to={`/restaurant/food/${id}`}
                        style={{ display: "block", margin: "0.3rem" }}
                    >
                        <Button variant='outlined'>ویرایش</Button>
                    </Link>
                ) : (
                    <div className={styles.actionAndPrice}>
                        {itemCount > 0 ? (
                            <AddAndRemoveItemButton
                                {...{ count: itemCount, addItemToCart, removeItemFromCart, item }}
                            />
                        ) : (
                            <Button
                                style={{ padding: "1rem 2rem" }}
                                onClick={() => addItemToCart(item)}
                            >
                                سفارش
                            </Button>
                        )}
                        <p style={{ fontWeight: "bold" }}>{formatMoney(price)}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
