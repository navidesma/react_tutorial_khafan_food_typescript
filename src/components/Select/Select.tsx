import React, { ReactNode } from "react";
import styles from "./Select.module.css";

interface PropType<T> extends React.HTMLProps<HTMLDivElement> {
    label: string;
    selectValue: T;
    setValue: React.Dispatch<React.SetStateAction<T>>;
    children: ReactNode;
}

export default function Select<T>(props: PropType<T>) {
    const { setValue, selectValue, label, children } = props;

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setValue(event.target.value as T);
    };

    return (
        <div {...props}>
            <label htmlFor={label}>{label}:</label>{" "}
            <select
                id={label}
                value={selectValue as string}
                onChange={handleSelectChange}
                className={styles.select}
            >
                {children}
            </select>
        </div>
    );
}
