import React, { useContext } from "react";
import styles from "./Payment.module.css";
import Input from "@/components/Input/Input.tsx";
import Button from "@/components/Button/Button.tsx";
import useInputValidator from "@/util/useInputValidator.ts";
import { useNavigate, useSearchParams } from "react-router-dom";
import formatMoney from "@/util/formatMoney.ts";
import { AppContext, AppContextType } from "@/appContext.tsx";

export default function Payment() {
    const { clearCart, toggleNotification } = useContext(AppContext) as AppContextType;

    const [counter, setCounter] = React.useState(0);

    const cardNumberInputState = useInputValidator({ minLength: 16, maxLength: 16 });
    const cvv2InputState = useInputValidator({ minLength: 3, maxLength: 4 });
    const month = useInputValidator({ minLength: 2, maxLength: 2 });
    const year = useInputValidator({ minLength: 2, maxLength: 2 });
    const password = useInputValidator({ minLength: 4, maxLength: 8 });

    const [searchParams] = useSearchParams();

    const navigate = useNavigate();

    const amount = searchParams.get("amount");

    const counterClickHandler = () => {
        setCounter(120);
    };

    React.useEffect(() => {
        if (counter !== 0) {
            const interval = setInterval(() => {
                setCounter((prevState) => prevState - 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [counter]);

    const formSubmitHandler: React.FormEventHandler = (event) => {
        event.preventDefault();

        console.log(cardNumberInputState.getIsValid());

        if (
            !(
                cardNumberInputState.getIsValid() &&
                cvv2InputState.getIsValid() &&
                month.getIsValid() &&
                year.getIsValid() &&
                password.getIsValid()
            )
        ) {
            return;
        }

        console.log("here");

        clearCart();

        toggleNotification({
            type: "success",
            message: "پرداخت با موفقیت انجام شد، غذا رو زود براتون میفرستیم.",
        });

        navigate("/home");
    };
    return (
        <form className={styles.container} onSubmit={formSubmitHandler}>
            <h1 style={{ textAlign: "center" }}>
                {`مبلغ قابل پرداخت ${formatMoney(amount ? +amount : 0)}`}
            </h1>
            <Input
                label={"شماره کارت"}
                required
                dir={"ltr"}
                type={"number"}
                className={styles.numberInput}
                {...cardNumberInputState.props}
            />
            <Input
                label={"CVV2"}
                required
                dir={"ltr"}
                type={"number"}
                style={{ width: "40%" }}
                className={styles.numberInput}
                {...cvv2InputState.props}
            />
            <h3 style={{ textAlign: "center" }}>تاریخ انقضا:</h3>
            <div className={styles.dateContainer}>
                <Input
                    label={"ماه"}
                    required
                    type={"number"}
                    dir={"ltr"}
                    className={styles.numberInput}
                    {...month.props}
                />
                <Input
                    label={"سال"}
                    required
                    type={"number"}
                    dir={"ltr"}
                    className={styles.numberInput}
                    {...year.props}
                />
            </div>
            <div className={styles.passwordContainer}>
                <Input
                    label={"رمز دوم"}
                    type={"number"}
                    dir={"ltr"}
                    className={styles.numberInput}
                    required
                    displayInline
                    {...password.props}
                />
                <Button
                    style={{
                        height: "70px",
                        width: "150px",
                        marginTop: "2rem",
                    }}
                    type={"button"}
                    onClick={counterClickHandler}
                    disabled={counter !== 0}
                >
                    {counter === 0 ? "درخواست رمز دوم" : `${counter} ثانیه`}
                </Button>
            </div>
            <Button
                color={"green"}
                fullWidthOnMobile
                style={{ padding: "1rem 2rem", margin: "1 auto", display: "block" }}
                type={"submit"}
            >
                پرداخت
            </Button>
        </form>
    );
}
