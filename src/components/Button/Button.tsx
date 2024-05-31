import styles from "./Button.module.css";

export default function Button({color, text}: { text: string; color?: string; }) {
    return (
        <button className={styles.button} style={{color: color || undefined}}>{text}</button>
    )
}