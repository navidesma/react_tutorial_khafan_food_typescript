import React from "react";
import styles from "./SignUp.module.css";
import Input from "@/components/Input/Input.tsx";
import Button from "@/components/Button/Button.tsx";
import logo from "@/resources/images/logo.png";

export default function SignUp() {
    const formSubmitHandler: React.FormEventHandler = (event) => {
        event.preventDefault();
    };

    return (
        <form className={styles.container} onSubmit={formSubmitHandler}>
            <h1 style={{ textAlign: "center" }}>ثبت نام</h1>
            <img src={logo} alt='' className={styles.image} />
            <Input label={"نام"} required />
            <Input label={"نام خانوادگی"} required />
            <Input label={"شماره تلفن"} required />
            <Input label={"رمز عبور"} type={"password"} dir={"ltr"} required />
            <Button
                type={"submit"}
                color={"green"}
                fullWidthOnMobile
                style={{ padding: "1rem 2rem", margin: "0 auto", display: "block" }}
            >
                ثبت نام
            </Button>
        </form>
    );
}
