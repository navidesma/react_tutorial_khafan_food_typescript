import styles from "./SignUp.module.css";
import Input from "@/components/Input/Input.tsx";
import Button from "@/components/Button/Button.tsx";
import logo from "@/resources/images/logo.png";

export default function SignUp() {
    return (
        <div className={styles.container}>
            <h1 style={{ textAlign: "center" }}>ثبت نام</h1>
            <img src={logo} alt='' className={styles.image} />
            <Input label={"نام"} />
            <Input label={"نام خانوادگی"} />
            <Input label={"شماره تلفن"} />
            <Input label={"رمز عبور"} type={"password"} dir={"ltr"} />
            <Button
                color={"green"}
                fullWidthOnMobile
                style={{ padding: "1rem 2rem", margin: "0 auto", display: "block" }}
            >
                ثبت نام
            </Button>
        </div>
    );
}
