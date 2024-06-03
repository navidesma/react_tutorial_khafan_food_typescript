import styles from "./Input.module.css";
import React from "react";

type InputOriginalProps = React.ComponentProps<"input">;

interface InputProps extends InputOriginalProps {
    label: string;
}

export default function Input(props: InputProps) {
    return (
        <div className={styles.inputContainer}>
            <label htmlFor={props.label} className={styles.label}>
                {props.label}
            </label>
            <br />
            <input {...props} className={styles.input} id={props.label} />
        </div>
    );
}
