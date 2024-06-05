import React from "react";
import styles from "./Payment.module.css";
import Input from "@/components/Input/Input.tsx";
import Button from "@/components/Button/Button.tsx";
import useInputValidator from "@/util/useInputValidator.ts";

export default function Payment() {
    const [counter, setCounter] = React.useState(0);

    const cardNumberInputState = useInputValidator({ minLength: 16, maxLength: 16 });

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
    };
    return (
        <form className={styles.container} onSubmit={formSubmitHandler}>
            <h1 style={{ textAlign: "center" }}>پرداخت</h1>
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
            />
            <h3 style={{ textAlign: "center" }}>تاریخ انقضا:</h3>
            <div className={styles.dateContainer}>
                <Input
                    label={"ماه"}
                    required
                    type={"number"}
                    dir={"ltr"}
                    className={styles.numberInput}
                />
                <Input
                    label={"سال"}
                    required
                    type={"number"}
                    dir={"ltr"}
                    className={styles.numberInput}
                />
            </div>
            <div style={{ marginBottom: "2rem" }}>
                <Input
                    label={"رمز دوم"}
                    type={"number"}
                    dir={"ltr"}
                    className={styles.numberInput}
                    required
                    style={{ width: "40%" }}
                    displayInline
                />
                <Button
                    style={{
                        padding: "0.25rem 0.5rem",
                        width: "30%",
                        display: "inline",
                        marginRight: "1rem",
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
