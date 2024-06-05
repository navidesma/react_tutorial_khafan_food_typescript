import styles from "./Home.module.css";
import Main from "@/components/Main/Main";
import FoodCard from "@/components/FoodCard/FoodCard.tsx";
import { foods } from "@/foods.ts";

export default function Home() {
    return (
        <Main>
            <div className={styles.foodCardList}>
                {foods.map((food) => (
                    <div className={styles.foodCardItem}>
                        <FoodCard {...food} />
                    </div>
                ))}
            </div>
        </Main>
    );
}
