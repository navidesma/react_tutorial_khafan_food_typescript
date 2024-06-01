import styles from "./Button.module.css";

export default function Button({
    color,
    text,
    size,
    variant,
}: {
    text: string;
    color?: string;
    size?: "small" | "normal" | "big";
    variant?: "contained" | "outlined";
}) {
    return (
        <button
            className={
                styles.button + " " + (variant && variant === "outlined" ? styles.outlined : "")
            }
            style={{
                color: color || undefined,
                padding:
                    !size || size === "normal"
                        ? undefined
                        : size === "small"
                          ? "0.5rem 1rem"
                          : "1.5rem 3rem",
            }}
        >
            {text}
        </button>
    );
}
