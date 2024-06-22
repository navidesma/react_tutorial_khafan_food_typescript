import React, { useState } from "react";

interface InputValidatorPropType {
    maxLength?: number;
    minLength?: number;
    defaultValue?: string;
    required?: boolean;
}

export default function useInputValidator({
    required = true,
    defaultValue,
    maxLength,
    minLength,
}: InputValidatorPropType = {}) {
    const [value, setValue] = useState(defaultValue ?? "");
    const [errorMessage, setErrorMessage] = useState("");

    const [validateOnEachKeyPress, setValidateOnEachKeyPress] = useState<boolean>(false);

    const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = event.target.value;

        if (validateOnEachKeyPress) {
            getIsValid();
        }

        if (maxLength && newValue.length > maxLength) {
            return;
        }

        setValue(newValue);
    };

    const onBlur = () => {
        if (!validateOnEachKeyPress) {
            setValidateOnEachKeyPress(true);
        }
        getIsValid();
    };

    const getIsValid = () => {
        return validate({
            value,
            minLength,
            setErrorMessage,
            required,
        });
    };

    return {
        getIsValid,
        value,
        setValue,
        props: { onChange, value, errorMessage, onBlur, error: !!errorMessage },
    };
}

const validate = ({
    value,
    minLength,
    setErrorMessage,
    required,
}: {
    value: string;
    minLength?: number;
    required: boolean;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}) => {
    if (minLength && value.length < minLength) {
        setErrorMessage(`تعداد کاراکتر ها باید حداقل ${minLength} تا باشد`);
        return false;
    }
    if (required && value.length === 0) {
        setErrorMessage("این فیلد نباید خالی باشد");
        return false;
    }

    setErrorMessage("");

    return true;
};
