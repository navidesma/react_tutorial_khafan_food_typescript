import styles from "./Home.module.css";
import Main from "@/components/Main/Main";
import FoodCard from "@/components/FoodCard/FoodCard.tsx";

export default function Home() {
    return (
        <Main>
            <h1>صفحه ی اصلی</h1>
            <div className={styles.foodCardList}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
                    <div className={styles.foodCardItem}>
                        <FoodCard />
                    </div>
                ))}
            </div>
        </Main>
    );
}
