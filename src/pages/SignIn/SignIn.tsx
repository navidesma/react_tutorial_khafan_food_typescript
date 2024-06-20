import styles from "@/pages/SignUp/SignUp.module.css";
import logo from "@/resources/images/logo.png";
import Input from "@/components/Input/Input.tsx";
import Button from "@/components/Button/Button.tsx";
import useInputValidator from "@/util/useInputValidator.ts";
import React from "react";
import { Link } from "react-router-dom";
import useSendRequest from "@/util/useSendRequest.ts";
import { AppContext, AppContextType } from "@/appContext.tsx";
import { UserType } from "@/interfaces.ts";

export default function SignIn() {
    const { signIn } = React.useContext(AppContext) as AppContextType;

    const sendRequest = useSendRequest();
    const usernameInputState = useInputValidator();
    const passwordInputState = useInputValidator({ minLength: 8 });

    const formSubmitHandler: React.FormEventHandler = async (event) => {
        event.preventDefault();

        if (!(usernameInputState.isValid && passwordInputState.isValid)) {
            return;
        }

        const body = { username: usernameInputState.value, password: passwordInputState.value };

        try {
            const signInResponse = await sendRequest<{ access: string; refresh: string }>(
                "token/",
                {
                    body,
                    options: { method: "post" },
                },
            );

            if (signInResponse.isOK) {
                const userDataResponse = await sendRequest<UserType>("user/get-my-profile/", {
                    forceToken: signInResponse.data.access,
                });

                if (userDataResponse.isOK) {
                    signIn(signInResponse.data.access, {
                        type: userDataResponse.data.type,
                        fullName: userDataResponse.data.full_name,
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form className={styles.container} onSubmit={formSubmitHandler}>
            <h1 style={{ textAlign: "center" }}>ورود</h1>
            <img src={logo} alt='' className={styles.image} />
            <Input
                label={"نام کاربری"}
                {...usernameInputState.props}
                dir={"ltr"}
                style={{ paddingLeft: "1rem" }}
            />
            <Input
                label={"رمز عبور"}
                type={"password"}
                {...passwordInputState.props}
                dir={"ltr"}
                required
                style={{ paddingLeft: "1rem" }}
            />
            <Button
                type={"submit"}
                color={"green"}
                fullWidthOnMobile
                style={{ padding: "1rem 2rem", margin: "0 auto", display: "block" }}
            >
                ورود
            </Button>
            <Link to={"/sign-up"} className={styles.linkElement}>
                حساب کاربری ندارید؟، حساب جدید بسازید
            </Link>
        </form>
    );
}
