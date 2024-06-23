import styles from "./Select.module.css";
import React from "react";

export default function SelectOption({
    value,
    children,
}: {
    value: string | number;
    children: React.ReactNode;
}) {
    return (
        <option value={value} className={styles.option}>
            {children}
        </option>
    );
}
