import React from "react";
import styles from "./Button.module.css";

export default function Button({
    color,
    children,
    size,
    variant,
    fullWidth,
    fullWidthOnMobile,
    m,
    mt,
    mr,
    ml,
    mb,
}: {
    children: React.ReactNode;
    color?: string;
    size?: "small" | "normal" | "big";
    variant?: "contained" | "outlined";
    fullWidth?: boolean;
    fullWidthOnMobile?: boolean;
    m?: number;
    mt?: number;
    mb?: number;
    ml?: number;
    mr?: number;
}) {
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
                width: fullWidth ? "100%" : undefined,
                margin: m ? `${m}rem` : undefined,
                marginTop: mt ? `${mt}rem` : undefined,
                marginBottom: mb ? `${mb}rem` : undefined,
                marginRight: mr ? `${mr}rem` : undefined,
                marginLeft: ml ? `${ml}rem` : undefined,
            }}
        >
            {children}
        </button>
    );
}
