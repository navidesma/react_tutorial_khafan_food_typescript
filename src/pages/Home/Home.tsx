import styles from "./Home.module.css";
import Main from "@/components/Main/Main";
import FoodCard from "@/components/FoodCard/FoodCard.tsx";
import useSendRequest from "@/util/useSendRequest.ts";
import React, { useContext } from "react";
import { FoodType, PaginatedListType, UserTypeEnum } from "@/interfaces.ts";
import { AppContext, AppContextType } from "@/appContext.tsx";
import { Link } from "react-router-dom";
import Button from "@/components/Button/Button.tsx";
import Pagination from "@/components/Pagination/Pagination";
import usePagination from "@/util/usePagination";

export default function Home() {
    const { userInfo } = useContext(AppContext) as AppContextType;
    const isRestaurantOwner = userInfo?.type === UserTypeEnum.RESTAURANT_OWNER;
    const sendRequest = useSendRequest();
    const [foods, setFood] = React.useState<FoodType[]>();

    const { count, currentPage, setCount, setCurrentPage } = usePagination();

    React.useEffect(() => {
        const send = async () => {
            const res = await sendRequest<PaginatedListType<FoodType>>(
                `food/list/?page=${currentPage}`,
            );
            if (res.isOK) {
                setCount(res.data.count);
                setFood(res.data.results);
            }
        };
        send();
    }, [currentPage]);

    if (!foods) {
        return <></>;
    }
    if (foods.length === 0) {
        return (
            <Main>
                {isRestaurantOwner && (
                    <Link to={"/restaurant/food"}>
                        <Button color={"green"}>تعریف غذای جدید</Button>
                    </Link>
                )}
                <h1>هیچ غذایی تعریف نشده</h1>
            </Main>
        );
    }

    return (
        <Main>
            {isRestaurantOwner && (
                <>
                    <Link
                        to={"/restaurant/food"}
                        style={{ display: "block", margin: "0.5rem auto" }}
                    >
                        <Button color={"green"}>تعریف غذای جدید</Button>
                    </Link>
                    <Link to={"/restaurant"} style={{ display: "block", margin: "0.5rem auto" }}>
                        <Button>ویرایش اطلاعات رستوران</Button>
                    </Link>
                </>
            )}
            <Link to={"/addresses"} style={{ display: "block", margin: "0.5rem auto" }}>
                <Button>مدیریت آدرس ها</Button>
            </Link>
            <div className={styles.foodCardList}>
                {foods.map((food) => (
                    <div className={styles.foodCardItem}>
                        <FoodCard {...food} />
                    </div>
                ))}
            </div>
            <Pagination {...{ count, currentPage, setCurrentPage }} />
        </Main>
    );
}
