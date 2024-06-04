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

export default function Button({
    color,
    children,
    size,
    variant,
    fullWidthOnMobile,
    style,
    onClick,
}: Props) {
    return (
        <button
            className={
                styles.button +
                " " +
                (variant && variant === "outlined" ? styles.outlined : "") +
                (fullWidthOnMobile ? styles.fullWidthOnMobile : "")
            }
            style={{
                backgroundColor: color || undefined,
                padding:
                    !size || size === "normal"
                        ? undefined
                        : size === "small"
                          ? "0.5rem 1rem"
                          : "1.5rem 3rem",
                ...style,
            }}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
