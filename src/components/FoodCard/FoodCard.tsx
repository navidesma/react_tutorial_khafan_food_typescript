import styles from "./FoodCard.module.css";
import Button from "@/components/Button/Button.tsx";

export default function FoodCard() {
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
                    <Button>سفارش</Button>
                    <p style={{ fontWeight: "bold" }}>200,000 تومان</p>
                </div>
            </div>
        </div>
    );
}
