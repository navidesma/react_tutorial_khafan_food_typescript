import React from "react";
import styles from "./SignUp.module.css";
import Input from "@/components/Input/Input.tsx";
import Button from "@/components/Button/Button.tsx";
import logo from "@/resources/images/logo.png";
import Select from "@/components/Select/Select.tsx";
import { UserTypeEnum } from "@/interfaces.ts";
import SelectOption from "@/components/Select/SelectOption.tsx";
import formatUser from "@/util/formatUser.ts";
import useSendRequest from "@/util/useSendRequest.ts";
import useInputValidator from "@/util/useInputValidator.ts";
import { Link, useNavigate } from "react-router-dom";

interface SubmitType {
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    type: UserTypeEnum;
    mobile: string;
}

export default function SignUp() {
    const sendRequest = useSendRequest();

    const navigate = useNavigate();

    const usernameInputState = useInputValidator();
    const nameInputState = useInputValidator();
    const lastNameInputState = useInputValidator();
    const mobileInputState = useInputValidator({ minLength: 11, maxLength: 11 });
    const passwordInputState = useInputValidator({ minLength: 8 });

    const [userType, setUserType] = React.useState(UserTypeEnum.NORMAL_USER);

    const formSubmitHandler: React.FormEventHandler = async (event) => {
        event.preventDefault();

        if (
            !(
                usernameInputState.getIsValid() &&
                nameInputState.getIsValid() &&
                lastNameInputState.getIsValid() &&
                mobileInputState.getIsValid() &&
                passwordInputState.getIsValid()
            )
        ) {
            return;
        }

        const body: SubmitType = {
            first_name: nameInputState.value,
            last_name: lastNameInputState.value,
            mobile: mobileInputState.value,
            password: passwordInputState.value,
            username: usernameInputState.value,
            type: userType as UserTypeEnum,
        };

        try {
            const res = await sendRequest<undefined>("user/create/", {
                body,
                options: { method: "post" },
            });

            if (res.isOK) {
                navigate("/sign-in");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form className={styles.container} onSubmit={formSubmitHandler}>
            <h1 style={{ textAlign: "center" }}>ثبت نام</h1>
            <img src={logo} alt='' className={styles.image} />
            <Input
                label={"نام کاربری"}
                {...usernameInputState.props}
                dir={"ltr"}
                style={{ paddingLeft: "1rem" }}
            />
            <Input label={"نام"} {...nameInputState.props} />
            <Input label={"نام خانوادگی"} {...lastNameInputState.props} />
            <Input
                label={"شماره تلفن"}
                {...mobileInputState.props}
                dir={"ltr"}
                type={"number"}
                className={"numberInput"}
            />
            <Input
                label={"رمز عبور"}
                type={"password"}
                {...passwordInputState.props}
                dir={"ltr"}
                required
                style={{ paddingLeft: "1rem" }}
            />
            <Select
                {...{ setValue: setUserType, selectValue: userType, label: "نوع کاربر" }}
                style={{ marginBottom: "2rem" }}
            >
                {Object.values(UserTypeEnum).map((userType) => (
                    <SelectOption key={userType} value={userType}>
                        {formatUser(userType)}
                    </SelectOption>
                ))}
            </Select>

            <Button
                type={"submit"}
                color={"green"}
                fullWidthOnMobile
                style={{ padding: "1rem 2rem", margin: "0 auto", display: "block" }}
            >
                ثبت نام
            </Button>
            <Link to={"/sign-in"} className={styles.linkElement}>
                حساب کاربری دارید؟، وارد حساب خود شوید
            </Link>
        </form>
    );
}
