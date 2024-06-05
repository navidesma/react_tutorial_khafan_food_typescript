import React from "react";
import styles from "./Button.module.css";

type ButtonOriginalProps = React.ComponentProps<"button">;

interface Props extends ButtonOriginalProps {
    children: React.ReactNode;
    color?: string;
    size?: "small" | "normal" | "big";
    variant?: "contained" | "outlined";
    fullWidthOnMobile?: boolean;
}

export default function Button(props: Props) {
    const { color, children, size, variant, fullWidthOnMobile } = props;
    return (
        <button
            className={
                styles.button +
                " " +
                (variant && variant === "outlined" ? styles.outlined : "") +
                " " +
                (fullWidthOnMobile ? styles.fullWidthOnMobile : "") +
                " " +
                (props.className || "")
            }
            style={{
                ...props.style,
                backgroundColor: color || undefined,
                padding:
                    props.style && props.style.padding
                        ? props.style.padding
                        : !size || size === "normal"
                          ? undefined
                          : size === "small"
                            ? "0.5rem 1rem"
                            : "1.5rem 3rem",
            }}
            onClick={props.onClick}
            type={props.type}
            disabled={props.disabled}
        >
            {children}
        </button>
    );
}
