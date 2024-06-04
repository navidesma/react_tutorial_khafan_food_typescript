import React from "react";
import styles from "./FoodCard.module.css";
import Button from "@/components/Button/Button.tsx";
import AddAndRemoveItemButton from "@/components/AddAndRemoveItemButton/AddAndRemoveItemButton.tsx";

export default function FoodCard() {
    const [itemCount, setItemCount] = React.useState(0);

    return (
        <div className={styles.foodCardContainer}>
            <img
                className={styles.image}
                src='https://media.cnn.com/api/v1/images/stellar/prod/140430115517-06-comfort-foods.jpg?q=w_1110,c_fill'
                alt=''
            />
            <div className={styles.content}>
                <h3>عنوان غذا</h3>
                <p>رستوران</p>
                <div className={styles.actionAndPrice}>
                    {itemCount > 0 ? (
                        <AddAndRemoveItemButton {...{ itemCount, setItemCount }} />
                    ) : (
                        <Button style={{ padding: "1rem 2rem" }} onClick={() => setItemCount(1)}>
                            سفارش
                        </Button>
                    )}
                    <p style={{ fontWeight: "bold" }}>200,000 تومان</p>
                </div>
            </div>
        </div>
    );
}
